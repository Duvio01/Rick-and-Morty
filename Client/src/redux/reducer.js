import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "./action_types"

const initialState = {
    myFavorites: [],
    allCharacters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAV:
            return { 
                ...state, 
                myFavorites: action.payload, 
                allCharacters: action.payload 
            }
        case REMOVE_FAV:
            return{
                ...state,
                myFavorites: action.payload,
                allCharacters: action.payload
            }
        case FILTER:
            let filter2 
            if(action.payload !== ''){
                filter2 = state.allCharacters.filter((character) => character.gender === action.payload)
            }else{
                filter2 = state.allCharacters
            }
            return {
                ...state,
                myFavorites: filter2
            }
        case ORDER:
            return{
                ...state,
                myFavorites: action.payload === 'A' ? [...state.allCharacters.sort((a,b) => a.id - b.id)] : action.payload === 'D' ? [...state.allCharacters.sort((a,b) => b.id - a.id)] : state.allCharacters
            }
        default:
            return {
                ...state
            }
    }
} 

export default reducer