import React, { useState, useContext } from "react"
import MyContext from "../Context/MyContext"
import "./Expenses.css"

const Expenses = () => {
  const context = useContext(MyContext)
  const expenses = context.expenses
  const [expense, setExpense] = useState({
    money: "",
    category: "",
    description: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setExpense((prevExpense) => ({ ...prevExpense, [name]: value }))
  }

  const handleAddExpense = (e) => {
    e.preventDefault()
    context.setExpenses((prev) => [...prev, expense])

    console.log("Expense data:", expense)
    setExpense({
      money: "",
      category: "",
      description: "",
    })
  }

  return (
    <div className="flex flex-col bg-customBg mt-3 items-center p-5   bg-slate-400 main">
      <form
        onSubmit={handleAddExpense}
        className="flex flex-col items-center w-[80%] p-1  rounded-md"
      >
        <div className="flex rounded-md   p-4 ">
          <div className="flex flex-col p-6 rounded  bg-red-200 mr-4">
            <label htmlFor="money" className="mb-2 text-center text-gray-800">
              Money Expense:
            </label>
            <input
              type="text"
              id="money"
              name="money"
              value={expense.money}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="flex rounded-md  flex-col text-center bg-gray-200 p-6 mr-4">
            <label htmlFor="category" className="mb-2 text-gray-800">
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={expense.category}
              onChange={handleInputChange}
              className="px-3 py-2 bg-white border rounded-md"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="food">Food</option>
              <option value="salary">Salary</option>
              <option value="transportation">Transportation</option>
              <option value="petrol">Petrol</option>
            </select>
          </div>

          <div className="flex rounded-md  flex-col text-center bg-amber-200 p-6">
            <label htmlFor="description" className="mb-2 text-gray-800">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={expense.description}
              onChange={handleInputChange}
              className="px-3 py-2 border rounded-md"
              rows={1}
              required
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-32 text-lg py-2 rounded-md"
        >
          Add Expense
        </button>
      </form>
      <div className="w-[80%] flex mt-4  bg-slate-300">
        <div className="w-[50%] bg-neutral-400  p-4"></div>
        <div className="w-[50%] rounded-xl    max-h-[50vh] custom-scrollbar overflow-y-auto">
          <h2 className=" text-center py-2">Expenses</h2>
          <ul className=" bg-red-300 p-6 py-2">
            {expenses.map((expense, index) => (
              <li key={index} className=" flex bg-emerald-700 my-1 p-2">
                <h1 className=" px-2 w-[20%]  bg-amber-50">{expense.money}</h1>
                <h1 className=" px-2  w-[30%]  bg-slate-500">
                  {expense.category}
                </h1>
                <h1 className=" px-2 w-[50%] bg-stone-100">
                  {expense.description}
                </h1>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Expenses
