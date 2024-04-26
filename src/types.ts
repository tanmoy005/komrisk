import { PropsWithChildren, ReactNode } from "react";
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';



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
export interface PendingTask {
  mapId: number;
  complianceId: number;
  title: string | null;
  taskName: string | null;
  description: string | null;
  nameOfLaw: string | null;
  department: string | null;
  opUnit: string | null;
  owner: string | null;
  Assignee: string | null;
  currOwner: string | null;
  reviewer: string | null;
  dueDate: string | null;
  impact: string | null;
  status: number;
  taskId: number;
  complianceGenId: string | null;
  activities: ActivityInerface[];
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
export interface IncidentChartListDataItem {
  mapId: number;
  incidentId: number;
  incidentTitle: string | null;
  taskName: string | null;
  description: string | null;
  department: string | null;
  opUnit: string | null;
  owner: string | null;
  reviewer: string | null;
  completionDate: string | null;
  resposeDate: string | null;
  taskId: number;
}

export const defaultIncidentChartData: IncidentChartListDataItem = {

  mapId: 0,
  incidentId: 0,
  incidentTitle: null,
  taskName: null,
  description: null,
  department: null,
  opUnit: null,
  owner: null,
  reviewer: null,
  completionDate: null,
  resposeDate: null,
  taskId: 0,
}

export interface UserModel {
  username: string,
  password: string
}

export interface ActivityStatusDataPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs?: string;
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
  viewAs?: string;
  end: string;
  comparison: string;
}
export interface ComplianceStatusDataPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs?: string;
  end: string;
  filterLevel?: string;
  filterType?: string;
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
export interface PendingTaskDataList {
  sEcho: string | null;
  aaData: ChartListDataItem[] | null;
  iTotalRecords: number | null;
  iTotalDisplayRecords: number | null;
}
export interface PendingTaskItemDetailsResponse {
  title: string | null;
  complianceId: string | null;
  description: string | null;
  lawName: string | null;
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
  viewAs?: string;
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
  viewAs?: string;
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
  viewAs?: string;
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
  title: string | null;
  descriptions: string | null;
}>;

export interface AccordianCommonHeaderProps {
  title: string | null;
  descriptions: string | null;
  expanded: boolean;
  type?: string;
  taskId?:number;
  commentText?:string | " ";
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
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

export interface notificationCardListData {
  firstSection: {
    heading: string | null;
    description: string | null;
  },

