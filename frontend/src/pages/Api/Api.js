import axios from "axios";
const api = "https://hackanintern.herokuapp.com"
const api2 = "http://localhost:5000"

const Api = axios.create({
 baseURL: api2,
});
Api.defaults.headers.post['Content-Type'] = 'application/json';

export default Api;