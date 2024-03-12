export type ChartData = {
  label: number;
  color: string | null;
  value: string;
  link: {
    dataFilter: null,
    type: string,
    userFilter: null
};
};
export type ChartType = {
  name:string;
  population:string | null;
  color:string | null;
  legendFontColor:string | null;
  legendFontSize:string | null;
};
export type ChartDisplayData = {
  label: number;
  color: string | null;
  value: string;
  data: {
    dataFilter: null,
    type: string,
    userFilter: null
};
};



export type Product = {
  id: number;
  image: string | null;
  name: string;
  price: number;
};
export type PizzaSize = 'Reguler' | 'Medium' | 'Large' ;

export type CartItem = {
  id: string;
  product: Product;
  product_id: number;
  size: PizzaSize;
  quantity: number;
};

export const OrderStatusList: OrderStatus[] = [
  'New',
  'Cooking',
  'Delivering',
  'Delivered',
];

export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

export type Order = {
  id: number;
  created_at: string;
  total: number;
  user_id: string;
  status: OrderStatus;

  order_items?: OrderItem[];
};

export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  size: PizzaSize;
  quantity: number;
};

export type Profile = {
  id: string;
  group: string;
};

export interface BaseUrl {
  baseURl: String
}

export type ChartListDataItem = {
  mapId: number;
  complianceId: number;
  title: string| null;
  taskName: string| null;
  description: string | null;
  nameOfLaw: string| null;
  department:string| null;
  opUnit: string| null;
  owner: string| null;
  currOwner: string| null;
  reviewer: string| null;
  dueDate: string| null;
  impact: string| null;
  status: number;
  taskId: number;
  complianceGenId: string| null;
}
export interface UserModel {
  username: string,
  password: string
}