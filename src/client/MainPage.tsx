import { useState } from "react";
import dayjs from "dayjs";
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
declare type EventValue<DateType> = DateType | null;
declare type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null;

const { RangePicker } = DatePicker;

type TransactionWTag = Transaction & {
  tags: Tag[]
}

const MainPage = ({ user }: { user: User }) => {
  const { data: transactions, isLoading, error } = useQuery(getTransactions);
  const [dateFilter, setDateFilter] = useState<RangeValue<dayjs.Dayjs>>(null);
  let income = 0, expense = 0;
  if (isLoading){
    return <div>Loading...</div>
  } else {
    income = transactions?.reduce((prev, curr) => {
      if (curr.type == TransactionType.Income){
        return prev + curr.amount
      }
      return prev;
    }, 0) || 0;

    expense = transactions?.reduce((prev, curr) => {
      if (curr.type == TransactionType.Expense){
        return prev + curr.amount
      }
      return prev;
    }, 0) || 0;

    const filteredTransactions: Transaction[] = transactions?.filter(transaction => {
      const transactionDate = DayDate(dayjs(transaction.date));
      let startDate = dateFilter?.[0] ? DayDate(dateFilter?.[0]) : null;
      let endDate = dateFilter?.[1] ? DayDate(dateFilter?.[1]) : null;
      
      if (startDate && endDate){
        console.log(transactionDate, startDate)
        return transactionDate.diff(startDate) >= 0 && transactionDate.diff(endDate) <= 0;
      } else if (startDate){
        return transactionDate.diff(startDate) >= 0
      } else if (endDate){
        return transactionDate.diff(endDate) <= 0
      }

      return true;
    }) || [];
  return (
    <main className="w-full max-w-3xl mx-auto p-4">
      
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="mb-4 sm:mb-0">
          <span className="text-2xl font-bold">Hello, {user.username}</span>
        </div>
        <div><RangePicker value={dateFilter} onChange={setDateFilter} allowEmpty={[true, true]} /></div>
      </div>

      <OverviewCards income={income} expense={expense} />
      <TransactionModal />

      <List className="bg-white rounded-lg px-6 mt-4 shadow">
        <VirtualList
          data={filteredTransactions as TransactionWTag[] || []}
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
}
export default MainPage

function DayDate(date: dayjs.Dayjs): dayjs.Dayjs {
  return dayjs(new Date(
    date.year(),
    date.month(),
    date.date()
  ))
}
