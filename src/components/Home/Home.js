import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import MyContext from "../Context/MyContext"

const Home = () => {
  const context = useContext(MyContext)
  const verifyEmail = async () => {
    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAray5G5GdSNqIx_WRwfps8LT3Ou-mNTUw",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: context.idToken,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAray5G5GdSNqIx_WRwfps8LT3Ou-mNTUw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: context.idToken,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.users && data.users.length > 0) {
          const user = data.users[0]

          if (user.displayName) {
            context.setIsVerified(true)
            console.log("e_v")
          } else {
            context.setIsVerified(false)
            console.log("falsed")
          }
        } else {
        }
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }

  console.log(context.isProfileComplete)

  return (
    <div className="p-3 flex justify-center">
      <div className="max-w-md mx-auto bg-cyan-950  flex flex-col rounded-md overflow-hidden shadow-md p-4">
        <h1 className="text-2xl font-bold mb-4 text-stone-200">
          Welcome to Expense Tracker
        </h1>
        {!context.isProfileComplete && (
          <div>
            <p className="text-gray-700 rounded-md italic bg-red-200 p-1 px-2 w-fit mb-4">
              Your profile is incomplete!
            </p>
            <Link to="/complete-profile" className=" underline text-blue-300">
              Complete Now!
            </Link>
          </div>
        )}
        {!context.isVerified && (
          <button
            onClick={verifyEmail}
            className=" bg-cyan-600 rounded-md text-white w-fit self-end px-3 py-1 "
          >
            Verify Email
          </button>
        )}
      </div>
    </div>
  )
}

export default Home
