import { request, failure, success, VIDEOS_LIST_ACTIONS } from '../utilities';
import { getAllVideos } from '../../api';

function getVideosList(query) {
    return dispatch => {
        dispatch(request(VIDEOS_LIST_ACTIONS.VIDEOS_LIST_REQUEST));

        getAllVideos(query).then(
            response => {
                if (response.success === false) {
                    dispatch(failure(VIDEOS_LIST_ACTIONS.VIDEOS_LIST_FAILURE, response.errors));

                } else {
                    dispatch(success(VIDEOS_LIST_ACTIONS.VIDEOS_LIST_SUCCESS, response));
                }
            },
            error => {
                dispatch(failure(VIDEOS_LIST_ACTIONS.VIDEOS_LIST_FAILURE, error.message));

            }
        );
    };

}

export {
    getVideosList
}