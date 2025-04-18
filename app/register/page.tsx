import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import RegisterForm from "@/components/register-form"

export default async function RegisterPage() {
  const session = await getSession()

  if (session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-gray-600">Sign up to start managing your assets</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
