import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "./action_types"

const initialState = {
    myFavorites: [],
    allCharacters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FAV:
            const copyCharacters = [...state.allCharacters, action.payload]
            return {
                ...state,
                myFavorites: copyCharacters,
                allCharacters: [...copyCharacters]
            }
        case REMOVE_FAV:
            let filter = state.myFavorites.filter((myFavorite) => myFavorite.id !== action.payload)
            return{
                ...state,
                myFavorites: filter,
                allCharacters: filter
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