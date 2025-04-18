"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const pathname = usePathname()

  // Don't show navbar on login/register pages
  if (pathname === "/login" || pathname === "/register") {
    return null
  }

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="text-xl font-bold">
          AssetTracker
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Dashboard
          </Link>
          <Link
            href="/assets"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/assets" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Assets
          </Link>
          <form action={signOut}>
            <Button variant="outline" size="sm" type="submit">
              Sign Out
            </Button>
          </form>
        </div>
      </div>
    </nav>
  )
}
