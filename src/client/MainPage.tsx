import { User } from "@wasp/entities";
import { DatePicker, Card, Statistic } from "antd";
import './Main.css'


const { RangePicker } = DatePicker;

const MainPage = ({ user }: { user: User }) => {
  return (
    <main className="w-full max-w-3xl mx-auto p-4">
      
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="mb-4 sm:mb-0">
          <span className="text-2xl font-bold">Hello, {user.username}</span>
        </div>
        <div><RangePicker /></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
        <Card bordered={false}>
          <Statistic
            title="Income"
            value={5192.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix="$"
          />
        </Card>
        <Card bordered={false}>
          <Statistic
            title="Expenses"
            value={3610.3}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix="$"
          />
        </Card>
        <Card bordered={false}>
          <Statistic
            title="Balance"
            value={9.3}
            precision={2}
            valueStyle={{ color: '#000000' }}
            prefix="$"
          />
        </Card>
      </div>
    </main>
  )
}
export default MainPage
