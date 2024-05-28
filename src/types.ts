
import { PropsWithChildren, ReactNode } from "react";
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';


// For profilePage.tsx 

export type Profile = {
  id: string;
  group: string;
};


// Base URL
export interface BaseUrl {
  baseUrl: string | null;
}

export interface BaseUrlWorkspace extends BaseUrl {
  workSpaceName: string | null,
}



export const DefaultBaseUrlWorkspace: BaseUrlWorkspace = {
  workSpaceName: null,
  baseUrl: null
}


// UseModel for Username and Password
export interface UserModel {
  username: string | null,
  password: string | null
}


export const DefaultUserModel: UserModel = {

  username: null,
  password: null
}


// ReportChartData for chart
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


// ChartListDataItem for DataList of all compliances
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

// IncidentChartListDataItem for DataList of all incidents

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



// ================================ For Impact Analysis ================================= //


// Chart

export interface ImpactAnalysisDataPayLoad extends UserModel {
  start: string;
  viewAs?: string;
  end: string;
}


export interface ImpactAnalysisData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: ReportChartData[] | null
}


// DataList


export interface ImpactAnalysisDataListPayLoad extends ImpactAnalysisDataPayLoad {
  impact: string;
}


export interface ImpactAnalysisDataList {
  sEcho: string | null;
  aaData: ChartListDataItem[] | null;
  iTotalRecords: number | null;
  iTotalDisplayRecords: number | null;
}




// ================================ For Activity Status ================================= //


// Chart

export interface ActivityStatusDataPayLoad extends UserModel {
  start: string;
  viewAs?: string;
  end: string;
}


export interface ActivityStatusData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: ReportChartData[] | null
}


// DataList


export interface ActivityStatusDataListPayLoad extends ActivityStatusDataPayLoad {
  status: string;
  filterLevel?:string;
}


export interface ActivityStatusDataList {
  sEcho: string | null;
  aaData: ChartListDataItem[] | null;
  iTotalRecords: number | null;
  iTotalDisplayRecords: number | null;
}


// ================================ For Compliance Status ================================= //

// Chart

export interface ComplianceStatusDataPayLoad extends UserModel {
  start: string;
  viewAs?: string;
  end: string;

}
export interface ComplianceStatusData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: ReportChartData[] | null
}


// DataList


export interface ComplianceStatusDataListPayLoad extends ComplianceStatusDataPayLoad {
  comparison: string;

}


export interface ComplianceStatusDataList {
  sEcho: string | null;
  aaData: ChartListDataItem[] | null;
  iTotalRecords: number | null;
  iTotalDisplayRecords: number | null;
}


// ================================ For Incident Activity ================================= //

// Chart 

export interface IncidentActivityDataPayLoad extends UserModel {
  start: string;
  viewAs?: string;
  end: string;
}


export interface IncidentActivityData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: ReportChartData[] | null
}


// DataList


export interface IncidentActivityDataListPayLoad extends IncidentActivityDataPayLoad {
  status: string;
}

export interface IncidentActivityDataList {
  sEcho: string | null;
  aaData: ChartListDataItem[] | null;
  iTotalRecords: number | null;
  iTotalDisplayRecords: number | null;
}



// ================================ For Incident Comparison ================================= //



// Chart 

export interface IncidentComparisonDataPayLoad extends UserModel {
  start: string;
  viewAs?: string;
  end: string;
}


export interface IncidentComparisonData {
  title: string | null;
  subTitle: string | null;
  xAxisName: string | null;
  yAxisName: string | null;
  chartData: ReportChartData[] | null
}


// DataList


export interface IncidentComparisonDataListPayLoad extends IncidentComparisonDataPayLoad {
  comparison: string;
}


export interface IncidentComparisonDataList {
  sEcho: string | null;
  aaData: ChartListDataItem[] | null;
  iTotalRecords: number | null;
  iTotalDisplayRecords: number | null;
}







// Detail Part ??

export interface CompliancesItemDetailsPayLoad extends UserModel {
  complianceId: string | null;
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



export interface IncidentItemDetailsPayLoad extends UserModel {
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


// =========== Get Country and View As list ================== //
export interface Country {
  countryEnabled: boolean | null;
  countryList: [number, string][] | null;
}

export interface ComplianceView {
  key: string;
  value: string;
}

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


// ============================ For Different Filter Condition =============================== //

// Chart Data 
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
  selectedTab: string
}
export interface ChartFilterDataPayLoad {
  start: string;
  end: string;
  viewAs?: string;
  country?: string;
}



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
  label: string | null | undefined
  _handleConfirm?: (date: Date) => void
}

export interface filterSelectProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setFilterModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setUserFilterModalVisible: React.Dispatch<React.SetStateAction<boolean>>

}


// Chart User Filter

// export interface ChartUserFilterDataPayLoad {
//   filterLevel: string;
//   filterType: string;
// }

export interface ChartUserFilterDataPayLoad {
  userFilter?: string;
}
export interface userchartFilterProps {
  chartFilterPayload: ChartFilterDataPayLoad
  setChartFilterPayload: React.Dispatch<React.SetStateAction<ChartFilterDataPayLoad>>
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setUserFilterModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setUserFilterLevelModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  reportType: string
  selectedTab: string
}



