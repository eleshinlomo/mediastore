import { BASE_URL } from "./URLs"


  export const fetchDevices = async (payload) => {
    try {
      const res = await fetch(`${BASE_URL}/devices`,
        {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      }
      );
      const data = await res.json();
      return data
    } catch (err) {
      console.error("Failed fetching shared database parameters:", err);
    } finally {
      
    }
  };


    export const addDevice = async (payload) => {
    try {
      const res = await fetch(`${BASE_URL}/add-device`,{
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      }
      );
      const data = await res.json();
      return data
    } catch (err) {
      console.error("Failed fetching shared database parameters:", err);
    } finally {
      
    }
  };

  
  
      export const sendButtonCommand = async (payload) => {
    try {
      const res = await fetch(`${BASE_URL}/control`,{
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      }
      );
      const data = await res.json();
      return data
    } catch (err) {
      console.error("Failed fetching shared database parameters:", err);
    } finally {
      
    }
  };



export const registerDevice = async ()=>{
    try{
    const response = await fetch(`${BASE_URL}/r`, {
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