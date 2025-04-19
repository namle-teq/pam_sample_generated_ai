"use server"

import { eq } from "drizzle-orm"
import type { Asset, AssetType } from "./types"
import { db } from "./db"
import { assets } from "./schema"

type CurrencyUnit = "USD" | "VND"

import { and } from "drizzle-orm"

export async function getAssets(userId: string): Promise<Asset[]> {
  const result = await db
    .select()
    .from(assets)
    .where(eq(assets.userId, parseInt(userId)))

  return result.map(asset => ({
    id: asset.id.toString(),
    userId: asset.userId ? asset.userId.toString() : "",
    name: asset.name,
    type: asset.type as AssetType,
    amount: Number(asset.amount),
    avg_pricing: Number(asset.avg_pricing),
    current_pricing: Number(asset.current_pricing),
    unit: asset.unit as CurrencyUnit,
    purchaseDate: asset.purchaseDate instanceof Date ? asset.purchaseDate.toISOString().slice(0, 10) : "",
    notes: asset.notes ?? undefined,
    createdAt: asset.createdAt instanceof Date ? asset.createdAt.toISOString() : "",
    updatedAt: asset.updatedAt instanceof Date ? asset.updatedAt.toISOString() : ""
  }))
}

export async function getAssetById(id: string, userId: string): Promise<Asset | null> {
  const result = await db
    .select()
    .from(assets)
    .where(
      and(
        eq(assets.id, parseInt(id)),
        eq(assets.userId, parseInt(userId))
      )
    )

  if (result.length === 0) return null

  const asset = result[0]
  return {
    id: asset.id.toString(),
    userId: asset.userId ? asset.userId.toString() : "",
    name: asset.name,
    type: asset.type as AssetType,
    amount: Number(asset.amount),
    avg_pricing: Number(asset.avg_pricing),
    current_pricing: Number(asset.current_pricing),
    unit: asset.unit as CurrencyUnit,
    purchaseDate: asset.purchaseDate instanceof Date ? asset.purchaseDate.toISOString().slice(0, 10) : "",
    notes: asset.notes ?? undefined,
    createdAt: asset.createdAt instanceof Date ? asset.createdAt.toISOString() : "",
    updatedAt: asset.updatedAt instanceof Date ? asset.updatedAt.toISOString() : ""
  }
}

export async function addAsset(formData: FormData) {
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

    const [newAsset] = await db.insert(assets).values({
      name,
      type,
      amount: amount.toString(),
      avg_pricing: avg_pricing.toString(),
      current_pricing: current_pricing.toString(),
      unit,
      userId: parseInt(userId),
      purchaseDate: new Date(purchaseDate),
      notes: notes || undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning()

    return { success: true, asset: newAsset }
  } catch (error) {
    return { success: false, error: "Failed to add asset" }
  }
}

export async function updateAsset(formData: FormData) {
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

    const [updatedAsset] = await db
      .update(assets)
      .set({
        name,
        type,
        amount: amount.toString(),
        avg_pricing: avg_pricing.toString(),
        current_pricing: current_pricing.toString(),
        unit,
        purchaseDate: new Date(purchaseDate),
        notes: notes || undefined,
        updatedAt: new Date()
      })
      .where(
        and(
          eq(assets.id, parseInt(id)),
          eq(assets.userId, parseInt(userId))
        )
      )
      .returning()

    if (!updatedAsset) {
      return { success: false, error: "Asset not found" }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to update asset" }
  }
}

export async function deleteAsset(id: string) {
  try {
    await db
      .delete(assets)
      .where(eq(assets.id, parseInt(id)))

    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to delete asset" }
  }
}
