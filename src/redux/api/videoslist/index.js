import { get } from "../request";

export function getAllVideos(query) {
    return get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyCKIQhwegxnZVyi4Zlz0hpyJxVa_jBbHMU`)
}
