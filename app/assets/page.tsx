import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getAssets } from "@/lib/assets"
import AssetsList from "@/components/assets-list"

export default async function AssetsPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const assets = await getAssets(session.user.id)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Your Assets</h1>
      <AssetsList assets={assets} />
    </main>
  )
}
