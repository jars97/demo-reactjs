import db from '../googlefirebase/FirebaseDb'
import {collection,getDocs,query, orderBy, startAfter, limit,addDoc,deleteDoc,doc,endBefore,limitToLast } from "@firebase/firestore";

const rest='bancos';

const getBancos = async (rowsPerPage) =>{
    const resp = await getDocs(collection(db,rest));
    const totalItems = resp.size;


    const q= query(collection(db, rest),limit(rowsPerPage));

    const result= await getDocs(q);
    let arr = []
    result.forEach((doc)=>{ 
        arr.push({...doc.data(),id:doc.id});
    });

    let data ={
        totalItems:totalItems,
        data:arr
    }
    console.log(data)
    return data;
}

const getFirst = (rowsPerPage) => {
    const q= query(collection(db, rest),orderBy("codigo","desc"),limit(rowsPerPage));
    return getDocs(q);
}

const getNextPage = (rowsPerPage,item) => {
    const q= query(collection(db, 'bancos'),orderBy("codigo","desc"),startAfter(item.codigo),limit(rowsPerPage));
    return getDocs(q);
}

const getPreviusPage = (rowsPerPage,item) => {
    const q= query(collection(db, 'bancos'),orderBy("codigo","desc"),endBefore(item.codigo),limitToLast(rowsPerPage));
    return getDocs(q);
}

const getAll = () => {
    return getDocs(collection(db,rest));
}

const addBanco = async (data) =>{
    return await addDoc(collection(db, rest), {
        codigo: parseInt(data.codigo,10),
        name: data.name
    });
}

const deleteBanco = async (data) =>{
    await deleteDoc(doc(db, rest,data.id));
}

const FirebaseService ={
    getBancos,addBanco,deleteBanco,getFirst,getAll,getNextPage,getPreviusPage
}

export default FirebaseService;