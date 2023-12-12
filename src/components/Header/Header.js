import React from "react"
import Logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom"
const Header = () => {
  return (
    <div className=" flex justify-between  drop-shadow items-center w-screen   sticky shadow-black  shadow-md bg-customColor  h-12">
      <img src={Logo} className="  absolute left-8 h-[110%]"></img>
      <h1 className=" absolute left-24 text-customText font-bold text-xl ">
        Expense Tracker
      </h1>
      <nav className=" absolute left-80 ">
        <ul className=" flex items-center font-semibold text-cyan-400 p-3 ">
          <li>
            <NavLink to="/" exact className="pr-10" activeClassName="underline">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className=" pr-10" activeClassName="active">
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className=" pr-10" activeClassName="active">
              About Us
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
