import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7206/api/',
    withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
    console.log("İstek gönderiliyor.");
    config.headers.Authorization = "Bearer " + localStorage.getItem("token")
    return config;
});

axiosInstance.interceptors.response.use((response) => {
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
            window.dispatchEvent(new CustomEvent("toastr", { detail: { severity: 'error', summary: 'HATA', detail: error.response.data.detail } }));
            break;
        case "https://example.com/probs/validation":
            // Tüm errorları foreach ile gezip ekrana yazdırmak.
            // Gelen veriyi iyi analiz edip ön tarafta UX açısından en verimli nasıl kullanabiliriz.
            let message = "";
            error.response.data.Errors.forEach(totalError => {
                totalError.Errors.forEach(err => {
                    message += err + "\n"
                })
            })
            window.dispatchEvent(new CustomEvent("toastr", { detail: { severity: 'error', summary: 'HATA', detail: message } }));
            break;
        case "https://example.com/probs/authorization":
            // Kullanıcının tokeni var ama süresi geçmiş.
            // Refresh-Token 
            // localStorage.token varsa Refresh
            // yetkiniz yok
            // windowEvent => react'e erişim yok ama ihtiyaç var
            window.dispatchEvent(new CustomEvent("toastr", { detail: { severity: 'error', summary: 'HATA', detail: "Yetkiniz bulunmamaktadır." } }));
            window.dispatchEvent(new Event("redirectToLogin"))
            break;
        default:
            alert("Bilinmedik Hata")
            break;
    }

    console.log(error);
    return Promise.reject(error);
});


export default axiosInstance;


// tki-react.vercel.app/location