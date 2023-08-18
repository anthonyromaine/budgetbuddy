import Menu from "../components/Menu";
import { Select } from "antd";
import getTransactions from "@wasp/queries/getTransactions";
import { useQuery } from "@wasp/queries";
import { AreaChart, XAxis, YAxis, Tooltip, Area, ResponsiveContainer } from "recharts";
import { TransactionWTag } from "../utils";
import dayjs from "dayjs";
import { TransactionType } from "../types/TransactionType";

const  getOption = (label: string, value: string) => ({label, value});

const statsOptions = [
    getOption("Income/Expenses", "income-expenses"),
    getOption("By Category", "category"),
    getOption("Category Over Time", "category-time"),
    getOption("By Tag", "tag"),
    getOption("Tag Over Time", "tag-time"),
]

export default function Stats() {
    const { data: transactions, isLoading, error } = useQuery(getTransactions);

    if (isLoading){
        return <div>Loading...</div>
    }

    if (error){
        return <div>Error. Please try refreshing the page.</div>
    }
    
    return (
        <main className="w-full max-w-3xl mx-auto p-4">
            <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex mb-4 sm:mb-0">
                <Menu />
                <span className="text-2xl font-bold">Statistics</span>
                </div>
                <div className="flex">
                    <Select className="w-[200px]" options={statsOptions} defaultValue={statsOptions[0].value}/>
                </div>
            </div>

            <ResponsiveContainer width="100%" aspect={16/9} className="bg-white rounded-lg mt-4 shadow">
            <AreaChart
                data={getData("income-expenses", transactions)}
            >
                <defs>
                    <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3f8600" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3f8600" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="expensesColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#cf1322" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#cf1322" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="Income" stroke="#3f8600" fillOpacity={1} fill="url(#incomeColor)" />
                <Area type="monotone" dataKey="Expenses" stroke="#cf1322" fillOpacity={1} fill="url(#expensesColor)" />
            </AreaChart>
            </ResponsiveContainer>
        </main>
    )
}

function getData(type: string, transactions: TransactionWTag[]) {
    switch(type){
        case "income-expenses":
            return incomeExpenses(transactions)
    }
}

function incomeExpenses(transactions: TransactionWTag[]) {
    const data = [];
    for (let i = 0; i < 12; i++){
        data.push({ month: dayjs().month(i).format("MMM"), Income: 0, Expenses: 0 });
    }

    for (const transaction of transactions){
        const month = transaction.date.getMonth();
        if (transaction.type === TransactionType.Expense){
            data[month].Expenses = data[month].Expenses + transaction.amount;
        } else {
            data[month].Income = data[month].Income + transaction.amount;
        }
    }

    // Format all amount numbers
    for (let i = 0; i < 12; i++){
        //@ts-ignore
        data[i].Expenses = data[i].Expenses.toFixed(2);
        //@ts-ignore
        data[i].Income = data[i].Income.toFixed(2);
    }

    return data;
}

