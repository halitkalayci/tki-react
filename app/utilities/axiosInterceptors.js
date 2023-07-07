import axios from "axios";


const axiosInstance = axios.create({
    baseURL:'https://localhost:7206/api/',
    withCredentials: true
});

axiosInstance.interceptors.request.use((config)=>{
    console.log("İstek gönderiliyor.");
    config.headers.Authorization = "Bearer " + localStorage.getItem("token")
    return config;
});

axiosInstance.interceptors.response.use((response)=>{
    console.log("Cevap alındı.");
    return response;
}, async (error) => {
    // Hata bir business error mu? => toastr error.detail
    // Backenddeki hata kalıplarını karşılayacak kodlar

    let type = error.response.data.type;

    // React Componenti değil
    // React Componentlerinde kullanılabilen işlevler ve saf javascript 

    // Toastr'i global hale getirmek. 
    // Context 
    // Context => React Hook
    // Saf javascript => Context
    switch (type) {
        case "https://example.com/probs/business":
            alert(error.response.data.detail);
            break;
        case "https://example.com/probs/validation":
            alert("Validasyon hatası");
            break;
        default:
            alert("Bilinmedik Hata")
            break;
    }

    console.log(error);
    return Promise.reject(error);
});


export default axiosInstance;