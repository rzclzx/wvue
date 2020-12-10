import init from './axios'

const service = init(process.env.BASE_URL);

export default service;