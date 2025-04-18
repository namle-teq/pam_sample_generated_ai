"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import type { Asset, AssetType } from "@/lib/types"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface AssetsPieChartProps {
  assets: (Asset & { totalValue: number })[]
}

// Colors for different asset types
const COLORS: Record<AssetType, string> = {
  Stock: "hsl(var(--chart-1))",
  Crypto: "hsl(var(--chart-2))",
  Cash: "hsl(var(--chart-3))",
  Gold: "hsl(var(--chart-4))",
  Other: "hsl(var(--chart-5))",
}

export default function AssetsPieChart({ assets }: AssetsPieChartProps) {
  // Group assets by type
  const assetsByType = assets.reduce(
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

  // Convert to array for chart
  const data = Object.entries(assetsByType).map(([name, value]) => ({
    name,
    value,
  }))

  // Create chart config for shadcn/ui ChartContainer
  const chartConfig = Object.fromEntries(
    Object.entries(COLORS).map(([key, color]) => [
      key.toLowerCase(),
      {
        label: key,
        color,
      },
    ]),
  )

  return (
    <ChartContainer config={chartConfig} className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={120} fill="#8884d8" dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name as AssetType]} name={entry.name} />
            ))}
          </Pie>
          <Legend />
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
