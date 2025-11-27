export type TransactionResponse = {
  status: string;
  message: string;
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    items_per_page: number;
  };
  data: Transaction[];
};

export type Transaction = {
  id: string;
  amount_in_cents: number;
  currency: string;
  type: 'TRANSFER' | 'TOPUP';
  status: string;
  created_at: string;
  destination_id: string;
};

//we could try Orval type here for stricter type checking
