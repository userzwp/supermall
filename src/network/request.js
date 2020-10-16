import axios from "axios"

export function request(config){
	const instance = axios.create({
		baseURL:"http://123.207.32.32:8000",
		timeout:500000
		
	})
	
	instance.interceptors.response.use(res=>{
		return res.data
	})

	return instance(config)
}

