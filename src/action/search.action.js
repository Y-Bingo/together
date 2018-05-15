export const SEARCH = "SEARCH";

const initSearch = {
    key : "",
    search_result:[] 
}

export default  function search(state = initSearch ,action){
    const {type , ...orther} = action ;
    switch(type){
        case SEARCH :
            return {...state,...orther};
        default : 
            return state ; 
    }
}
// 搜索
export function search(key){
    console.log(key);
    return (dispatch) => {
        return {
            type: SEARCH,
            key: key,
            payload: ['this', 'is', 'search', 'result']
        }
    }
}
