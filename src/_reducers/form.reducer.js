import { formConstants } from '../_constants';

export function lookupData(state = {}, action) {
  switch (action.type) {
    case formConstants.GETLOOKUPDATA_SUCCESS:
      return {
        lookupData: action.respData
      };
    case formConstants.GETLOOKUPDATA_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}