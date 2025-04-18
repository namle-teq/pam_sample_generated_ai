"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { User, Session } from "./types"

// Mock database for users
const users: User[] = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
  },
]

// Mock password storage (in a real app, you'd use hashed passwords)
const passwords: Record<string, string> = {
  "demo@example.com": "password123",
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    // In a real app, you'd verify the session token
    const userId = sessionCookie.value
    const user = users.find((u) => u.id === userId)

    if (!user) {
      return null
    }

    return { user }
  } catch (error) {
    return null
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = users.find((u) => u.email === email)

  if (!user || passwords[email] !== password) {
    return { success: false, error: "Invalid email or password" }
  }

  // Set a cookie to simulate a session
  const cookieStore = await cookies()
  cookieStore.set("session", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return { success: true }
}

export async function register(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  if (users.some((u) => u.email === email)) {
    return { success: false, error: "Email already in use" }
  }

  // Create new user
  const newUser: User = {
    id: `${users.length + 1}`,
    name,
    email,
  }

  users.push(newUser)
  passwords[email] = password

  // Set a cookie to simulate a session
  const cookieStore = await cookies()
  cookieStore.set("session", newUser.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return { success: true }
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/login")
}
