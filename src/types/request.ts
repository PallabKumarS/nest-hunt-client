export type TRequest = {
  tenantId: string;
  listingId: string;
  landlordId: string;
  requestId: string;
  status: "pending" | "approved" | "rejected" | "paid" | "cancelled";
  message?: string;
  transaction?: {
    paymentId?: string;
    transactionStatus?: string;
    paymentUrl?: string;
    bankStatus?: string;
    spCode?: string;
    spMessage?: string;
    method?: string;
    dateTime?: string;
  };
};
