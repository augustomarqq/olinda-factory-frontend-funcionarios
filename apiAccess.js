const api_url = "http://127.0.0.1:8080/"
const headers = {
    'Content-Type': 'application/json',
};

export async function buscarSetores() {

    const response = await fetch(api_url + 'setores', {
        method: 'GET',
        headers: headers
    });

    const data = await response.json();

    return data;
    
}

export async function buscarSetorX(setor_id) {

    const response = await fetch(`${api_url}setores/${setor_id}`, {
        method: 'GET',
        headers: headers
    });

    const data = await response.json();

    return data;
    
}

export async function buscarProblemas(){

    const response = await fetch(api_url + 'problemas', {
      method: 'GET',
      headers: headers
    });
    
    const data = await response.json();
   
   return data;
  
  }

  export async function buscarProblemaX(problema_id){

    const response = await fetch(api_url + 'problemas/{problema_id}', {
      method: 'GET',
      headers: headers
    });
    
    const data = await response.json();
   
   return data;
  
  }

  export async function criarRelato(setorId, problemaId){

    let data = {
      setorId: setorId,
      problemaId: problemaId
    }
  
    fetch(api_url+'relatos', {
      method: 'POST',
      headers: headers,
      body:JSON.stringify(data)
    })
  
  }