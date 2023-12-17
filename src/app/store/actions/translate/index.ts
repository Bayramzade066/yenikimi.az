import {Dispatch} from "redux";
import {TranslateAction, TranslateActionTypes} from "../../types/translate";
import {getTranslateList} from "../../../services/Translate";


export const translateListData = () => {
  return (dispatch: Dispatch<TranslateAction>) => {
      return new Promise(() => {

      dispatch({ type: TranslateActionTypes.ADD_ACTIVE_TRANSLATE_REQUEST })

        getTranslateList().then(response => {
            dispatch({
              payload: {
                result: response.data,
              },
              type: TranslateActionTypes.ADD_ACTIVE_TRANSLATE_SUCCESS,
            })

          }).catch((error: any) => {
            dispatch({
              error: {
                result: error.response,
              },
              type: TranslateActionTypes.ADD_ACTIVE_TRANSLATE_ERROR,
            })
          })
    })
  }
}
