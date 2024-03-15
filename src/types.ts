
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
  title: string | null;
  taskName: string | null;
  description: string | null;
  nameOfLaw: string | null;
  department: string | null;
  opUnit: string | null;
  owner: string | null;
  currOwner: string | null;
  reviewer: string | null;
  dueDate: string | null;
  impact: string | null;
  status: number;
  taskId: number;
  complianceGenId: string | null;
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
export interface ActivityStatusDataListPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs: string;
  end: string;
  status: string;
}
export interface ComplianceStatusDataPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs: string;
  end: string;
}
export interface ActivityStatusData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: ChartData[] | null
}
export interface ComplianceStatusData {
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

export interface ActivityStatusDataListPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs: string;
  end: string;
  status: string;
}
export interface ActivityStatusDataList {
  sEcho: string | null;
  aaData: ChartListDataItem[] | null;
  iTotalRecords: number | null;
  iTotalDisplayRecords: number | null;
}