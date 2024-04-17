import { PropsWithChildren } from "react";

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


export type LegendItem = {
  level?: string | null;
  color?: string | null;
  status: string | null;
};
export interface ChartListDataItem {
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
export const defaultChartData: ChartListDataItem = {

  mapId: 0,
  complianceId: 0,
  title: null,
  taskName: null,
  description: null,
  nameOfLaw: null,
  department: null,
  opUnit: null,
  owner: null,
  currOwner: null,
  reviewer: null,
  dueDate: null,
  impact: null,
  status: 0,
  taskId: 0,
  complianceGenId: null
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

export interface ActivityStatusDataListPayLoad extends ActivityStatusDataPayLoad {
  status: string;
}

export interface ActivityStatusData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: ReportChartData[] | null
}
export interface ActivityStatusDataList {
  sEcho: string | null;
  aaData: ChartListDataItem[] | null;
  iTotalRecords: number | null;
  iTotalDisplayRecords: number | null;
}


// export interface ComplianceStatusDataListPayLoad {
//   username: string;
//   password: string;
//   start: string;
//   viewAs: string;
//   end: string;
//   status: string;
// }

export interface ComplianceStatusDataListPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs: string;
  end: string;
  comparison: string;
}
export interface ComplianceStatusDataPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs: string;
  end: string;
}
export interface ComplianceStatusData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: ReportChartData[] | null
}
export interface ComplianceStatusDataList {
  sEcho: string | null;
  aaData: ChartListDataItem[] | null;
  iTotalRecords: number | null;
  iTotalDisplayRecords: number | null;
}
export interface ReportChartData {
  label: string;
  color: string | null;
  value: number;
  link: {
    dataFilter: any; // You may want to replace 'any' with a more specific type
    type: string;
    userFilter: any; // You may want to replace 'any' with a more specific type
  };
  comparison: string | null;
  status: string | null;
}
export interface PieChartType {
  name: string;
  population: number | null;
  color: string | null;
  legendFontColor: string | null;
  legendFontSize: number | null;
}
export interface BarChartData {
  labels: string[];
  datasets: {
    data: number[];
    colors?: string[];
  }[];
}

export interface BarChartConfig {
  backgroundGradientFrom: string;
  backgroundGradientTo: string;
  decimalPlaces: number;
  color: (opacity: number) => string;
  style: {
    borderRadius: number;
  };
}

// ================================ Updated on 08-04-2024 ======================================== //

// For Incident Activity
export interface IncidentActivityDataPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs: string;
  end: string;
}


export interface IncidentActivityDataListPayLoad extends IncidentActivityDataPayLoad {
  status: string;
}



export interface IncidentActivityData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: ReportChartData[] | null
}



export interface IncidentActivityDataList {
  sEcho: string | null;
  aaData: ChartListDataItem[] | null;
  iTotalRecords: number | null;
  iTotalDisplayRecords: number | null;
}




// For Impact Analysis
export interface ImpactAnalysisDataPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs: string;
  end: string;
}


export interface ImpactAnalysisDataListPayLoad extends ImpactAnalysisDataPayLoad {
  impact: string;
}



export interface ImpactAnalysisData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: ReportChartData[] | null
}



export interface ImpactAnalysisDataList {
  sEcho: string | null;
  aaData: ChartListDataItem[] | null;
  iTotalRecords: number | null;
  iTotalDisplayRecords: number | null;
}


// For Incident Comparison
export interface IncidentComparisonDataPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs: string;
  end: string;
}


export interface IncidentComparisonDataListPayLoad extends IncidentComparisonDataPayLoad {
  comparison: string;
}



export interface IncidentComparisonData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: ReportChartData[] | null
}



export interface IncidentComparisonDataList {
  sEcho: string | null;
  aaData: ChartListDataItem[] | null;
  iTotalRecords: number | null;
  iTotalDisplayRecords: number | null;
}

export type AccordionItemPros = PropsWithChildren<{
  title: string;
  descriptions: string;
}>;

export interface AccordianCommonHeaderProps {
  title: string;
  descriptions: string;
  expanded: boolean;
  type?: string;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  icons: {
    open: string;
    close: string;
  };
}
export interface InputFieldProps {
  value: string;
  setInput?: React.Dispatch<React.SetStateAction<any>>,
  placeholder: string;
  type: string;
  editable?: boolean;
}
export interface CustomComponentProp extends PropsWithChildren {
  styles?: { [key: string]: any }
}

export interface taskCardData {
  firstSection: {
    heading: string | null;
    description: string | null;
  },
  secondSection: {
    heading: string | null;
    description: string | null;
  },
  thirdSection: {
    dateHeading: string | null;
    date: string | null;
    sectionRight: {
      taskDesg: string | null;
      name: string | null;
      pic: string | null;
    }[]
  }
}


export interface CompliancesItemDetailsPayLoad {
  username: string;
  password: string;
  complianceId: string;
}

export interface CompliancesItemDetailsResponse {
  info: string | null;
  complianceId: string | null;
  title: string | null;
  section: string | null;
  lawType: string | null;
  regulator: string | null;
  description: string | null;
  penality: string | null;
  lawCategory: string | null;
  complianceNatureId: string | null;
  isCr: boolean | null;
  active: boolean | null;
  crId: number | null;
  lawName: string | null;

}
export const CompliancesItemDetails: CompliancesItemDetailsResponse = {

  info: null,
  complianceId: null,
  title: null,
  section: null,
  lawType: null,
  regulator: null,
  description: null,
  penality: null,
  lawCategory: null,
  complianceNatureId: null,
  isCr: null,
  active: null,
  crId: null,
  lawName: null,
}


