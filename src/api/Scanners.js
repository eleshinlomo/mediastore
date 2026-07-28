import { BASE_URL } from "./URLs"

export const scanDevices = async ()=>{
    try{
    const response = await fetch(`${BASE_URL}/scan`, {
       mode: 'cors',
       method: 'GET',
       headers: {'Content-Type': 'application/json'},
       

    })
    
    if(!response) return {ok: false, error: 'No response from the server'}
    const data = await response.json()
    return data
    }catch(err){
        console.log('Scan devices error"', err)
        return {ok: false, error: 'Unable to fetch devices'}
    }
}