import { User } from "@wasp/entities";
import { DatePicker } from "antd";
import getTransactions from "@wasp/queries/getTransactions"
import { useQuery } from "@wasp/queries"
import { Transaction } from "@wasp/entities"
import './Main.css'
import TransactionModal from "./components/TransactionModal";
import OverviewCards from "./components/OverviewCards";


const { RangePicker } = DatePicker;

const MainPage = ({ user }: { user: User }) => {
  const { data: transactions, isLoading, error } = useQuery(getTransactions);
  if (!isLoading){
    console.log(transactions);
  }
  return (
    <main className="w-full max-w-3xl mx-auto p-4">
      
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="mb-4 sm:mb-0">
          <span className="text-2xl font-bold">Hello, {user.username}</span>
        </div>
        <div><RangePicker /></div>
      </div>

      <OverviewCards income={5280.72} expense={3620.53} />
      <TransactionModal />
    </main>
  )
}
export default MainPage
