"use client"

import { Trash2, CheckSquare, Square } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BulkActionBarProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onClearSelection: () => void
  onDeleteSelected: () => void
  onCompleteSelected: () => void
  onIncompleteSelected: () => void
  onCancel: () => void
}

export function BulkActionBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onDeleteSelected,
  onCompleteSelected,
  onIncompleteSelected,
  onCancel,
}: BulkActionBarProps) {
  const allSelected = selectedCount === totalCount && totalCount > 0
  const hasSelection = selectedCount > 0

  return (
    <div className="flex items-center justify-between gap-2 p-3 bg-muted rounded-lg mb-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={allSelected ? onClearSelection : onSelectAll}
        >
          {allSelected ? (
            <>
              <Square className="h-4 w-4 mr-2" />
              Deselect All
            </>
          ) : (
            <>
              <CheckSquare className="h-4 w-4 mr-2" />
              Select All
            </>
          )}
        </Button>
        <span className="text-sm text-muted-foreground">
          {selectedCount} selected
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onCompleteSelected}
          disabled={!hasSelection}
        >
          Mark Complete
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onIncompleteSelected}
          disabled={!hasSelection}
        >
          Mark Incomplete
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDeleteSelected}
          disabled={!hasSelection}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
