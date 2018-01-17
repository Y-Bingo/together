// action
import * as Action from '../action/topic.action';
const initState = {
    topic_data : [
        {
            is_good : false,
            is_collect:false,
            is_join:false,
            is_care:false,
            good_nums: 23,
            // collect_nums : 33,
            comment_nums: 21,
            menber_nums: 99
        },
        {
            is_good: true,
            is_collect: false,
            is_join: true,
            good_nums: 223,
            // collect_nums : 33,
            comment_nums: 231,
            menber_nums: 929
        }
    ]
};


export default function topic(state = initState, action) {
    const {type,...orthers} = action;
    switch (type) {
        case Action.GOOD:
            return {...state,...orthers};
        case Action.COLLECT:
            return {...state,...orthers};
        default:
            return state;
    }
}