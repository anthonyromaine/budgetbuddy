import { Link } from "react-router-dom";
import { LoginForm } from "@wasp/auth/forms/Login";

export default function LoginPage() {
  return (
    <main className="max-w-md mx-auto">
        <LoginForm />
        <br />
        <span>
            I don't have an account yet (<Link to="/signup">go to signup</Link>).
        </span>
    </main>
  )
}