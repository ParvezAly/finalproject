import { request, success, failure, BOOKING_ACTIONS } from '../utilities';
import { bookHotel } from '../../api';
function getBooking(data) {
    return dispatch => {
        dispatch(request(BOOKING_ACTIONS.BOOKING_REQUEST));
        bookHotel(data).then(
            response => {
                if (response.success === false) {
                    dispatch(failure(BOOKING_ACTIONS.BOOKING_FAILURE, response.errors));

                } else {
                    dispatch(success(BOOKING_ACTIONS.BOOKING_SUCCESS, response));
                   
                }
            },
            error => {
                dispatch(failure(BOOKING_ACTIONS.BOOKING_FAILURE, error.message));

            }
        );
    };

}

export {
    getBooking
}