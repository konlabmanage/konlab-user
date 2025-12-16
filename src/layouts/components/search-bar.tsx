'use client';

import { Button, Input } from '@konlab/ui';
import { Plus, Search } from 'lucide-react';

export interface SearchBarProps {
  /**
   * Placeholder cho ô tìm kiếm
   * @default "Tìm kiếm..."
   */
  placeholder?: string;
  /**
   * Custom className cho container
   */
  className?: string;
}

/**
 * SearchBar component với search input và button Tạo bài viết
 */
export function SearchBar({ placeholder = 'Tìm kiếm...', className }: SearchBarProps) {
  return (
    <div className={className}>
      <div className="relative w-full max-w-lg">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder={placeholder}
          className="pr-3 pl-9"
          type="search"
          aria-label="Tìm kiếm"
        />
      </div>
      <Button className="whitespace-nowrap">
        <Plus className="mr-2 h-4 w-4" />
        Tạo bài viết
      </Button>
    </div>
  );
}
