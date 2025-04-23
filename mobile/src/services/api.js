import axios from "axios"

const api = axios.create({
  baseURL: "https://dropbox-owgt.onrender.com/" //using localhost for android emulator
})

export default api