// export type ChartData = {
//   label: number;
//   color: string | null;
//   value: string;
//   link: {
//     dataFilter: null,
//     type: string,
//     userFilter: null
// };
// };
// export type ChartType = {
//   name:string;
//   population:string | null;
//   color:string | null;
//   legendFontColor:string | null;
//   legendFontSize:string | null;
// };
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

export interface ActivityStatusDataPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs: string;
  end: string;
}
export interface ComplianceStatusDataPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs: string;
  end: string;
}
export interface ActivityStatusData{
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: ChartData[] | null
}
export interface ComplianceStatusData{
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: ChartData[] | null
}
export interface ChartData {
  label: string;
  color: string | null;
  value: number;
  link: {
    dataFilter: any; // You may want to replace 'any' with a more specific type
    type: string;
    userFilter: any; // You may want to replace 'any' with a more specific type
  };
}
export interface ChartType {
  name: string;
  population: number | null;
  color: string | null;
  legendFontColor: string | null;
  legendFontSize: number | null;
}

interface UserCredentials extends UserModel {
  token: string;
}
export interface UserCredentialsPayload {
  payload:  UserCredentials; // Define the type of the payload
}

interface BaseUrlSlice {
  data: string;
}
interface LoginDataSlice {
  data: UserCredentialsPayload;
}
export interface ReduxState {
  baseUrlSlice: BaseUrlSlice;
  loginDataSlice:{
    data: UserCredentials;
  }
}