import { useState } from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import expenseData from './expenseData'

function App() {
  const [expenses, setExpenses] = useState(expenseData);
  const [editableRow, setEditableRow] = useState('');
  const [expense, setExpense] = useState({
    title: '',
    category: '',
    amount: '',
  })

  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm
          setExpenses={setExpenses}
          setExpense={setExpense}
          expense={expense}
          setEditableRow={setEditableRow}
          editableRow={editableRow}
        />

        <ExpenseTable
          expenses={expenses}
          setExpenses={setExpenses}
          setExpense={setExpense}
          expense={expense}
          setEditableRow={setEditableRow}
          editableRow={editableRow}
        />
      </div>
    </main>
  )
}

export default App