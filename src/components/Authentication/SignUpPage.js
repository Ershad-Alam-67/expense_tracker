import React, { useState, useContext } from "react"
import BgImage from "../../assets/bgimg.jpg"
import Flower from "../../assets/flower.png"
import MyContext from "../Context/MyContext"
import { useNavigate } from "react-router-dom"

const SignUpPage = () => {
  const navigate = useNavigate()
  const context = useContext(MyContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showLogInPage, setShowLogInPage] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (showLogInPage) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAray5G5GdSNqIx_WRwfps8LT3Ou-mNTUw",
          {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        if (!response.ok) {
          throw new Error(`Error : ${response.statusText}`)
        }
        console.log("you are logged in")
        await response.json().then((data) => {
          console.log(data)
          context.setIdToken(data.idToken)
        })
        navigate("/")
      } catch (error) {
        alert(error.message)
      }
    } else {
      if (password === confirmPassword) {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAray5G5GdSNqIx_WRwfps8LT3Ou-mNTUw",
            {
              method: "POST",
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )

          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`)
          }
          console.log(response.json())
          setShowLogInPage(true)
          console.log("User successfully signed up!")
        } catch (error) {
          alert(error.message)
        }
      } else {
        alert("Passwords do not match!")
      }
    }
  }

  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight

  console.log(`Viewport width: ${viewportWidth}px`)
  console.log(`Viewport height: ${viewportHeight}px`)
  const hide = {
    display: "none",
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen pt-[6%]  flex   justify-center  font-sans"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className=" bg-customColor mt-11 lg:mt-3 h-[20%] lg:w-[30%] w-[80%] p-5 rounded-md">
        <h2 className="text-2xl text-white font-bold mb-4">
          {showLogInPage ? "Sign In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="">
          <div className="mb-2">
            <label htmlFor="email" className="block text-white mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full  px-3 py-1 rounded-md border"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-white mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-1 rounded-md border"
              required
            />
          </div>
          {!showLogInPage && (
            <div className="mb-2 ">
              <label
                htmlFor="confirmPassword"
                className="block text-white mb-2"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-1 rounded-md border"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-800 text-white px-4 py-2 rounded-md"
          >
            {showLogInPage ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <button
          onClick={() => {
            setShowLogInPage((prev) => !prev)
          }}
          className=" bg-cyan-600 text-white w-full mt-3  p-2 rounded-md text-center"
        >
          Have An Account? Login!
        </button>
      </div>
    </div>
  )
}

export default SignUpPage
