import React from 'react'
import Cookie from 'js-cookie'
import { createBrowserHistory } from 'history'
const history=createBrowserHistory()
function Logout()
{
    function logout()
    {
        localStorage.clear()
        Cookie.remove('userInfo')
        
    }
    logout()
    return(
        <h1> You are succesfully Logged out</h1>
    )
}
export default Logout