export interface Country {
  countryEnabled: boolean | null;
  countryList: [number, string][] | null;
}

export interface ComplianceView {
  key: string;
  value: string;
}
// export const DefaultComplianceView: ComplianceView =
// {
//   key: null,
//   value: null,
// }


export interface EntityView {
  options: any[]; // You might want to replace `any[]` with a more specific type if you have information about the possible options.
  entityName: string;
  entityEnabled: boolean;
}

export interface AccessDetails extends Country {
  complianceViewAs: ComplianceView[] | null;
  entityView: EntityView | null;

}

export const DefaultAccessDetails: AccessDetails = {

  countryEnabled: null,
  countryList: null,
  complianceViewAs: null,
  entityView: null,
}

export interface userDetails {
  userId: number | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  phone: string | null;
  mobile: string | null;
  role: string | null;
  company: string | null;
  operatingUnit: string | null;
  department: string | null;
  wipEnabled: boolean | null;
  actualDateCompletionAllowed: boolean | null;
  requestReassignmentAllowed: boolean | null;
  uploadLink: boolean | null;
  dateTimePicker: boolean | null;
}
export const DefaultUserDetails: userDetails = {
  userId: null,
  username: null,
  firstName: null,
  lastName: null,
  displayName: null,
  phone: null,
  mobile: null,
  role: null,
  company: null,
  operatingUnit: null,
  department: null,
  wipEnabled: null,
  actualDateCompletionAllowed: null,
  requestReassignmentAllowed: null,
  uploadLink: null,
  dateTimePicker: null,
}
export interface userAuthDetails {
  userDetails: userDetails
  countryEnabled: boolean | null;
}
export const DefaultAuthUserDetails: userAuthDetails = {
  userDetails: DefaultUserDetails,
  countryEnabled: null,
}

export interface availableViews {
  key: string | null;
  value: string | null;
}

export const defaultAvailableViews: availableViews = {
  key: null,
  value: null,
}
export interface FilterProps {
  currentChart: string;
  reportType: string;
  chartFilterPayload: ChartFilterDataPayLoad;
  setCurrentChart: React.Dispatch<React.SetStateAction<string>>
  setChartFilterPayload: React.Dispatch<React.SetStateAction<ChartFilterDataPayLoad>>
}
export interface ChartFilterDataPayLoad {
  start: string;
  end: string;
  viewAs: string;
  // country: string;
}


export interface DropDownItem {
  label: string;
  value: string


}

export interface Dropdown {
  dropdownItems: DropDownItem[];
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: any;
  minWidth?: number;
}

export const DefaultDropDownItem: DropDownItem = {
  label: "",
  value: ""
}
export interface FilterProps {
  currentChart: string;
  setCurrentChart: React.Dispatch<React.SetStateAction<string>>;
  setChartFilterPayload: React.Dispatch<React.SetStateAction<ChartFilterDataPayLoad>>;
  chartFilterPayload: ChartFilterDataPayLoad;
  reportType: string
}

export interface ChartProp {
  currentChart: string;
  chartFilterPayload: ChartFilterDataPayLoad;
}
export interface CustomeDatePickerProps {
  setDate: React.Dispatch<React.SetStateAction<Date>>
  date: Date | null
}
export interface chartFilterProps {
  chartFilterPayload: ChartFilterDataPayLoad
  setChartFilterPayload: React.Dispatch<React.SetStateAction<ChartFilterDataPayLoad>>
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setFilterModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  reportType: string
}
export interface filterSelectProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setFilterModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setUserFilterModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  
}



// ========================= Updated on 16-04-2024 ================================== //



export interface userchartFilterProps {
  chartFilterPayload: ChartFilterDataPayLoad
  setChartFilterPayload: React.Dispatch<React.SetStateAction<ChartFilterDataPayLoad>>
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setUserFilterModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  reportType: string
}


// For Activity Status
export interface ActivityStatusUserFilterDataPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs: string;
  end: string;
}

export interface ActivityStatusUserFilterData {
  title: string | null;
  subTitle: string | null;
  chartData: UserFilterReportChartData[] | null
}




export interface UserFilterReportChartData {
  displayValue: string;
  filterLevel: number;
  filterType: string;
  label: string;
  value: number;
  userFilter: any
}


export interface userchartFilterLevelProps {
  filterLevel?: number
  chartuserfilterPayload?: ActivityStatusUserFilterDataPayLoad 
  setChartFilterPayload?: React.Dispatch<React.SetStateAction<ChartFilterDataPayLoad>>
  setUserFilterModalVisible?: React.Dispatch<React.SetStateAction<boolean>>
  setUserFilterLevelModalVisible?: React.Dispatch<React.SetStateAction<boolean>>
  reportType?: string
  
}


export interface ActivityStatusUserFilterLevelDataPayLoad extends ActivityStatusUserFilterDataPayLoad {
  filterLevel: number | null;
}


export interface ActivityStatusUserFilterLevelData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: UserFilterReportChartData[] | null
}




