
import { APP_SETTINGS } from '../../../config';
import { post } from "../request";

export function bookHotel(data) {
    return post(`${APP_SETTINGS.API.URL}/booking`,data)
}


