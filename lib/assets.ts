"use server"

import { v4 as uuidv4 } from "uuid"
import type { Asset, AssetType } from "./types"

// Define CurrencyUnit type
type CurrencyUnit = "USD" | "VND"

// Mock database for assets
let assets: Asset[] = [
  {
    id: "1",
    userId: "1",
    name: "Apple Inc.",
    type: "Stock",
    amount: 50,
    avg_pricing: 200,
    current_pricing: 210,
    unit: "USD",
    purchaseDate: "2023-01-15",
    notes: "Purchased 50 shares at $200",
    createdAt: "2023-01-15T12:00:00Z",
    updatedAt: "2023-01-15T12:00:00Z",
  },
  {
    id: "2",
    userId: "1",
    name: "Bitcoin",
    type: "Crypto",
    amount: 0.1,
    avg_pricing: 50000,
    current_pricing: 52000,
    unit: "USD",
    purchaseDate: "2023-02-20",
    notes: "Purchased 0.1 BTC",
    createdAt: "2023-02-20T12:00:00Z",
    updatedAt: "2023-02-20T12:00:00Z",
  },
  {
    id: "3",
    userId: "1",
    name: "Savings Account",
    type: "Cash",
    amount: 1,
    avg_pricing: 15000,
    current_pricing: 15000,
    unit: "USD",
    purchaseDate: "2023-03-10",
    createdAt: "2023-03-10T12:00:00Z",
    updatedAt: "2023-03-10T12:00:00Z",
  },
  {
    id: "4",
    userId: "1",
    name: "Gold Coins",
    type: "Gold",
    amount: 5,
    avg_pricing: 1600,
    current_pricing: 1650,
    unit: "USD",
    purchaseDate: "2023-04-05",
    notes: "5 oz of gold coins",
    createdAt: "2023-04-05T12:00:00Z",
    updatedAt: "2023-04-05T12:00:00Z",
  },
  {
    id: "5",
    userId: "1",
    name: "VinGroup",
    type: "Stock",
    amount: 100,
    avg_pricing: 50000,
    current_pricing: 52000,
    unit: "VND",
    purchaseDate: "2023-05-10",
    notes: "Vietnamese stock",
    createdAt: "2023-05-10T12:00:00Z",
    updatedAt: "2023-05-10T12:00:00Z",
  },
]

export async function getAssets(userId: string): Promise<Asset[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return assets.filter((asset) => asset.userId === userId)
}

export async function getAssetById(id: string, userId: string): Promise<Asset | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const asset = assets.find((a) => a.id === id && a.userId === userId)
  return asset || null
}

export async function addAsset(formData: FormData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const userId = formData.get("userId") as string
    const name = formData.get("name") as string
    const type = formData.get("type") as AssetType
    const amount = Number.parseFloat(formData.get("amount") as string)
    const avg_pricing = Number.parseFloat(formData.get("avg_pricing") as string)
    const current_pricing = Number.parseFloat(formData.get("current_pricing") as string)
    const unit = formData.get("unit") as CurrencyUnit
    const purchaseDate = formData.get("purchaseDate") as string
    const notes = formData.get("notes") as string

    const now = new Date().toISOString()

    const newAsset: Asset = {
      id: uuidv4(),
      userId,
      name,
      type,
      amount,
      avg_pricing,
      current_pricing,
      unit,
      purchaseDate,
      notes: notes || undefined,
      createdAt: now,
      updatedAt: now,
    }

    assets.push(newAsset)

    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to add asset" }
  }
}

export async function updateAsset(formData: FormData) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const id = formData.get("id") as string
    const userId = formData.get("userId") as string
    const name = formData.get("name") as string
    const type = formData.get("type") as AssetType
    const amount = Number.parseFloat(formData.get("amount") as string)
    const avg_pricing = Number.parseFloat(formData.get("avg_pricing") as string)
    const current_pricing = Number.parseFloat(formData.get("current_pricing") as string)
    const unit = formData.get("unit") as CurrencyUnit
    const purchaseDate = formData.get("purchaseDate") as string
    const notes = formData.get("notes") as string

    const assetIndex = assets.findIndex((a) => a.id === id && a.userId === userId)

    if (assetIndex === -1) {
      return { success: false, error: "Asset not found" }
    }

    const updatedAsset: Asset = {
      ...assets[assetIndex],
      name,
      type,
      amount,
      avg_pricing,
      current_pricing,
      unit,
      purchaseDate,
      notes: notes || undefined,
      updatedAt: new Date().toISOString(),
    }

    assets[assetIndex] = updatedAsset

    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to update asset" }
  }
}

export async function deleteAsset(id: string) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  assets = assets.filter((asset) => asset.id !== id)

  return { success: true }
}
