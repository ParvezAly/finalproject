import { LOCATION_DATA_ACTIONS } from '../../actions/utilities';

const INITIAL_STATE = {
    isLoading: false,
    success: false,
    error: null,
    countries: [],
    country: {},
    attraction_areas: [],
    areaSite: '',
    areaID: null,
    countryLoading: false
}

const LocationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOCATION_DATA_ACTIONS.SET_LOCATION_ID_SUCCESS:
            return {
                ...state,
                areaID: action.payload
            }
        case LOCATION_DATA_ACTIONS.SEARCH_AREA_ATTRACTION_REQUEST:
        case LOCATION_DATA_ACTIONS.LOCATION_DATA_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                error: null
            }
        case LOCATION_DATA_ACTIONS.LOCATION_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                error: null,
                countries: action.payload.countries,
                country: action.payload.country,
                attraction_areas: action.payload.attraction_areas,
                areaSite: action.payload.area_site,
                areaSites: action.payload.area_sites
            }
        case LOCATION_DATA_ACTIONS.SEARCH_AREA_ATTRACTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                error: null,
                attraction_areas: action.payload.attraction_areas,
                areaSite: action.payload.name,
                country: action.payload.country,
            }
        case LOCATION_DATA_ACTIONS.LOCATION_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                success: false,
                error: action.payload.error
            }
        case LOCATION_DATA_ACTIONS.GET_SITE_AREAS_BY_COUNTRY_REQUEST:
            return {
                ...state,
                countryLoading: true,
                error: null
            }
        case LOCATION_DATA_ACTIONS.GET_SITE_AREAS_BY_COUNTRY_SUCCESS:
            return {
                ...state,
                countryLoading: false,
                error: null,
                areaSites: action.payload.area_sites
            }
        default:
            return state
    }
}

export default LocationReducer;