import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import LoginForm from "@/components/login-form"

export default async function LoginPage() {
  const session = await getSession()

  if (session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="mt-2 text-gray-600">Sign in to manage your assets</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
