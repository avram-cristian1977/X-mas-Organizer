import './Contact.css'
import { useState } from 'react'
import AnimationInfo from '../components/AnimationInfo'
import emailjs from 'emailjs-com'


const Contact = () => {


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [messageSent, setMessageSent] = useState("")

    const submitEmailHandler = (ev) => {
        ev.preventDefault()
        emailjs.sendForm(
            "service_w4z2933", "template_uvwmb25", ev.target, "user_wqLTfWBPG7HMvi09wZKcs"
        ).then(response => {
            setMessageSent("message sent!")
            console.log(response)
        }).catch(err => console.log(err))
        setName("")
        setEmail("")
        setMessage("")
    }
console.log(name, email, message);
    return <> <div className="userDataFormContainer">
        <div className="createFormDataWrapper">
            <form onSubmit={submitEmailHandler} >
                <label >Your Name : </label>
                <input type="text" value={name}  name="name"
                    onChange={(ev) => setName(ev.target.value)} />
                <label>Your Email  : </label>
                <input type="email" value={email} name="user_email"
                    onChange={(ev) => setEmail(ev.target.value)} />

                <button className="sendMsgBtn">Send Message</button>
                <textarea name="message" cols="60" rows="7"
                    value={message}
                    onChange={(ev) => setMessage(ev.target.value)}
                ></textarea>
<h5 className="messageSent">{messageSent}</h5>
            </form>
        </div>
    </div>
    <div className="horizontalLine4"></div>
        
        <AnimationInfo />
    </>
}

export default Contact;