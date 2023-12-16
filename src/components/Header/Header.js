import React, { useContext } from "react"
import Logo from "../../assets/logo.png"
import { NavLink } from "react-router-dom"
import MyContext from "../Context/MyContext"
const Header = () => {
  const context = useContext(MyContext)
  const handleLogout = () => {
    localStorage.removeItem("user")
    context.setIsLoggedIn(false)
  }
  return (
    <div className=" flex justify-between  drop-shadow items-center w-screen   sticky shadow-black  shadow-md bg-customColor  h-12">
      <img src={Logo} className="  absolute left-8 h-[110%]"></img>
      <h1 className=" absolute left-24 text-customText font-bold text-xl ">
        Expense Tracker
      </h1>
      <nav className=" absolute left-80 ">
        <ul className=" flex items-center font-semibold text-cyan-400 p-3 ">
          <li>
            <NavLink
              to="/"
              exact
              className="pr-10 "
              activeClassName="underline"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/expenses" className=" pr-10" activeClassName="active">
              Expenses
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className=" pr-10" activeClassName="active">
              About Us
            </NavLink>
          </li>
        </ul>
      </nav>
      {context.isLoggedIn && (
        <button
          onClick={handleLogout}
          className=" absolute left-[88%] px-5 rounded-md py-1 font-bold  bg-cyan-500"
        >
          Logout
        </button>
      )}
    </div>
  )
}

export default Header
