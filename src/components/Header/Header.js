import React from "react"
import Logo from "../../assets/logo.png"
const Header = () => {
  return (
    <div className=" flex justify-between  drop-shadow items-center w-screen   fixed shadow-black shadow-md bg-customColor  h-12">
      <img src={Logo} className=" absolute left-8 h-[110%]"></img>
    </div>
  )
}

export default Header
// ershad ala is lier
