import React, { useContext } from "react"
import { Link } from "react-router-dom"
import MyContext from "../Context/MyContext"

const Home = () => {
  const context = useContext(MyContext)
  console.log(context.isProfileComplete)
  return (
    <div className="p-3 flex justify-center">
      <div className="max-w-md mx-auto bg-cyan-950  rounded-md overflow-hidden shadow-md p-4">
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
      </div>
    </div>
  )
}

export default Home
