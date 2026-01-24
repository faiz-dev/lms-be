export interface SortOption {
  field: string;
  direction: 'ASC' | 'DESC';
}

export interface FilterOption {
  field: string;
  value: string;
  operator?: 'like' | 'eq'; // Opsional: bisa dikembangkan nanti
}

// Ini object murni yang akan diterima oleh Repository manapun
export interface FindManyOptions {
  pagination?: {
    limit: number;
    offset: number;
  };
  sorting?: SortOption[];
  filters?: FilterOption[];
  globalSearch?: string;
}
