import BudgetCard from "./BudgetCard";
import { UNCATEGORIZED_BUDGET_ID } from "../constants/budgetConstants";
import { useBudgets } from "../contexts/BudgetsContext";
export default function UncategorizedBudgetCard(props) {
  const { getBudgetExpenses } = useBudgets();
  //sums all the expenses to a single value
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount,
    0
  );

  if (amount === 0) return null;
  return <BudgetCard amount={amount} name="Uncategorized" gray {...props} />;
}
