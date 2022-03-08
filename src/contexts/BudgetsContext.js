import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import { UNCATEGORIZED_BUDGET_ID } from "../constants/budgetConstants";
import { useLocalStorage } from "../hooks/useLocalStorage";
//create context
const BudgetsContext = React.createContext();

//allow us to use our contexts
export function useBudgets() {
  return useContext(BudgetsContext);
}
//

//Budget Provider to grab our application
export const BudgetsProvider = ({ children }) => {
  //budgets array
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  //expenses array
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  function getBudgetExpenses(budgetId) {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  function addExpense({ description, amount, budgetId }) {
    //add new expense
    setExpenses((preExpenses) => {
      return [...preExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  }
  function addBudget({ name, max }) {
    //add new budget
    setBudgets((prevBudgets) => {
      //if we try to create a new budget with the same name as a previews budget: return prevBudgets
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  }
  function deleteBudget({ id }) {
    //when we delete a budget move all expenses assosiated with this budget to uncategorized expenses
    setExpenses((preExpenses) => {
      return preExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
    setBudgets((prevBudgets) => {
      return prevBudgets.filter((budget) => budget.id !== id);
    });
  }
  function deleteExpense({ id }) {
    //
    setExpenses((preExpenses) => {
      return preExpenses.filter((expense) => expense.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
