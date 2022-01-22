import { combineReducers } from 'redux'
import acronimoReducer from './acronimoReducer'

export default combineReducers({
  acronimos: acronimoReducer,
  significados: acronimoReducer
})
