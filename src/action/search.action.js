export const SEARCH = "SEARCH";

export function search(key){
    console.log(key);
    return {
        type : SEARCH,
        key : key ,
        payload : ['this' ,'is' , 'search' ,'result']
    }
}