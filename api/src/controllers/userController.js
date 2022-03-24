const { User } = require("../db/index.js")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env
const bcrypt = require("bcrypt")
const generateRandomString = require("../utilities/getRandomString.js")
const { sendEmail } = require("../utilities/sendEmail.js")

const createUser = async (req, res, next) => {
  const { name, lastname, country, email, password } = req.body

  if (!name || !lastname || !country || !email || !password) {
    return next({ status: 400, message: "All fields are required" })
  }
  try {
    let user = await User.findOne({ where: { email } })
    // Si el correo ya está registrado, devuelvo un error
    if (user) {
      return next({ status: 400, message: "User already exists" })
    }

    // Creamos el nuevo usuario y lo guardamos en la DB
    user = await User.create({
      name,
      lastname,
      country,
      email,
      password,
    })

    // generamos el payload/body para generar el token
    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        if (err) throw err
        res.status(201).json({ token })
      },
    )
  } catch (err) {
    console.log(err)
    next({})
  }
}

const login = async (req, res, next) => {
  // Si no hay errores, continúo
  const { email, password } = req.body

  if (!email || !password) {
    return next({
      status: 400,
      message: "All fields are required",
    })
  }

  try {
    let user = await User.findOne({ where: { email } })

    // ningún usuario contiene ese correo
    if (!user) return next({ status: 400, message: "Invalid credentials" })

    //Si la cuenta está desabilitada
    if (user.dataValues.status === "disabled") {
      return next({ status: 400, message: "Disabled Account" })
    }

    // Teniedo el usuario, determinamos si la contraseña enviada es correcta
    const isMatch = await bcrypt.compare(password, user.dataValues.password)

    // si la contraseña es incorreta
    if (!isMatch) return next({ status: 400, message: "Invalid credentials" })

    // si la contraseña y email son validos escribimos el payload/body
    const payload = {
      user: { id: user.id },
    }

    // GENERO EL TOKEN
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: "3d",
      },
      (err, token) => {
        if (err) throw err
        return res.json({ token })
      },
    )
  } catch (err) {
    console.log(err)
    next({ err })
  }
}

const getUserDetail = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: [
          "password",
          "provider",
          "providerId",
          "type",
          "createdAt",
          "updatedAt",
        ],
      },
    })

    if (!user) {
      return next({ status: 404, message: "User not found" })
    }

    //Si la cuenta está desabilitada
    if (user.dataValues.status === "disabled") {
      return next({ status: 400, message: "Disabled Account" })
    }

    res.json(user)
  } catch (err) {
    next(err)
  }
}

const disableUser = async (req, res) => {
  const { id } = req.body
  try {
    const user = await User.findByPk(id)
    if (!user) {
      res.json({ message: "This User doesnt exists" })
    } else if (user.dataValues.status === "enabled") {
      try {
        const updateStatus = await User.update(
          {
            ...user.dataValues,
            status: "disabled",
          },
          {
            where: {
              id: user.dataValues.id,
            },
          },
        )
        if (updateStatus) {
          res.status(200).json({ message: "Acoount disabled correctly" })
        } else {
          res.status(400).json({ message: "Couldnt disbale User" })
        }
      } catch (error) {
        console.log(error)
      }
    } else if (user.dataValues.status === "disabled") {
      res.json({ status: 400, message: "This account is already Disabled " })
    }
  } catch (err) {
    console.log(err)
  }
}

const enableUser = async (req, res) => {
  const { id } = req.body
  try {
    const user = await User.findByPk(id)
    if (!user) {
      res.json({ message: "This User doesnt exists" })
    } else if (user.dataValues.status === "disabled") {
      try {
        const updateStatus = await User.update(
          {
            ...user.dataValues,
            status: "enabled",
          },
          {
            where: {
              id: user.dataValues.id,
            },
          },
        )
        if (updateStatus) {
          res.status(200).json({ message: "Acoount enabled correctly" })
        } else {
          res.status(400).json({ message: "Couldnt enable User" })
        }
      } catch (error) {
        console.log(error)
      }
    } else if (user.dataValues.status === "enabled") {
      res.json({ status: 400, message: "This account is already enabled " })
    }
  } catch (err) {
    console.log(err)
  }
}

const forgotPassword = async (req, res, next) => {
  const { email } = req.body

  if (!email) {
    return next({ status: 400, message: "Email is required" })
  }

  let temporalPassword = generateRandomString()

  try {
    const user = await User.findOne({ where: { email } })

    if (user) {
      try {
        await User.update({ password: temporalPassword }, { where: { email } })
        await sendEmail(
          "Recuperación de contraseña",
          "",
          false,
          email,
          `<h2>Contraseña temporal para su cuenta de Rental App</h2><div>Su contraseña temporal es: <code>${temporalPassword}</code><br>Cambiela lo antes posible.</div>`,
        )
      } catch (error) {
        // console.log(error);
        return next({ status: 500, message: "Intentelo más tarde" })
      }
    }

    res.json({
      message: "Si el email proporcionado es correcto, le enviaremos un email",
    })
  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req, res, next) => {
  const { newPassword, oldPassword } = req.body

  try {
    const user = await User.findByPk(req.user.id)
    const isMatch = await bcrypt.compare(oldPassword, user.dataValues.password)

    if (!isMatch) {
      return next({ status: 400, message: "Invalid old password" })
    }

    await User.update(
      { password: newPassword },
      { where: { email: user.dataValues.email } },
    )

    res.end()
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  const { name, lastname, country, photo, account_number, email } = req.body

  const newInfo = {}

  if (name) newInfo.name = name
  if (lastname) newInfo.lastname = lastname
  if (country) newInfo.country = country
  if (photo) newInfo.photo = photo
  if (account_number) newInfo.account_number = account_number
  if (email) newInfo.email = email

  try {
    await User.update(newInfo, { where: { id: req.user.id } })

    res.end()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUser,
  login,
  getUserDetail,
  disableUser,
  forgotPassword,
  resetPassword,
  updateUser,
  enableUser,
}
