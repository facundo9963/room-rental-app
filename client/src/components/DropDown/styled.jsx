import styled from "styled-components"
import { Link } from "react-router-dom"

export const DropDownMenu = styled.div`
  position: absolute;
  top: 13.5vh;
  right: -2vw;
  width: 300px;
  transform: translateX(-45%);
  background: linear-gradient(145deg, #cb8fff, #ab79e6);
  border-radius: 17px;
  padding: 1rem;
  overflow: hidden;
  color: white;
  ${({ visibility }) =>
    visibility
      ? `
    visibility: visible;
    `
      : `
    visibility: hidden;
    `};
`
export const DropDownItem = styled.span`
  height: 50px;
  width: 90%;
  display: flex;
  align-items: center;
  border-radius: 17px;
  transition: background 800ms, color 800ms;
  padding: 0.4rem;
  margin-bottom: 2.5%;
  margin-top: 2.5%;

  :hover {
    background-color: #9d4edd;
    color: black;
  }
`
export const Container = styled.div`
  margin: auto auto;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 500px;
  background: #fff;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: "20px";
  margin-bottom: 2rem;
  @media (max-width: 500px) {
    width: 100%;
  }
`

export const Title = styled.h1`
  font-size: 36px;
  color: #1f0037;
  margin-bottom: 2.5%;
`

export const Field = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-top: 2.5%;
  margin-bottom: 2.5%;

  height: 30%;
  padding: 20px;
  padding-bottom: 20px;
  border-radius: 10px;
  background: linear-gradient(145deg, #bf8ce6, #e3a6ff);
`

export const Form = styled.form`
  width: 100%;
  border-radius: 25px;
  background: #5d00a4;
  box-shadow: inset 21px 21px 42px #430076, inset -21px -21px 42px #7700d2;
  border-radius: 10px;
  padding-top: 10%;
  padding-bottom: 10%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`
export const Input = styled.input`
  grid-column: 2/3;
  grid-row: 1/2;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 5px;
  padding-top: 10px;
  padding-bottom: 10px;

  font-size: 20px;
`

export const Label = styled.label`
  grid-column: 1/2;
  grid-row: 1/2;
  text-align: left;
  padding-left: 5%;
  font-size: large;
  font-weight: bold;
  font-family: sans-serif;
`
export const ButtonFacebook = styled.button`
  display: flex;
  color: #ffffff;
  justify-self: center;
  align-self: center;
  justify-content: center;
  align-items: center;
  padding: 3px;
  border: 1px solid black;
  border-radius: 0.5rem;
  box-shadow: rgba(27, 31, 36, 0.1);
  width: 50%;
  min-height: 30px;
  background-color: #1b74e4;
  font-size: large;
  font-weight: normal;
  font-family: sans-serif;

  transition: 0.2s;

  &:hover {
    background-color: #385898;
  }
`
export const ButtonGoogle = styled.button`
  display: flex;
  color: black;
  justify-self: center;
  align-self: center;
  justify-content: center;
  align-items: center;
  padding: 3px;
  border: 1px solid black;
  border-radius: 0.5rem;
  box-shadow: rgba(27, 31, 36, 0.1);
  width: 50%;
  min-height: 30px;
  background-color: white;
  font-size: large;
  font-weight: normal;
  font-family: sans-serif;

  transition: 0.2s;

  &:hover {
    background-color: #e9ecef;
  }
`
export const SendButton = styled.button`
  color: #ffffff;
  justify-self: center;
  align-self: center;
  text-justify: center;
  border: 1px solid black;
  border-radius: 0.5rem;
  box-shadow: rgba(27, 31, 36, 0.1);
  width: 50%;
  height: 30px;
  background-color: #2da44e;
  font-size: large;
  font-weight: normal;
  font-family: sans-serif;

  transition: 0.2s;

  &:hover {
    background-color: #2c974b;
  }
`
export const RedButton = styled.button`
  color: #ffffff;
  justify-self: center;
  align-self: center;
  text-justify: center;
  border: 1px solid black;
  border-radius: 0.5rem;
  box-shadow: rgba(27, 31, 36, 0.1);
  width: 50%;
  min-height: 30px;
  background-color: #cf222e;
  font-size: large;
  font-weight: normal;
  font-family: sans-serif;

  transition: 0.2s;

  &:hover {
    background-color: #ffffff;
    color: #cf222e;
  }
`
