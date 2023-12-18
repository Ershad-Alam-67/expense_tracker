import React, { useState, useContext } from "react"
import MyContext from "../Context/MyContext"
import "./Expenses.css"
import bread from "../../assets/food.png"
import fuel from "../../assets/fuel.png"

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

  const handleAddExpense = async (e) => {
    e.preventDefault()
    await context.setExpenses((prev) => [...prev, expense])
    await fetch(
      "https://expense-tracker-178b6-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      }
    )
    setExpense({
      money: "",
      category: "",
      description: "",
    })
  }

  // Group expenses by category
  const groupedExpenses = {}
  expenses.forEach((expenseItem) => {
    const { category } = expenseItem
    if (!groupedExpenses[category]) {
      groupedExpenses[category] = []
    }
    groupedExpenses[category].push(expenseItem)
  })

  const currentBalance = 700
  const totalCredit = 500 // Replace with your actual total credit calculation
  const totalExpenses = expenses.reduce(
    (total, expenseItem) => total + parseFloat(expenseItem.money),
    0
  )

  const categoryExpenses = Object.keys(groupedExpenses).map((category) => ({
    category,
    totalSpent: groupedExpenses[category].reduce(
      (total, expenseItem) => parseInt(total) + parseInt(expenseItem.money),
      0
    ),
  }))

  // Sort categories by total spent in descending order
  const sortedCategories = categoryExpenses.sort(
    (a, b) => b.totalSpent - a.totalSpent
  )
  console.log(sortedCategories)
  return (
    <div className="flex flex-col font-bold bg-customBg items-center p-5 main">
      <form
        onSubmit={handleAddExpense}
        className="flex flex-col items-center w-[80%] p-1 rounded-md"
      >
        <div className="flex rounded-md p-4">
          <div className="flex flex-col p-6 rounded bg-customColor text-white mr-4">
            <label htmlFor="money" className="mb-2 text-center ">
              Money Expense:
            </label>
            <input
              type="text"
              id="money"
              name="money"
              value={expense.money}
              onChange={handleInputChange}
              className="px-3 py-2 border text-customColor rounded-md"
              required
            />
          </div>

          <div className="flex flex-col p-6 rounded bg-customColor text-white mr-4">
            <label htmlFor="category" className="mb-2 text-white">
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={expense.category}
              onChange={handleInputChange}
              className="px-3 py-2 bg-white text-customColor border rounded-md"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Food">Food</option>
              <option value="Salary">Salary</option>
              <option value="Transportation">Transportation</option>
              <option value="Petrol">Petrol</option>
            </select>
          </div>

          <div className="flex flex-col p-6 rounded bg-customColor text-white mr-4">
            <label htmlFor="description" className="mb-2 text-white">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={expense.description}
              onChange={handleInputChange}
              className="px-3 py-2 border text-customColor font-normal rounded-md"
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
      <div className="w-[80%] flex justify-between  mt-4 ">
        <div className="w-[60%]   grid grid-cols-2  p-4">
          <div className="  grid grid-rows-2">
            <div className="bg-customColor p-2 m-2 mx-5">
              <p className="text-white font-bold">Current Balance</p>
              <p className="text-white">${currentBalance}</p>
            </div>
            <div className="bg-customColor p-2 m-2 mx-5">
              <p className="text-white font-bold">Total Credit</p>
              <p className="text-white">${totalCredit}</p>
            </div>
          </div>
          <div className="  grid grid-rows-2">
            <div className="bg-customColor p-2 m-2 mx-5">
              <p className="text-white">
                {sortedCategories.length > 0
                  ? sortedCategories[0].category
                  : "-"}
              </p>
              <p className="text-white font-bold">Total Spent</p>
              <p className="text-white">
                $
                {sortedCategories.length > 0
                  ? sortedCategories[0].totalSpent
                  : 0}
              </p>
            </div>
            <div className="bg-customColor p-3 m-2 mx-5">
              <p className="text-white">
                {sortedCategories.length > 1
                  ? sortedCategories[1].category
                  : "-"}
              </p>
              <p className="text-white font-bold">Total Spent</p>
              <p className="text-white">
                $
                {sortedCategories.length > 1
                  ? sortedCategories[1].totalSpent
                  : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[40%] rounded-xl max-h-[50vh] custom-scrollbar overflow-y-auto">
          <h2 className="text-center py-2 text-white">Expenses</h2>
          <ul className="p-6 font-normal flex flex-col py-2">
            {Object.keys(groupedExpenses).map((category, index) => (
              <div key={index} className="flex flex-col mb-4">
                <h3 className="text-lg   font-bold flex justify-between text-white mb-2">
                  {category}
                  <img
                    src={category === "Food" ? bread : fuel}
                    className=" shadow-md  pr-9  self-start h-7"
                    alt="icon"
                  ></img>
                </h3>
                {groupedExpenses[category].map((expenseItem, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="flex my-1 p-2 bg-customColor rounded"
                  >
                    <h1 className="px-2 w-[20%] text-white">
                      {expenseItem.money}
                    </h1>

                    <h1 className="px-2 w-[50%] text-white">
                      {expenseItem.description}
                    </h1>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Expenses