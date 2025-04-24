"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null

  const renderPageNumbers = () => {
    const pages = []

    // Always show first page
    pages.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        size="icon"
        className={currentPage === 1 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900"}
        onClick={() => onPageChange(1)}
      >
        1
      </Button>,
    )

    // Show ellipsis if needed
    if (currentPage > 3) {
      pages.push(
        <Button key="ellipsis1" variant="outline" size="icon" className="bg-gray-900" disabled>
          <MoreHorizontal className="h-4 w-4" />
        </Button>,
      )
    }

    // Show current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue // Skip first and last page as they're always shown

      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="icon"
          className={currentPage === i ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900"}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>,
      )
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push(
        <Button key="ellipsis2" variant="outline" size="icon" className="bg-gray-900" disabled>
          <MoreHorizontal className="h-4 w-4" />
        </Button>,
      )
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="icon"
          className={currentPage === totalPages ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900"}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>,
      )
    }

    return pages
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        className="bg-gray-900"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {renderPageNumbers()}

      <Button
        variant="outline"
        size="icon"
        className="bg-gray-900"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
