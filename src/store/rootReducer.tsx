import authUserAccessDetailsSlice from '@/src/store/slices/auth-user-access-details-slice';
import authUserCredSlice from '@/src/store/slices/auth-user-cred-slice';
import authUserDetailsSlice from '@/src/store/slices/auth-user-details-slice';
import baseUrlSlice from '@/src/store/slices/base-url-slice';
import incidentAvailableViewsSlice from '@/src/store/slices/incident-available-views-slice';
import notificationSeenSlice from '@/src/store/slices/notification-seen-slice';
import commentsSlice from '@/src/store/slices/task-comments-slice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  baseUrl: baseUrlSlice,
  authUserCred: authUserCredSlice,
  authUserDetails: authUserDetailsSlice,
  authUserAccess: authUserAccessDetailsSlice,
  incidentAvailableViews: incidentAvailableViewsSlice,
  comments: commentsSlice,
  notificationSeen: notificationSeenSlice
  // Add other reducers as needed
});


export default rootReducer;
