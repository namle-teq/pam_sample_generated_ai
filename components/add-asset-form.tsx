"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { addAsset } from "@/lib/assets"
import type { AssetType, CurrencyUnit } from "@/lib/types"

interface AddAssetFormProps {
  userId: string
}

export default function AddAssetForm({ userId }: AddAssetFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [type, setType] = useState<AssetType>("Stock")
  const [unit, setUnit] = useState<CurrencyUnit>("USD")

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError("")

    try {
      // Add the type and unit from state to the form data
      formData.append("type", type)
      formData.append("unit", unit)
      formData.append("userId", userId)

      const result = await addAsset(formData)

      if (result.success) {
        router.push("/assets")
        router.refresh()
      } else {
        setError(result.error || "Failed to add asset")
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Asset Name</Label>
        <Input id="name" name="name" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Asset Type</Label>
        <Select value={type} onValueChange={(value) => setType(value as AssetType)} name="type">
          <SelectTrigger>
            <SelectValue placeholder="Select asset type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Stock">Stock</SelectItem>
            <SelectItem value="Crypto">Crypto</SelectItem>
            <SelectItem value="Cash">Cash</SelectItem>
            <SelectItem value="Gold">Gold</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" name="amount" type="number" step="0.01" min="0" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="avg_pricing">Average Purchase Price</Label>
        <Input id="avg_pricing" name="avg_pricing" type="number" step="0.01" min="0" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="current_pricing">Current Price</Label>
        <Input id="current_pricing" name="current_pricing" type="number" step="0.01" min="0" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="unit">Currency Unit</Label>
        <Select value={unit} onValueChange={(value) => setUnit(value as CurrencyUnit)} name="unit">
          <SelectTrigger>
            <SelectValue placeholder="Select currency unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="VND">VND</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="purchaseDate">Purchase Date</Label>
        <Input id="purchaseDate" name="purchaseDate" type="date" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea id="notes" name="notes" />
      </div>

      {error && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{error}</div>}

      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Asset"}
        </Button>
      </div>
    </form>
  )
}
