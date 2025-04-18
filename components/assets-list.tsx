"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Asset } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/utils"
import { deleteAsset } from "@/lib/assets"
import { useRouter } from "next/navigation"
import { Edit, MoreHorizontal, PlusCircle, Trash2 } from "lucide-react"

interface AssetsListProps {
  assets: Asset[]
}

export default function AssetsList({ assets }: AssetsListProps) {
  const router = useRouter()

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this asset?")) {
      await deleteAsset(id)
      router.refresh()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Link href="/assets/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Asset
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Avg Price</TableHead>
              <TableHead>Current Price</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No assets found. Add your first asset to get started.
                </TableCell>
              </TableRow>
            ) : (
              assets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{asset.name}</TableCell>
                  <TableCell>{asset.type}</TableCell>
                  <TableCell>{asset.amount}</TableCell>
                  <TableCell>{formatCurrency(asset.avg_pricing, asset.unit)}</TableCell>
                  <TableCell>{formatCurrency(asset.current_pricing, asset.unit)}</TableCell>
                  <TableCell>{formatCurrency(asset.amount * asset.current_pricing, asset.unit)}</TableCell>
                  <TableCell>{asset.unit}</TableCell>
                  <TableCell>{formatDate(asset.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/assets/edit/${asset.id}`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(asset.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
