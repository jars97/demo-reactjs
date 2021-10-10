import client from "../axios/AxiosClient";

const rest = '/bancos'

const getBancos = (page,rowsPerPage) =>{
    let url=rest+'/page/'+page+'/records/'+rowsPerPage;
    return client.get(url);
}

const addBanco = (data) =>{
    return client.post(rest+'/',data);
}

const BancosService = {
    getBancos,addBanco
}

export default BancosService;