import { VIDEOS_LIST_ACTIONS } from '../../actions/utilities';

const INITIAL_STATE = {
    isLoading: false,
    success: false,
    error: null,
    videoList: []
}

const VideoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case VIDEOS_LIST_ACTIONS.VIDEOS_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                error: null
            }
        case VIDEOS_LIST_ACTIONS.VIDEOS_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                error: null,
                videoList: action.payload
            }
        case VIDEOS_LIST_ACTIONS.VIDEOS_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                success: false,
                error: action.payload.error
            }
        default:
            return state
    }
}

export default VideoReducer;