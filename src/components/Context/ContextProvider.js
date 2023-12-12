import React, { useContext, useLayoutEffect, useState } from "react"
import MyContext from "./MyContext"

const ContextProvider = (props) => {
  const [idToken, setIdToken] = useState("")
  console.log(idToken)
  const value = {
    idToken,
    setIdToken,
  }
  return <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
}

export default ContextProvider
