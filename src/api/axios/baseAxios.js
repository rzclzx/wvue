import init from './axios'

const http = init(process.env.BASE_URL);

export const refresh = http.refresh;

export default http.send;