import axios from "axios";


const axiosInstance = axios.create({
    baseURL:'https://localhost:7206/api/',
    withCredentials: true
});

axiosInstance.interceptors.request.use((config)=>{
    console.log("İstek gönderiliyor.");
    return config;
});

axiosInstance.interceptors.response.use((response)=>{
    console.log("Cevap alındı.");
    return response;
}, async (error) => {
    console.log(error);
    return Promise.reject(error);
});
