import { useState } from 'react'
import './App.css'
import { Inputfield } from './Components/Inputfied/Inputfield'
import { LoginForm } from './Components/Login/Login'
import signUpController from './Controllers/SignInController.json'

function App() {

  const [message, setMessage] = useState()
  const signUp = (e) => {

    e.preventDefault()
    let url = "http://localhost:8081/sign-up"

    let body = new URLSearchParams()
    body.append("name", e.target.name.value)
    body.append("email", e.target.email.value)
    body.append("password", e.target.password.value)
    console.log(body);

    let options = {
      method: "POST",
      body: body,
    }


    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));

  }
  console.log(message);
  return (
    <>
      <LoginForm submitAction={signUp}>
        {message && <b>{message}</b>}
        {signUpController.form.map((input, i) => {
          return (

            <Inputfield
              key={i}
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              value={input.value}
              required={input.required}
              labelText={input.labelText}
            />

          )
        })}

        <p>Already have an account? <a href="">Login here</a></p>
      </LoginForm>

    </>
  )
}

export default App


// Dynamisk input field med props som kan være alle slags inputs
// Komponent der samler de inputfields i en form og har en submit funktion