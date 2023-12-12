import React from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import SignUpPage from "./components/Authentication/SignUpPage"
import Home from "./components/Home/Home"

function App() {
  return (
    <div className=" h-screen ">
      {/* Header is always visible */}
      <Header />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