  secondSection: {
    dateHeading: string | null;
    date: string | null;
    sectionRight?: {
      dateHeading: string | null;
      date: string | null;
    }
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

export interface IncidentItemDetailsPayLoad {
  username: string;
  password: string;
  incidentMapId: string;
  taskId: number;
}

export interface IncidentItemDetailsResponse {
  mapId: number | null;
  approverId: number | null;
  approverName: string | null;
  ownerId: number | null;
  ownerName: string | null;
  name: string | null;
  mapDesc: string | null;
  taskSource: string | null;
  taskComments: string | null;
  taskType: string | null;
  reassignmentRequested: boolean | null;
  response: string | null;
  startDate: string | null;
  completedOn: string | null;
  requiresProof: boolean | null;
  info: string | null;
  mapStarted: string | null;
  taskStatus: string | null;
  loggedUserTaskAuthority: string | null;
  taskName: string | null;

}
export const DefaultIncidentItemDetailsResponse: IncidentItemDetailsResponse = {

  mapId: null,
  approverId: null,
  approverName: null,
  ownerId: null,
  ownerName: null,
  name: null,
  mapDesc: null,
  taskSource: null,
  taskComments: null,
  taskType: null,
  reassignmentRequested: null,
  response: null,
  startDate: null,
  completedOn: null,
  requiresProof: null,
  info: null,
  mapStarted: null,
  taskStatus: null,
  loggedUserTaskAuthority: null,
  taskName: null,

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
  filterType: string;
  reportType: string;
  setCurrentChart: React.Dispatch<React.SetStateAction<string>>;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
  chartFilterPayload: ChartFilterDataPayLoad;
  setChartFilterPayload: React.Dispatch<React.SetStateAction<ChartFilterDataPayLoad>>;
  chartUserFilterPayload: ChartUserFilterDataPayLoad
  setChartUserFilterPayload: React.Dispatch<React.SetStateAction<ChartUserFilterDataPayLoad>>;
  chartDataFilterPayload: ChartDataFilterDataPayLoad
  setChartDataFilterPayload: React.Dispatch<React.SetStateAction<ChartDataFilterDataPayLoad>>;
}
export interface ChartFilterDataPayLoad {
  start: string;
  end: string;
  viewAs?: string;
  country?: string;
}
export interface ChartUserFilterDataPayLoad {
  filterLevel: string;
  filterType: string;
}
export interface ChartDataFilterDataPayLoad {
  filterType: string;
}

// export interface DropDownItem {
//   label: string | null | undefined;
//   value: string | number | null | undefined;
//   icon?: () => JSX.Element
// }
export interface DropDownItem {
  lable: string | null | undefined;
  value: string | null | undefined;

  image?: {
    uri: string;
  }
}
export class DropdownItemClass {
  constructor(public lable: string | undefined, public value: string | undefined, public uri: string) {
    this.lable = lable;
    this.value = value;
    this.uri = uri;
  }
  createDropdownObject(): DropDownItem {
    return {
      lable: this.lable,
      value: this.value,
      image: {
        uri: this.uri
      }
    }
  }
}


export class CreateDropdownItem {
  constructor() {

  }
}

export interface DropdownProps {
  dropdownItems: DropDownItem[];
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: any;
  minWidth?: number | string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  onpress?: () => void;
  leftIcon?: () => JSX.Element;
}

export const DefaultDropDownItem: DropDownItem = {
  lable: "",
  value: ""
}


export interface FilterProps {
  currentChart: string;
  setCurrentChart: React.Dispatch<React.SetStateAction<string>>;
  setChartFilterPayload: React.Dispatch<React.SetStateAction<ChartFilterDataPayLoad>>;
  chartFilterPayload: ChartFilterDataPayLoad;
  reportType: string
  selectedTab: string
}

export interface ChartProp {
  currentChart: string;
  chartFilterPayload: ChartFilterDataPayLoad;
  chartUserFilterPayload: ChartUserFilterDataPayLoad;
  chartDataFilterPayload: ChartDataFilterDataPayLoad;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface CustomeDatePickerProps {
  setDate: React.Dispatch<React.SetStateAction<Date>>
  date: Date | null
  label: string
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
  setUserFilterLevelModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  reportType: string
  selectedTab: string
}


// For Activity Status
export interface UserFilterDataPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs?: string;
  end: string;
}



export interface ComplianceUserFilterData {
  title: string | null;
  subTitle: string | null;
  chartData: UserFilterReportChartData[] | null
}

export interface IncidentUserFilterData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: UserFilterReportChartData[] | null
}



export interface ActivityStatusUserFilterLevelData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: UserFilterReportChartData[] | null
}


export interface ComplianceStatusUserFilterLevelData {
  title: string | null;

  xAxisName: string | null;
  yAxisName: string | null;
  chartData: UserFilterReportChartData[] | null
}



export interface ImpactAnalysisUserFilterLevelData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: UserFilterReportChartData[] | null
}


export interface IncidentActivityUserFilterLevelData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: UserFilterReportChartData[] | null
}

export interface IncidentComparisonUserFilterLevelData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: UserFilterReportChartData[] | null
}




export interface UserFilterReportChartData {
  displayValue?: string;
  filterLevel?: number;
  filterType?: string;
  label: string;
  value: number;
  userFilter?: any
}


export interface userchartFilterLevelProps {
  filterLevel?: number
  chartuserfilterPayload?: UserFilterDataPayLoad
  setChartFilterPayload?: React.Dispatch<React.SetStateAction<ChartFilterDataPayLoad>>
  setUserFilterModalVisible?: React.Dispatch<React.SetStateAction<boolean>>
  setUserFilterLevelModalVisible?: React.Dispatch<React.SetStateAction<boolean>>
  reportType?: string
  selectedTab: string

}


export interface UserFilterLevelDataPayLoad extends UserFilterDataPayLoad {
  filterLevel: string | null;
}

