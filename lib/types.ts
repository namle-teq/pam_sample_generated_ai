export type AssetType = "Stock" | "Crypto" | "Cash" | "Gold" | "Other"
export type CurrencyUnit = "USD" | "VND"

export interface Asset {
  id: string
  userId: string
  name: string
  type: AssetType
  amount: number
  avg_pricing: number
  current_pricing: number
  unit: CurrencyUnit
  purchaseDate: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
}

export interface Session {
  user: User
}
