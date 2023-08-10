import { Link } from "react-router-dom";
import { SignupForm } from "@wasp/auth/forms/Signup";

export default function SignupPage() {
  return (
    <main className="max-w-md mx-auto">
        <SignupForm />
        <br />
        <span>
            I already have an account (<Link to="/login">go to login</Link>).
        </span>
    </main>
  )
}