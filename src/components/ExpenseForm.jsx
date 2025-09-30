import React, { useState } from 'react'

export default function ExpenseForm({ setExpenses }) {

    //React support one way data binding.
    //Using useState we create controlled components
    //Controlled components required noChange() event to update values.

    const [expense, setExpense] = useState({
        title: '',
        category: '',
        amount: '',
    })


    const handleSubmit = (e) => {
        e.preventDefault()
        //crypto.randomUUID() generate random id 
        setExpenses((prevState) => [...prevState, { ...expense, id: crypto.randomUUID() }])
        setExpense({
            title: '',
            category: '',
            amount: '',
        })
    }

    /*
    The `handleChange` function updates the `expense` state with the new value based on the input
    field name.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }


    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <div className="input-container">
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    value={expense.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input-container">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                    required
                >
                    <option value="" hidden>
                        Select Category
                    </option>
                    <option value="grocery">Grocery</option>
                    <option value="clothes">Clothes</option>
                    <option value="bills">Bills</option>
                    <option value="education">Education</option>
                    <option value="medicine">Medicine</option>
                </select>
            </div>
            <div className="input-container">
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChange}
                    required
                />
            </div>
            <button className="add-btn">Add</button>
        </form>
    )
}