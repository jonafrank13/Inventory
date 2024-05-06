export type ItemBase = {
  id: number;
  units: number;
};

export type Item = ItemBase & {
  name: string;
  retail_cost: string;
  wholesale_cost: string;
  units: number;
};

interface Building {
  id: number;
  name: string;
  profit: string;
  items: ItemBase[];
}

export interface Store extends Building {
  retail_revenue: string;
}

export interface Warehouse extends Building {
  wholesale_revenue: string;
}

type UserType = "Admin" | "Employee" | "Standard";

export type User = {
  id: number;
  full_name: string;
  email: string;
  is_active: boolean;
  user_type: UserType;
};

/* 
Rational:
Sale always happens between
Factory -> Warehouse (or)
Warehouse -> Store (or)
Store -> User
This is always the flow and there is no backflow
hence we can safely assume that the from always belongs to one of Factory, Warehouse or Store
and the corresponding to can also be derived from it 
*/
type SaleType = "Factory" | "Warehouse" | "Store";

export type PurchaseRecord = {
  id: string;
  sale_type: SaleType;
  from_id: number;
  to_id: number;
  units: number;
};
