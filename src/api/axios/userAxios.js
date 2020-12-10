import init from './axios'

const service = init(process.env.USER_URL);

export default service;