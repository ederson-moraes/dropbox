import axios from "axios";

const api = axios.create({  
    baseURL: "https://dropbox-owgt.onrender.com",
});


export default api;