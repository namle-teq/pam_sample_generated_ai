import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import AddAssetForm from "@/components/add-asset-form"

export default async function AddAssetPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Add New Asset</h1>
      <AddAssetForm userId={session.user.id} />
    </main>
  )
}
