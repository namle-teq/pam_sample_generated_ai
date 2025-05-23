import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getAssets } from "@/lib/assets"
import DashboardView from "@/components/dashboard-view"

export default async function Home() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const assets = await getAssets(session.user.id)

  return (
    <main className="container mx-auto px-4 py-8">
      <DashboardView assets={assets} />
    </main>
  )
}
