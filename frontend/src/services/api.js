import axios from "axios";

const api = axios.create({  
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3333' // Use the environment variable or fallback to localhost  ,
});


export default api;