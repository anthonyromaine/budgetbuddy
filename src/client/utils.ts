import dayjs, { Dayjs } from "dayjs";
import { Transaction, Tag } from "@wasp/entities"
import { TransactionType } from "./types/TransactionType";

export type TransactionWTag = Transaction & {
  tags: Tag[]
}

export function DayDate(date: dayjs.Dayjs): dayjs.Dayjs {
    return dayjs(new Date(
      date.year(),
      date.month(),
      date.date()
    ))
}

export function sumTransactionsByType(type: string){
    return (prev: number, curr: Transaction) => {
        if (curr.type == type){
          return prev + curr.amount
        }
        return prev;
    }
}

export function filterTransactionsByDate(filterStartDate: Dayjs | null = null, filterEndDate: Dayjs | null = null){
    return (transaction: Transaction) => {
        const transactionDate = DayDate(dayjs(transaction.date));
        let startDate = filterStartDate ? DayDate(filterStartDate) : null;
        let endDate = filterEndDate ? DayDate(filterEndDate) : null;
        
        if (startDate && endDate){
          return transactionDate.diff(startDate) >= 0 && transactionDate.diff(endDate) <= 0;
        } else if (startDate){
          return transactionDate.diff(startDate) >= 0
        } else if (endDate){
          return transactionDate.diff(endDate) <= 0
        }
  
        return true;
      }
}