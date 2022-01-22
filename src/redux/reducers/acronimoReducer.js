import {
    AGREGAR_ACRONIMO,
    AGREGAR_ACRONIMO_EXITO,
    AGREGAR_ACRONIMO_ERROR,
    COMENZAR_CONSULTA,
    COMENZAR_CONSULTA_EXITO,
    COMENZAR_CONSULTA_ERROR,
    COMENZAR_CONSULTA_API,
    COMENZAR_CONSULTA_API_EXITO,
    COMENZAR_CONSULTA_API_ERROR } from '../types'

// Cada reducer tiene su propio state
const initialState = {
    acronimos: [],
    significados: [],
    error: null,
    loading: false
}

// eslint-disable-next-line
export default function(state = initialState, action) {
    switch (action.type) {
        case COMENZAR_CONSULTA_API:
        case COMENZAR_CONSULTA:
        case AGREGAR_ACRONIMO:
            return {
                ...state,
                loading: action.payload
            }
        case AGREGAR_ACRONIMO_EXITO:
            return {
                ...state,
                loading: false,
                acronimos: [...state.acronimos, action.payload]
            }
        case COMENZAR_CONSULTA_API_ERROR:
        case COMENZAR_CONSULTA_ERROR:
        case AGREGAR_ACRONIMO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case COMENZAR_CONSULTA_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                acronimos: action.payload
            }
        case COMENZAR_CONSULTA_API_EXITO:
            return {
                ...state,
                loading: false,
                error: null,
                significados: action.payload
            }
    
    default:
        return state
    }
}
