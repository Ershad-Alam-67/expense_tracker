import React, { useContext, useEffect, useState } from "react"
import MyContext from "./MyContext"

const ContextProvider = (props) => {
  const [idToken, setIdToken] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  useEffect(() => {
    if (isLoggedIn) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAray5G5GdSNqIx_WRwfps8LT3Ou-mNTUw",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.users && data.users.length > 0) {
            const user = data.users[0]
            if (user.displayName) {
              console.log("Display Name is set")
              setIsProfileComplete(true)
            } else {
              console.log("Display Name is not set")
              setIsProfileComplete(false)
            }
          } else {
            console.log("User not found")
            setIsProfileComplete(false)
          }
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    }
  }, [isLoggedIn, idToken])

  const value = {
    idToken,
    setIdToken,
    setIsLoggedIn,
    isLoggedIn,
    isProfileComplete,
    setIsProfileComplete,
  }
  return <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
}

export default ContextProvider
