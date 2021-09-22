import { NavLink } from "react-router-dom";
import './Navigation.css'

import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useSelector } from "react-redux";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import './ListsOfGifts.css'
import { useState, useEffect } from 'react'
import styled from 'styled-components'




const Navigation = (props) => {
    const dispatch = useDispatch()
    const isAuthenticated = useSelector(state => state.auth.token)
    const localId = useSelector(state => state.auth.localId)
    const [cloud1Clicked, setCloud1Clicked] = useState(false)
    const [cloud2Clicked, setCloud2Clicked] = useState(false)
    const [cloud3Clicked, setCloud3Clicked] = useState(false)
    const [cloud4Clicked, setCloud4Clicked] = useState(false)
    const [cloud5Clicked, setCloud5Clicked] = useState(false)
    const [hamOpen, setHamOpen] = useState(false)


    const Nav = styled.nav`
        @media screen and (max-width: 600px) {
            margin-top:50px;
        display:${({hamOpen}) => hamOpen ? "flex" : "none"};
        
}
`

useEffect(() => { getNameHandler() }, [localId])



    const db = firebase.firestore()
    //   const listRef = db.collection("users").doc(localId).collection("lists").doc()
    const [name, setName] = useState("")



    const getNameHandler = () => {
        if (!localId) {
            return
        }
        db.collection('users').doc(localId).get().then(doc => {
            setName(doc.data().name)
        })

    }

    const cloud1ClickHandler = () => {
        setCloud1Clicked(true)
        setCloud2Clicked(false)
        setCloud3Clicked(false)
        setCloud4Clicked(false)
        setCloud5Clicked(false)

    }

    const cloud2ClickHandler = () => {
        setCloud1Clicked(false)
        setCloud2Clicked(true)
        setCloud3Clicked(false)
        setCloud4Clicked(false)
        setCloud5Clicked(false)

    }
    const cloud3ClickHandler = () => {
        setCloud1Clicked(false)
        setCloud2Clicked(false)
        setCloud3Clicked(true)
        setCloud4Clicked(false)
        setCloud5Clicked(false)

    }

    const cloud4ClickHandler = () => {
        setCloud1Clicked(false)
        setCloud2Clicked(false)
        setCloud3Clicked(false)
        setCloud4Clicked(true)
        setCloud5Clicked(false)

    }
    const cloud5ClickHandler = () => {
        setCloud1Clicked(false)
        setCloud2Clicked(false)
        setCloud3Clicked(false)
        setCloud4Clicked(false)
        setCloud5Clicked(true)
    }

   
    return <header>
            <div className="hamburger" onClick={() => setHamOpen(!hamOpen)}>
            <i className="fas fa-bars"></i>
            </div>
        <Nav hamOpen={hamOpen}>


            <div className="clouds-left">
                <div id="cloud1">
                    {cloud1Clicked && <span className="shadow1"></span>}
                    <NavLink
                        onClick={cloud1ClickHandler}
                        activeClassName="active-link" to="/homepage" className="home-link">Home</NavLink>
                </div>
                <div id="cloud2">
                    {cloud2Clicked && <span className="shadow2"></span>}
                    <NavLink
                        onClick={cloud2ClickHandler}
                        activeClassName="active-link" to="/contact" className="home-link">Contact</NavLink>
                </div>
                {isAuthenticated && <div id="cloud3">
                    {cloud3Clicked && <span className="shadow3"></span>}
                    <NavLink
                        onClick={cloud3ClickHandler}
                        activeClassName="active-link" to={`/listsofgifts/${localId}`} className="home-link"><div className="linkwrap">Lists of Gifts</div></NavLink>
                </div>}
            </div>

            {isAuthenticated && <div className="animated-title">
                <div className="text-top">
                    <div>
                        <span>Welcome</span>

                    </div>
                </div>
                <div className="text-bottom">
                    <div>{name.toLocaleUpperCase()}</div>
                </div>

            </div>}

            <div className="clouds-right">
                {!isAuthenticated && <div id="cloud4">

                    {cloud4Clicked && <span className="shadow4"></span>}
                    <NavLink
                        onClick={cloud4ClickHandler}
                        activeClassName="active-link" to="/signup" className="home-link"><div className="linkwrap">Sign up</div></NavLink>
                </div>}

                {!isAuthenticated && <div id="cloud5">

                    {cloud5Clicked && <span className="shadow5"></span>}
                    <NavLink
                        onClick={cloud5ClickHandler}
                        activeClassName="active-link" to="/signin" className="home-link"><div className="linkwrap">Sign in</div></NavLink>
                </div>}
                {isAuthenticated && <div id="cloud5">
                    <NavLink
                        onClick={() => dispatch(authActions.logout())}
                        activeClassName="active-link" to="/signin" className="home-link"><div className="linkwrap">Logout</div></NavLink>
                </div>}
            </div>
        </Nav>
    </header>

}

export default Navigation;