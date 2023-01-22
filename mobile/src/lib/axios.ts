import axios from "axios";

const api = axios.create({
    baseURL: "http://10.0.10.250:3333"
})

export default api