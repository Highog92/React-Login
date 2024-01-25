import { useContext, useState } from "react"
import { UserContext } from "../../Context/UserContext"
import { LoginForm } from "../Login/Login"
import { Inputfield } from "../Inputfied/Inputfield"

export function UserData() {
    const { userData } = useContext(UserContext)
    const [message, setMessage] = useState()

    console.log(message);


    const sendMessage = (e) => {
        e.preventDefault()
        const url = "http://localhost:8081/message/create"
        const body = new URLSearchParams()
        body.append('message', e.target.message.value)
        const options = {
            method: "POST",
            body: body,
            headers: {
                'Authorization': 'Bearer ' + userData.accessToken
            }
        }

        fetch(url, options)
            .then((res) => res.json())
            .then((data) => setMessage(data))
            .catch((err) => console.log(err));

    }


    return (
        <section>
            <p>NAME:{userData?.name}</p>
            <p>EMAIL:{userData?.email}</p>

            <LoginForm submitAction={(e) => { sendMessage(e) }}>
                <Inputfield
                    type="textfield"
                    placeholder="Enter a message"
                    name="message" />

                <Inputfield
                    type="submit"
                    value="Send Message" />


            </LoginForm>


        </section>
    )


}