import axios from "axios";

const apiClient = axios.create(
    {
        baseURL:'http://localhost:2636/v1/questions/',
        timeout:2000
    }
)

apiClient.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token')
        if(token){
            config.headers.authorization=token
        }
        return config
    }
)

export const getQuestionsRequest = async(id)=>{
    try {
       return await apiClient.get(`get/${id}`) 
    } catch (e) {
        return{
            error:true,
            e
        }
    }
}