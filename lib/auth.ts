"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { User, Session } from "./types"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret" // Replace with env var in production
const JWT_EXPIRES_IN = "7d"

function generateToken(user: User) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

function validateToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User
    return decoded
  } catch {
    return null
  }
}

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Mock database for users
const users: User[] = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
  },
]

/**
 * Mock password storage (now stores hashed passwords)
 * In a real app, use a database.
 */
const passwords: Record<string, string> = {
  "demo@example.com": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZGHFQW1Yy1Q8v2p5rWQxQ5Q5Q5Q5K"
}


export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    // Validate JWT token
    const user: User | null = validateToken(sessionCookie.value)
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
  const hash = passwords[email]

  if (!user || !hash) {
    return { success: false, error: "Invalid email or password" }
  }

  const valid = await comparePassword(password, hash)
  if (!valid) {
    return { success: false, error: "Invalid email or password" }
  }

  // Generate JWT token
  const token = generateToken(user)

  // Set JWT cookie
  const cookieStore = await cookies()
  cookieStore.set("session", token, {
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

  // Hash the password
  const hashed = await hashPassword(password)

  // Create new user
  const newUser: User = {
    id: `${users.length + 1}`,
    name,
    email,
  }

  users.push(newUser)
  passwords[email] = hashed

  // Generate JWT token
  const token = generateToken(newUser)

  // Set JWT cookie
  const cookieStore = await cookies()
  cookieStore.set("session", token, {
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
