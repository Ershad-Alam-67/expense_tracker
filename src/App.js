import React, { useContext } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import SignUpPage from "./components/Authentication/SignUpPage"
import Home from "./components/Home/Home"
import ContextProvider from "./components/Context/ContextProvider"
import ProfileData from "./components/Home/ProfileData"
import MyContext from "./components/Context/MyContext"

function App() {
  const context = useContext(MyContext)
  return (
    <div>
      <div className="">
        {/* Header is always visible */}
        <Header />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={context.isLoggedIn ? <Home /> : <SignUpPage />}
          />
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route
            path="/complete-profile"
            element={<ProfileData></ProfileData>}
          ></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
