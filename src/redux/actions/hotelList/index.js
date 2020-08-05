import { request, success, failure, HOTEL_LIST_ACTIONS } from '../utilities';
import { allHotelList, allAreaHotelList } from '../../api';
function getAllHotelList() {
    return dispatch => {
        dispatch(request(HOTEL_LIST_ACTIONS.HOTEL_LIST_REQUEST));
        allHotelList().then(
            response => {
                if (response.success === false) {
                    dispatch(failure(HOTEL_LIST_ACTIONS.HOTEL_LIST_FAILURE, response.errors));

                } else {
                    dispatch(success(HOTEL_LIST_ACTIONS.HOTEL_LIST_SUCCESS, response));
                }
            },
            error => {
                dispatch(failure(HOTEL_LIST_ACTIONS.HOTEL_LIST_FAILURE, error.message));

            }
        );
    };

}

function getAllAreaHotelList(areaID) {
    return dispatch => {
        dispatch(request(HOTEL_LIST_ACTIONS.HOTEL_LIST_REQUEST));
        allAreaHotelList(areaID).then(
            response => {
                if (response.success === false) {
                    dispatch(failure(HOTEL_LIST_ACTIONS.HOTEL_LIST_FAILURE, response.errors));

                } else {
                    dispatch(success(HOTEL_LIST_ACTIONS.HOTEL_LIST_SUCCESS, response));
                }
            },
            error => {
                dispatch(failure(HOTEL_LIST_ACTIONS.HOTEL_LIST_FAILURE, error.message));

            }
        );
    };

}
export {
    getAllHotelList,
    getAllAreaHotelList
}