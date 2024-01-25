import { useContext, useState } from 'react'
import './App.css'
import { Inputfield } from './Components/Inputfied/Inputfield'
import { LoginForm } from './Components/Login/Login'
import signUpController from './Controllers/SignUpController.json'
import signInpController from './Controllers/SignInController.json'
import { UserData } from './Components/User/UserData'
import { UserContext } from './Context/UserContext'



function App() {

  const [message, setMessage] = useState()
  const [isSignIn, setIsSignIn] = useState(true)
  const [data, setData] = useState(null)

  const { userData, setUserData } = useContext(UserContext)


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

  const signIn = (e) => {
    e.preventDefault()
    let url = "http://localhost:8081/sign-in"
    let body = new URLSearchParams()
    body.append('email', e.target.email.value)
    body.append('password', e.target.password.value)

    let options = {
      method: "POST",
      body: body,
    }

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => setUserData(data));

  }

  console.log(data);
  console.log(message);
  return (
    <>


      <button onClick={() => setIsSignIn(!isSignIn)}>{isSignIn ? "Sign in" : "Sign up"}</button>
      <LoginForm submitAction={isSignIn ? signIn : signUp} >
        <p>{!isSignIn ? "Sign up" : "Sign in"}</p>
        {message && <b>{message}</b>}
        {!isSignIn
          ? signUpController.form.map((input, i) => {
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

            );
          })
          : signInpController.form.map((input, i) => {
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

      </LoginForm>

      {userData?.accessToken && <UserData />}
    </>
  )
}

export default App


// Dynamisk input field med props som kan være alle slags inputs
// Komponent der samler de inputfields i en form og har en submit funktion