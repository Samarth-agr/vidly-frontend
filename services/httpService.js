import axios from 'axios'
import { toast } from 'react-toastify';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.response.use(null , error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500
  
    if(!expectedError){
      console.log("Logging The Error",error);
      toast.error("Something went wrong !! ")
      return Promise.reject(error)
    }
  
    return Promise.reject(error)
  })

  function setJwt(jwt){
    axios.defaults.headers.common['x-auth-token'] = jwt;
  }
  
  export default {
    get : axios.get,
    post : axios.post,
    delete : axios.delete,
    put : axios.put,
    setJwt
  }