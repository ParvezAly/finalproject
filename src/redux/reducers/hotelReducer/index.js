import { HOTEL_LIST_ACTIONS, BOOKING_ACTIONS } from '../../actions/utilities';

const INITIAL_STATE = {
    isLoading: false,
    success: false,
    error: null,
    hotelList: [],
    successBooked: false
}

const HotelReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BOOKING_ACTIONS.BOOKING_SUCCESS:
            return {
                ...state,
                successBooked: true
            }
        case BOOKING_ACTIONS.BOOKING_REQUEST:
            return {
                ...state,
                successBooked: false
            }
        case HOTEL_LIST_ACTIONS.HOTEL_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                error: null,
                successBooked: false
            }
        case HOTEL_LIST_ACTIONS.HOTEL_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                error: null,
                successBooked: false,
                hotelList: action.payload.hotels
            }
        case HOTEL_LIST_ACTIONS.HOTEL_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                success: false,
                successBooked: false,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default HotelReducer;