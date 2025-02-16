export interface Cigar {
  id: string;
  name: string;
  origin: string;
  flavor: string;
  format: string;
  description: string;
  image: string;
  averagePrice?: number;
  priceCount?: number;
}

export interface CigarPrice {
  id: string;
  cigar_id: string;
  user_id: string;
  price: number;
  currency: string;
  store_name?: string;
  purchase_date: string;
}