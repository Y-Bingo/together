// export const USER_CARE = "USER_CARE";
// export const USER_COLLECTION = "USER_COLLECTION";
// export const USER_JOIN = "USER_JOIN";
// export const USER_MSG = "USE_MSG";
// export const USER_PUBLISH = "USER_PUBLISH";
export const USER_INFO_SEARCH = "USER_INFO_SEARCH";

export const userInfoSearch = (info_type,id) =>{
    console.log("user,info,search",info_type);
    return {
        type : USER_INFO_SEARCH,
        data : []
    }
}