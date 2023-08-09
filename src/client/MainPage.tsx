import { User } from "@wasp/entities";
import './Main.css'

const MainPage = ({ user }: { user: User }) => {
  return (
    <div>
      Hello {user.username}
    </div>
  )
}
export default MainPage