export interface DropDownListProps {
  value: string;
  label: string;
  // IconComponent?: JSX.Element | null | (() => JSX.Element) | React.ComponentType<any> | false | ReactNode;
  IconComponent?: any;
}

export interface FilterDropdownProps {
  filterType: string;
  setFilterType: React.Dispatch<React.SetStateAction<string>>
  filterTypes: DropDownItem[];
  filterTypemModalIsOpen: boolean;
  setFilterTypeModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  labelPosition?: string;
  handleOnpressFilterItem?: () => void;
}


interface BaseFilterModalProps {
  chartFilterPayload: ChartFilterDataPayLoad;
  reportType: string;
  selectedTab: string;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ChartUserFilterModalProps extends BaseFilterModalProps {

  chartUserFilterPayload: ChartUserFilterDataPayLoad;
  setUserFilterPayload: React.Dispatch<React.SetStateAction<ChartUserFilterDataPayLoad>>;
}
export interface ChartDataFilterModalProps extends BaseFilterModalProps {

  chartDataFilterPayload: ChartDataFilterDataPayLoad;
  setDataFilterPayload: React.Dispatch<React.SetStateAction<ChartDataFilterDataPayLoad>>;

}

export interface ChartFilterProps extends BaseFilterModalProps {
  setChartFilterPayload: React.Dispatch<React.SetStateAction<ChartFilterDataPayLoad>>
}

export interface FilterModalProps extends FilterDropdownProps {
  chartFilterPayload: ChartFilterDataPayLoad;
  setChartFilterPayload: React.Dispatch<React.SetStateAction<ChartFilterDataPayLoad>>;
  reportType: string;
  selectedTab: string;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setChartUserFilterPayload: React.Dispatch<React.SetStateAction<ChartUserFilterDataPayLoad>>;
  chartUserFilterPayload: ChartUserFilterDataPayLoad;
  setChartDataFilterPayload: React.Dispatch<React.SetStateAction<ChartDataFilterDataPayLoad>>;
  chartDataFilterPayload: ChartDataFilterDataPayLoad;
}



export interface DataFilterDataPayLoad {
  username: string;
  password: string;
  start: string;
  viewAs?: string;
  end: string;
}



export interface DataFilterLevelDataPayLoad extends DataFilterDataPayLoad {
  filterType: string | null;
}



export interface ActivityStatusDataFilterLevelData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: DataFilterReportChartData[] | null
}


export interface ComplianceStatusDataFilterLevelData {
  title: string | null;

  xAxisName: string | null;
  yAxisName: string | null;
  chartData: DataFilterReportChartData[] | null
}



export interface ImpactAnalysisDataFilterLevelData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: DataFilterReportChartData[] | null
}


export interface DataFilterReportChartData {
  label: string;
  value: number;
  dataFilter: any
}


export interface NotificationListDataItem {
  id: number;
  complianceId: string | null;
  complianceTitle: string | null;
  complianceNo: string | null;
  complianceNature: string | null;
  updatedField: string | null;
  oldValue: string | null;
  newValue: string | null;
  updatedOn: string | null;
  status: string | null;
  whatHasChanged: string | null;
  lawNames: string | null;

}
interface ActivityInerface {
  type: string | null;
  updateOn: string | null;
  updatedBy: string | null;
}
export interface TaskListDataItem {
  mapId: number;
  complianceId: number;
  title: string;
  taskName: string;
  description: string | null;
  nameOfLaw: string | null;
  department: string | null;
  opUnit: string | null;
  owner: string | null;
  currOwner: string | null;
  reviewer: string | null;
  Assignee: string | null;
  dueDate: string | null;
  impact: string | null;
  status: number;
  taskId: number;
  complianceGenId: string | null;
  activities: ActivityInerface[];

}

export interface BtnFilterHeaderProps {

  firstBtnName: string;
  fistBtnOnpress: () => void;
  secondBtnName: string;
  secondBtnOnpress: () => void;
}

export interface ProofListPayload {
  taskId: number;
  objectType: string
}


export interface ProofListData {
  docType: string;
  docTitle: string;
  docId: number;
  module: string;
  extension: string;
  docDesc: string;
}


export interface Comment {
  commentText: any |null |undefined;
  taskID: number |null |undefined;
}