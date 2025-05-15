import axios from "axios";

const baseURLLocal = import.meta.env.PUBLIC_API_URL_PRODUCTION

const api = axios.create({
    baseURL: baseURLLocal
})

export { api, baseURLLocal }
