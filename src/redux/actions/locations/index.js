import { request, success, failure, LOCATION_DATA_ACTIONS } from '../utilities';
import { getAllLocations, getAreaSitesByCountry, searchAttractionsByCountryAndArea } from '../../api';


function getLocationsList() {
    return dispatch => {
        dispatch(request(LOCATION_DATA_ACTIONS.LOCATION_DATA_REQUEST));
        getAllLocations().then(
            response => {
                if (response.success === false) {
                    dispatch(failure(LOCATION_DATA_ACTIONS.LOCATION_DATA_FAILURE, response.errors));

                } else {
                    dispatch(success(LOCATION_DATA_ACTIONS.LOCATION_DATA_SUCCESS, response));
                }
            },
            error => {
                dispatch(failure(LOCATION_DATA_ACTIONS.LOCATION_DATA_FAILURE, error.message));

            }
        );
    };

}

function getSiteAreasByCountry(country_id) {
    return dispatch => {
        dispatch(request(LOCATION_DATA_ACTIONS.GET_SITE_AREAS_BY_COUNTRY_REQUEST));
        getAreaSitesByCountry(country_id).then(
            response => {
                if (response.success === false) {
                    dispatch(failure(LOCATION_DATA_ACTIONS.GET_SITE_AREAS_BY_COUNTRY_FAILURE, response.errors));

                } else {
                    dispatch(success(LOCATION_DATA_ACTIONS.GET_SITE_AREAS_BY_COUNTRY_SUCCESS, response));
                }
            },
            error => {
                dispatch(failure(LOCATION_DATA_ACTIONS.GET_SITE_AREAS_BY_COUNTRY_FAILURE, error.message));

            }
        );
    };
}

function getAttractionsByCountryAndArea(country_id, site_area) {
    return dispatch => {
        dispatch(request(LOCATION_DATA_ACTIONS.SEARCH_AREA_ATTRACTION_REQUEST));
        searchAttractionsByCountryAndArea(country_id, site_area).then(
            response => {
                if (response.success === false) {
                    dispatch(failure(LOCATION_DATA_ACTIONS.SEARCH_AREA_ATTRACTION_FAILURE, response.errors));

                } else {
                    dispatch(success(LOCATION_DATA_ACTIONS.SEARCH_AREA_ATTRACTION_SUCCESS, response));
                }
            },
            error => {
                dispatch(failure(LOCATION_DATA_ACTIONS.SEARCH_AREA_ATTRACTION_FAILURE, error.message));

            }
        );
    };
}

function setAreaId(areaId) {
    return dispatch => {
        dispatch(success(LOCATION_DATA_ACTIONS.SET_LOCATION_ID_SUCCESS, areaId));
    }
}
export {
    getLocationsList,
    getSiteAreasByCountry,
    getAttractionsByCountryAndArea,
    setAreaId
}