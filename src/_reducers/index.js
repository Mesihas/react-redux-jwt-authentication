import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { lookupData } from './form.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  lookupData
});

export default rootReducer;