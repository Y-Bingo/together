export const SEARCH = "SEARCH";
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
