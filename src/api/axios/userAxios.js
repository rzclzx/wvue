import init from './axios'

const http = init(process.env.USER_URL);

export const refresh = http.refresh;

export default http.send;