export interface UserFilterDataPayLoad extends UserModel {
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


// Chart Data Filter


// export interface ChartDataFilterDataPayLoad {
//   filterType: string;
// }

export interface ChartDataFilterDataPayLoad {
  dataFilter?: string;
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


export interface DataFilterDataPayLoad extends UserModel {
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


// For Notification






export interface AccordionItemPros {
  children?: ReactNode,
  title: string | null;
  descriptions: string | null;
  // setExpanded?: (expanded: boolean) => void; // or Dispatch<SetStateAction<boolean>>;
  // expanded?: boolean;

}


export interface AccordianCommonHeaderProps {
  title: string | null;
  descriptions: string | null;
  shortDescription?: string | null;
  setCommentText?: React.Dispatch<React.SetStateAction<string | null>>;
  type?: string;
  taskId?: number;
  commentText?: string | " " | null;
  setShortDescription?: React.Dispatch<React.SetStateAction<string>>;
  icons?: {
    open: string;
    close: string;
  };
  setExpanded?: React.Dispatch<React.SetStateAction<boolean>>;// or Dispatch<SetStateAction<boolean>>;
  expanded?: boolean;
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
  secondBtnName?: string;
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
  commentText: any | null | undefined;
  taskID: number | null | undefined;
}



export interface DownloadProofPayload {
  docId: string;
}



// For Pending Task

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


export interface PendingTaskDataList {
  sEcho: string | null;
  aaData: ChartListDataItem[] | null;
  iTotalRecords: number | null;
  iTotalDisplayRecords: number | null;
}
export interface PendingTaskItemDetailsResponse {
  taskType: string | null,
  task_name: string | null;
  compliance_id: string | null;
  task_desc: string | null;
  name_of_law: string | null;
  map_id: string | null;
  task_id: string | null;
  lastActivity?: ActivityInerface;
}
export interface LastActivityComment {
  comment: string | null;
  updatedOn: string | null;
}

export interface PendingTaskOverViewProps {
  pendingTaskDetails: PendingTaskItemDetailsResponse;
  lastActivitycomments?: LastActivityComment[];
  commentText: string | null;
  setCommentText: React.Dispatch<React.SetStateAction<string | null>>;
  shortDescription: string;
  setShortDescription: React.Dispatch<React.SetStateAction<string>>;
}


export interface Item {
  docTitle: string;
  extension: string;
  docId: number;
  // Add other properties as needed
}


export interface Item {
  docTitle: string;
  extension: string;
  // Add other properties as needed
}





// Unused

export interface ComplianceTaskMapDetailsPayLoad {
  complianceMapId: number | null,
  userDetails: userDetails
}

export interface ComplianceTaskMapDetailsResponse {
  mapId: number | null,
  complianceGenId: string | null,
  mapName: string | null,
  operatingUnit: string | null,
  department: string | null,
  ownerName: string | null,
  approverName: string | null,
  ownerId: number | null,
  approverId: number | null,
  routeId: number | null,
  taskStatus: string | null,
  wipReminderFrequency: string | null,
  recipients: string | null,
  operatingUnitId: number | null,
  reassignmentRequested: boolean | null,
  dueDate: string | null,
  startDate: string | null,
  completedOn: string | null,
  frequency: string | null,
  requiresProof: boolean | null,
  alertBeforeDue: number | null,
  failureImpact: string | null,
  recurringYear: string | null,
  reminderFrequency: number | null,
  taskId: number | null,
  status: string | null,
  taskSource: string | null,
  taskType: string | null,
  ownerComments: string | null,
  taskComments: string | null,
  reviewerComments: string | null,
  loggedUserTaskAuthority: string | null,
  taskName: string | null,
  info: string | null
}

export const DefaultComplianceTaskMapDetailsResponse: ComplianceTaskMapDetailsResponse = {

  mapId: null,
  complianceGenId: null,
  mapName: null,
  operatingUnit: null,
  department: null,
  ownerName: null,
  approverName: null,
  ownerId: null,
  approverId: null,
  routeId: null,
  taskStatus: null,
  wipReminderFrequency: null,
  recipients: null,
  operatingUnitId: null,
  reassignmentRequested: null,
  dueDate: null,
  startDate: null,
  completedOn: null,
  frequency: null,
  requiresProof: null,
  alertBeforeDue: null,
  failureImpact: null,
  recurringYear: null,
  reminderFrequency: null,
  taskId: null,
  status: null,
  taskSource: null,
  taskType: null,
  ownerComments: null,
  taskComments: null,
  reviewerComments: null,
  loggedUserTaskAuthority: null,
  taskName: null,
  info: null
}

export interface UserListPayload {
  complianceMapId: string | null;
}


export interface UserListData {
  userId: number,
  username: string,
  fullName: string
}

export interface DeleteProofPayload {
  docId: string | null;
  objectType: string | null
}


export interface CompleteTaskPayload {
  taskId: string | null;
  taskAction: string | null,
  taskType: string | null,
  taskComments: string | null,
}


export interface RequestAssignPayload {
  taskId: string | null;
  mapId: string | null,
  reason: string | null,
}


export interface ComplianceAlertsUpdateDetailsPayload extends UserModel {
  alertsId: number;
}

export interface ComplianceAlertsHideDetailsPayload extends UserModel {
  alertsId: number;
}










export interface ProofsListDetailsProps {
  taskId: number,
  type: string,
}




export interface InitialsProps {
  size: number;
  fontSize: number
}



export enum ownerReviewerType{
  Owner= "5",
  Reviewer= "4",
}

export interface NotificationDataPayLoad extends UserModel {
  user: UserId
}
export interface notificationSeen {
  userId: string|null,
  notificationIdList: string[]
}


export interface NotificationItemDetailsResponse {
  compliance_title: string | null,
  compliance_id: string | null,
  description: string | null,
  name_of_law: string | null,
  paramId: string | null,
  notification_date: string | null
}


export interface NotificationOverViewProps {
  notificationDetails: NotificationItemDetailsResponse;

}


interface UserId {
  id: string | null;
}