import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'
import Select from './Select'

export default function ExpenseForm({
    setExpenses,
    setExpense,
    expense,
    editableRow,
    setEditableRow
}) {


    //React support one way data binding.
    //Using useState we create controlled components
    //Controlled components required onChange() event to update values.



    const [errors, setErrors] = useState({})

    const validationConfig = {
        title: [
            { required: true, message: 'Please enter title' },
            { minLength: 5, message: 'Title should be at least 5 characters long' },
        ],
        category: [{ required: true, message: 'Please select a category' }],
        amount: [
            { required: true, message: 'Please enter an amount' },
            { pattern: /^[0-9]+(\.[0-9]+)?$/, message: 'Please enter a valid number' }
        ],
    }

    const validate = (formData) => {
        const errorsData = {}

        Object.entries(formData).forEach(([key, value]) => {
            validationConfig[key].some((rule) => {
                if (rule.required && !value) {
                    errorsData[key] = rule.message
                    return true
                }

                if (rule.minLength && value.length < 5) {
                    errorsData[key] = rule.message
                    return true
                }

                if (rule.pattern && !rule.pattern.test(value)) {
                    errorsData[key] = rule.message
                    return true
                }
            })
        })

        setErrors(errorsData)
        return errorsData
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const validateResult = validate(expense)

        if (Object.keys(validateResult).length) return

        /* This block of code is handling the case where the form is in edit mode (`editableRow` is
        truthy). */
        if (editableRow) {
            setExpenses((prevState) =>
                prevState.map((prevExpense) => {
                    if (prevExpense.id === editableRow) {
                        return { ...expense, id: editableRow }
                    }
                    return prevExpense
                })
            )
            setExpense({
                title: '',
                category: '',
                amount: '',
            })
            setEditableRow('');
            return
        }

        /* This block of code is adding a new expense object to the existing
        array of expenses. */
        setExpenses((prevState) => [
            ...prevState,
            { ...expense, id: crypto.randomUUID() },
        ])
        setExpense({
            title: '',
            category: '',
            amount: '',
        })
    }



    //The `handleChange` function updates the `expense` state with the new value based on the input field name.
    const handleChange = (e) => {
        const { name, value } = e.target
        setExpense((prevState) => ({
            ...prevState,
            [name]: value,
        }))
        setErrors({})
    }

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <Input
                label="Title"
                id="title"
                name="title"
                value={expense.title}
                onChange={handleChange}
                error={errors.title}
            />
            <Select
                label="Category"
                id="category"
                name="category"
                value={expense.category}
                onChange={handleChange}
                options={['Grocery', 'Clothes', 'Bills', 'Education', 'Medicine']}
                defaultOption="Select Category"
                error={errors.category}
            />
            <Input
                label="Amount"
                id="amount"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                error={errors.amount}
            />
            <button className="add-btn">{editableRow ? "Save" : "Add"}</button>
        </form>
    )
}