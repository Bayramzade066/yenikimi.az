import {TranslateActionTypes, TranslateAction, TranslateState} from '../../types/translate'


const initialState = {
  translateData: {},
  inProgress: false,
}
const translateReducer = (state = initialState, action: TranslateAction) : TranslateState => {
  switch (action.type) {
    case TranslateActionTypes.ADD_ACTIVE_TRANSLATE_REQUEST:
      return {
        ...state,
        inProgress: true,
      }
    case TranslateActionTypes.ADD_ACTIVE_TRANSLATE_SUCCESS:
      return {
        ...state,
        translateData: action.payload,
        inProgress: false,
      }
    case TranslateActionTypes.ADD_ACTIVE_TRANSLATE_ERROR:
      return {
        ...state,
        notify: false
      }

    default:
      return state;
  }
}
export default translateReducer

