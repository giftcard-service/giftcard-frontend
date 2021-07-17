/** 백엔드 API 주소 */
const API_URL = process.env.API_URL || "http://localhost:8000";

/** 백엔드 API v1 주소 */
const API_V1_URL = API_URL + "/v1";

export { API_URL, API_V1_URL };