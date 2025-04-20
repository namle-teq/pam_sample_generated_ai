"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { assetSchema } from "@/lib/validation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { z } from "zod"
import type { AssetType, CurrencyUnit } from "@/lib/types"

interface AddAssetFormProps {
  userId: string
}

type AssetFormValues = z.infer<typeof assetSchema>

const assetTypes: AssetType[] = ["Stock", "Crypto", "Cash", "Gold", "Other"]
const currencyUnits: CurrencyUnit[] = ["USD", "VND"]

export default function AddAssetForm({ userId }: AddAssetFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm<AssetFormValues>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      type: "Stock",
      unit: "USD",
    },
  })

  async function onSubmit(data: AssetFormValues) {
    setIsLoading(true)
    setApiError("")

    try {
      const res = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        reset()
        router.push("/assets")
        router.refresh()
      } else {
        const result = await res.json()
        setApiError(result.error || "Failed to add asset")
      }
    } catch (error) {
      setApiError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name">Asset Name</Label>
        <Input id="name" {...register("name")} required />
        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Asset Type</Label>
        <Select
          value={watch("type")}
          onValueChange={(value) => setValue("type", value as AssetType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select asset type" />
          </SelectTrigger>
          <SelectContent>
            {assetTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" type="number" step="0.01" min="0" {...register("amount")} required />
        {errors.amount && <p className="text-sm text-destructive">{errors.amount.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="avg_pricing">Average Purchase Price</Label>
        <Input id="avg_pricing" type="number" step="0.01" min="0" {...register("avg_pricing")} required />
        {errors.avg_pricing && <p className="text-sm text-destructive">{errors.avg_pricing.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="current_pricing">Current Price</Label>
        <Input id="current_pricing" type="number" step="0.01" min="0" {...register("current_pricing")} required />
        {errors.current_pricing && <p className="text-sm text-destructive">{errors.current_pricing.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="unit">Currency Unit</Label>
        <Select
          value={watch("unit")}
          onValueChange={(value) => setValue("unit", value as CurrencyUnit)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select currency unit" />
          </SelectTrigger>
          <SelectContent>
            {currencyUnits.map((u) => (
              <SelectItem key={u} value={u}>
                {u}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.unit && <p className="text-sm text-destructive">{errors.unit.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="purchaseDate">Purchase Date</Label>
        <Input id="purchaseDate" type="date" {...register("purchaseDate")} required />
        {errors.purchaseDate && <p className="text-sm text-destructive">{errors.purchaseDate.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea id="notes" {...register("notes")} />
        {errors.notes && <p className="text-sm text-destructive">{errors.notes.message}</p>}
      </div>

      {apiError && <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">{apiError}</div>}

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
