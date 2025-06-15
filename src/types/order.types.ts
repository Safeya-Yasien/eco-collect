export interface IOrder {
  id: string;
  transaction_id: string;
  arrival_time: string;
  customer_name: string;
  collector_name: string;
  waste_amount: number;
  price: number;
  payment_method: string;
  status: string;
}
export interface IRawOrder {
  order_id: string;
  arrival_time: string;
  user_name: string;
  collector_name: string;
  quantity: number;
  price_for_kg: number;
  payment_method: string;
  status: string;
}
