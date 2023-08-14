import { Tag, User } from "@wasp/entities";
import { DatePicker, List, Tag as AntTag } from "antd";
import VirtualList from 'rc-virtual-list';
import getTransactions from "@wasp/queries/getTransactions"
import { useQuery } from "@wasp/queries"
import { Transaction } from "@wasp/entities"
import { TransactionType } from "./types/TransactionType";
import './Main.css'
import TransactionModal from "./components/TransactionModal";
import OverviewCards from "./components/OverviewCards";


const { RangePicker } = DatePicker;
type TransactionWTag = Transaction & {
  tags: Tag[]
}
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

      <List className="bg-white rounded-lg px-6 mt-4 shadow"
        // itemLayout="vertical"
      >
        <VirtualList
          data={transactions as TransactionWTag[] || []}
          height={400}
          fullHeight={false}
          itemHeight={50}
          itemKey="id"
        >
          {(transaction: TransactionWTag) => (
            <List.Item key={transaction.id}>
              <div className="w-full grid grid-cols-3 gap-2">
                <div>
                  <p className="text-base font-bold">{transaction.description}</p>
                  <p className="text-gray-500">{transaction.date.toDateString()}</p>
                </div>
                <div><span className="text-base">{transaction.categoryName}</span></div>
                <div className="text-right"><span className={["text-base", transaction.type === TransactionType.Income ? "text-main-green" : "text-main-red"].join(" ")}>{transaction.type == TransactionType.Income ? `+$${transaction.amount}` : `-$${transaction.amount}`}</span></div>

                <div className="col-span-3">
                  {transaction.tags.map(tag => <AntTag key={tag.id}  color="green">{tag.name}</AntTag>)}
                </div>
              </div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </main>
  )
}
export default MainPage
