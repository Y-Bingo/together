import {SEARCH} from '../action/search.action'

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