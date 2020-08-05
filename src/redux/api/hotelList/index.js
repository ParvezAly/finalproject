import { APP_SETTINGS } from '../../../config';
import { get } from "../request";

export function allHotelList() {
    return get(`${APP_SETTINGS.API.URL}/hotel`)
}


export function allAreaHotelList(areaId) {
    return get(`${APP_SETTINGS.API.URL}/hotel-list?attraction_area_id=${areaId}`)
}