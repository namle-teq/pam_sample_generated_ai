"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Asset, AssetType } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import AssetsPieChart from "@/components/assets-pie-chart"
import { PlusCircle } from "lucide-react"

interface DashboardViewProps {
  assets: Asset[]
}

export default function DashboardView({ assets }: DashboardViewProps) {
  // Calculate total value for each asset (amount * current_pricing)
  const assetsWithTotalValue = assets.map((asset) => ({
    ...asset,
    totalValue: asset.amount * asset.current_pricing,
  }))

  // Calculate total portfolio value in USD (for simplicity, we'll convert VND to USD at a fixed rate)
  const totalValue = assetsWithTotalValue.reduce((sum, asset) => {
    const valueInUSD = asset.unit === "USD" ? asset.totalValue : asset.totalValue / 23000 // Simple conversion rate for demo purposes
    return sum + valueInUSD
  }, 0)

  // Group assets by type
  const assetsByType = assetsWithTotalValue.reduce(
    (acc, asset) => {
      const type = asset.type
      if (!acc[type]) {
        acc[type] = 0
      }
      // Convert to USD for consistency
      const valueInUSD = asset.unit === "USD" ? asset.totalValue : asset.totalValue / 23000
      acc[type] += valueInUSD
      return acc
    },
    {} as Record<AssetType, number>,
  )

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link href="/assets/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Portfolio Value</CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(totalValue)}</CardTitle>
          </CardHeader>
        </Card>

        {Object.entries(assetsByType).map(([type, value]) => (
          <Card key={type}>
            <CardHeader className="pb-2">
              <CardDescription>{type} Assets</CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(value)}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{((value / totalValue) * 100).toFixed(1)}% of portfolio</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
          <CardDescription>Distribution of your assets by type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <AssetsPieChart assets={assetsWithTotalValue} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Link href="/assets">
          <Button variant="outline">View All Assets</Button>
        </Link>
      </div>
    </div>
  )
}
