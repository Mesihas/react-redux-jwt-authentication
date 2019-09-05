import { formConstants } from '../_constants';
import { formService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const formActions = {
    getLookupData
};


function getLookupData() {
    return dispatch => {
      //  dispatch(request());

        formService.getLookupData()
            .then(          
                respData => {
              //    console.log("respdata: " + respData);
                  dispatch(success(respData))},
                error => dispatch(failure(error))
            );
    };

   // function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(respData) { return { type: formConstants.GETLOOKUPDATA_SUCCESS, respData } }
    function failure(error) { return { type: formConstants.GETLOOKUPDATA_FAILURE, error } }
}

