import { APP_SETTINGS } from '../../../config';
import { get } from "../request";

export function getAllLocations() {
    return get(`${APP_SETTINGS.API.URL}/home`)
}


export const getAreaSitesByCountry = (country_id) => {
    return get(`${APP_SETTINGS.API.URL}/site-areas-by-country-id?country_id=${country_id}`)
}

export const searchAttractionsByCountryAndArea = (country_id, site_area) => {
    return get(`${APP_SETTINGS.API.URL}/search-attractions?country_id=${country_id}&area_site=${site_area}`)
}