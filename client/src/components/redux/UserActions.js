import axios from 'axios';
export const setUser=(data)=>async(dispatch)=>{
    try{
        
        
        dispatch({type:"ADD_USER_SUCCESS",payload:data});


    }catch(error){
        dispatch({type:"ADD_USER_FAIL",payload:error.response});
    }
};