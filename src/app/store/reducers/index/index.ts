import { combineReducers } from 'redux'
import translateReducer from '../translate'

  export  const  rootReducer = combineReducers({
    translate: translateReducer,
  })

export type RootState = ReturnType<typeof rootReducer>
