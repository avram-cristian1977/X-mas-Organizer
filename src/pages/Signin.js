import './Signup.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'
import { useHistory } from 'react-router'
import LoadingSpinner from '../components/LoadingSpinner'

const Singnin = () => {
    const dispatch = useDispatch()
    const [enteredEmail, setEnteredEmail] = useState("")
    const [enteredPassword, setEnteredPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const histrory = useHistory()

    const loginHandler = (ev) => {
        setErrorMessage("")
        ev.preventDefault()
        setIsLoading(true)
        if (!enteredEmail || !enteredPassword) {
            setErrorMessage("All fields are required")
        }
        const APIKey = "AIzaSyCbPkrM25orgn2epFQ-dQXNeaW4wk6Kv6A"
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKey}`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/JSON"
                },
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true
                })
            }
        ).then(response => {
            if (response.ok) {
                console.log("response", response);
                console.log("response!");
                return response.json()
            } else {
                console.log("failed");
                return response.json().then(data => {
                    let errorMessage = "Authentiction failed"
                    throw new Error(errorMessage)
                })
            }
        }).then(data => {
            setIsLoading(false)
            const myToken = data.idToken
            const myLocalId = data.localId
            console.log("data from signin.js",data);
            console.log("my tooooken", myToken);
            dispatch(authActions.login(myToken))
            dispatch(authActions.localIdIn(myLocalId))
            histrory.replace(`homepage`)
        }).catch(error => {
            setErrorMessage(error.message)
        })
    }

    return <><div className="formWrapper">
        <form onSubmit={loginHandler}>
            <div id="emailElement">
                <label>E-mail : </label>
                <input type="email" onChange={(ev) => { setEnteredEmail(ev.target.value) }} />
            </div>
            <div>
                <label>Password : </label>
                <input type="password" onChange={(ev) => setEnteredPassword(ev.target.value)} />
            </div>
            <button className="signUpButton">Login</button>
            {isLoading && <LoadingSpinner/>}
            <div className="errorMessage">
                {errorMessage}
            </div>
        </form>
    </div>
     <div className="horizontalLine3"></div>
    </>
}

export default Singnin;