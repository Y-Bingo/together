// 管理app的状态
export const LISTLOADING = "LISTLOADING";

export const loading = (is_loading) => {
    console.log('loading - state',  is_loading);
    return {
        type : LISTLOADING,
        is_loading : is_loading

    }
}

