import client from "../axios/AxiosClient";

const rest = '/bancos'

const getBancos = (page,rowsPerPage) =>{
    let url=rest+'/page/'+page+'/records/'+rowsPerPage;
    return client.get(url);
}

const addBanco = (data) =>{
    return client.post(rest+'/',data);
}


const deleteBanco = (id) =>{
    return client.delete(rest+'/'+id);
}

const BancosService = {
    getBancos,addBanco,deleteBanco
}

export default BancosService;