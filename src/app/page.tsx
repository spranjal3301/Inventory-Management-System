import { InventoryTable } from "@/components/inventory-table"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Inventory Management</h1>
        <InventoryTable />
      </div>
    </main>
  )
}

