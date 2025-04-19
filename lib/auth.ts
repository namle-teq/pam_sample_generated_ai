"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import type { User, Session } from "./types"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { db } from "./db"
import { users as usersTable } from "./schema"
import { eq } from "drizzle-orm"

const JWT_SECRET = process.env.JWT_SECRET!
const JWT_EXPIRES_IN = "7d"

function generateToken(user: User) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )
}

async function validateToken(token: string): Promise<User | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as User
    // Check if user exists in DB
    const dbUsers = await db.select().from(usersTable).where(eq(usersTable.id, Number(decoded.id))).limit(1)
    if (!dbUsers[0]) {
      return null
    }
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



export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    // Validate JWT token
    const user: User | null = await validateToken(sessionCookie.value)
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

  // Query user from database
  const dbUsers = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1)
  const dbUser = dbUsers[0]

  if (!dbUser) {
    return { success: false, error: "Invalid email or password" }
  }

  const valid = await comparePassword(password, dbUser.passwordHash)
  if (!valid) {
    return { success: false, error: "Invalid email or password" }
  }

  // Generate JWT token
  const token = generateToken({
    id: dbUser.id.toString(),
    name: dbUser.name ?? "",
    email: dbUser.email,
  })

  // Set JWT cookie
  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  redirect("/")
}

export async function register(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  const existingUsers = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1)
  if (existingUsers.length > 0) {
    return { success: false, error: "Email already in use" }
  }

  // Hash the password
  const hashed = await hashPassword(password)

  // Insert new user
  const inserted = await db
    .insert(usersTable)
    .values({
      email,
      name,
      passwordHash: hashed,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning()

  const newUser = inserted[0]

  // Generate JWT token
  const token = generateToken({
    id: newUser.id.toString(),
    name: newUser.name ?? "",
    email: newUser.email,
  })

  // Set JWT cookie
  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  redirect("/")
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
  redirect("/login")
}
