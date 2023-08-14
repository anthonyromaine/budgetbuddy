import { Card, Statistic } from "antd";

type OverviewCardsProps = {
    income: number,
    expense: number
}

export default function OverviewCards({ income, expense}: OverviewCardsProps){
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
        <Card bordered={false}>
          <Statistic
            title="Income"
            value={income}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix="$"
          />
        </Card>
        <Card bordered={false}>
          <Statistic
            title="Expenses"
            value={expense}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix="$"
          />
        </Card>
        <Card bordered={false}>
          <Statistic
            title="Balance"
            value={Math.abs(income-expense)}
            precision={2}
            valueStyle={{ color: (income-expense) == 0 ? '#000000' : (income-expense) > 0 ? '#3f8600': '#cf1322' }}
            prefix={(income-expense)<0 ? "-$" : "$"}
          />
        </Card>
      </div>
    )
} 