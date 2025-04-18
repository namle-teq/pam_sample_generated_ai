import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { getAssetById } from "@/lib/assets"
import EditAssetForm from "@/components/edit-asset-form"

export default async function EditAssetPage({ params }: { params: { id: string } }) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const asset = await getAssetById(params.id, session.user.id)

  if (!asset) {
    redirect("/assets")
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Edit Asset</h1>
      <EditAssetForm asset={asset} userId={session.user.id} />
    </main>
  )
}
