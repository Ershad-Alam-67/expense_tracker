import React, { useContext, useLayoutEffect, useState } from "react"
import MyContext from "./MyContext"

const ContextProvider = (props) => {
  const [idToken, setIdToken] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const value = {
    idToken,
    setIdToken,
    setIsLoggedIn,
    isLoggedIn,
  }
  return <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
}

export default ContextProvider
