import dayjs, { Dayjs } from "dayjs";
import { Transaction, Tag } from "@wasp/entities"
import { TransactionType } from "./types/TransactionType";
import { FilterGroups, FilterLogic, SingleValueType } from "./components/TransactionFilter";

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

export function filterTransactions(transactions: TransactionWTag[], filters: SingleValueType[]){
  const { 
    [FilterGroups.Logic]: logicOptions = [], 
    [FilterGroups.Category]: categoryOptions = [],
    [FilterGroups.Tag]: tagOptions = [],
    [FilterGroups.Type]: typeOptions = []
  } = getFilterOptionsByGroup(filters);
  let filteredTransactions = [];
  const filterLogic = logicOptions.length === 1 ? logicOptions[0] : FilterLogic.AND;

  console.log(filterLogic);
  if (filterLogic === FilterLogic.AND){
    if (categoryOptions.length > 1 || typeOptions.length > 1){
      return [];
    }

    const categoryOption = categoryOptions.pop();
    const typeOption = typeOptions.pop();
    filteredTransactions = transactions.filter(transaction => {
      // if category option selected check that category matches
      if (categoryOption && transaction.categoryName != categoryOption){
        return false;
      }
      // if type option selected check that type matches
      if (typeOption && transaction.type !== typeOption){
        return false;
      }

      // for each tag option selected check that the transaction has that tag
      const transactionTags = transaction.tags.map(tag => tag.name);
      for (const tag of tagOptions){
        if (!transactionTags.includes(tag)){
          return false;
        }
      }

      return true;
    });
    console.log(filteredTransactions)
    return filteredTransactions;
  }
  
  // FilterLogic.OR
  return transactions;

}

function getFilterOptionsByGroup(filters: SingleValueType[]){
  const optionsByGroup = new Map<string, string[]>();

  for (const filter of filters){
    const [group, option] = filter;
    const optionGroup = optionsByGroup.get(group as string);
    if (optionGroup){
      optionGroup.push(option as string);
    } else {
      optionsByGroup.set(group as string, [option as string]);
    }
  }

  return Object.fromEntries(optionsByGroup);
}

