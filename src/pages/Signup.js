import './Signup.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import {createUserDocument} from "../firebase"
import { useHistory } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';

const Signup = () => {
    const dispatch = useDispatch()
    const [enteredName, setEnteredName] = useState()
    const [enteredEmail, setEnteredEmail] = useState("")
    const [enteredPassword, setEnteredPassword] = useState("")
    const [enteredPassword2, setEnteredPassword2] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const histrory = useHistory()

    const onSubmitHandler = (ev) => {
        ev.preventDefault()
        setIsLoading(true)
        setErrorMessage("")
        if (!enteredName) {
            setErrorMessage("Please, enter your name.")
            return
        }
        if (!enteredEmail.includes("@")) {
            setErrorMessage("Invalid e-mail address.")
            return
        }
        if (enteredPassword.trim().length === 0) {
            setErrorMessage("Please, enter a password.")
            return
        }
        if (enteredPassword.length < 6) {
            setErrorMessage("Password too short. Minimum 6 digits required.")
            return
        }
        if (enteredPassword !== enteredPassword2) {
            setErrorMessage("Passwords don't match.")
            return
        }

        const user = {
            name: enteredName
        }

        const APIKey = "AIzaSyCbPkrM25orgn2epFQ-dQXNeaW4wk6Kv6A"

        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKey}`,
        {
            method:"POST",
            headers : {
                "Content-type": "application/JSON"
            },
            body:JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
                returnSecureToken : true
            })
        }
        ).then(response =>{
            if(response.ok){
                 return response.json()
            } else {
                 return response.json().then(data => {
                     let errorMessage = "Register failed"
                     throw new Error(errorMessage)
                 })
            }
        }).then(data => {
            setIsLoading(false)
            createUserDocument(data, user)
            console.log("the data",data)
            const myToken = data.idToken
            const myLocalId = data.localId
            dispatch(authActions.login(myToken))
            dispatch(authActions.localIdIn(myLocalId))
            histrory.replace(`homepage`)
            
            
        }).catch(error => {
            setErrorMessage(error.message)
        })

    }


    return <><div className="signUpFormContainer">
        <div className="formWrapper">
        <form onSubmit={onSubmitHandler}>
            <div id="nameElement">
                <label>Name </label>
                <input type="text" onChange={(ev) => setEnteredName(ev.target.value)} />
            </div>
            <div>
                <label>E-mail : </label>
                <input type="email" onChange={(ev) => setEnteredEmail(ev.target.value)} />
            </div>
            <div>
                <label>Password : </label>
                <input type="password" onChange={(ev) => setEnteredPassword(ev.target.value)} />
            </div>
            <div>
                <label>Confirm password : </label>
                <input type="password" onChange={(ev) => setEnteredPassword2(ev.target.value)} />
            </div>
            <button className="signUpButton">Sign up</button>
            {isLoading && <LoadingSpinner/>}
            <div className="errorMessage">
                {errorMessage}
            </div>
        </form>
         
    </div>
    <div className="horizontalLine3"></div>
    </div>
    </>
}

export default Signup;