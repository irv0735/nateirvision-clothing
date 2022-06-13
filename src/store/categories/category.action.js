import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from './category.types';
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () => 
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSucceed = (categoriesArray) => 
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCEED, categoriesArray);

export const fetchCategoriesFailed = (error) => 
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());

  try {
    const categoriesArray = await getCategoriesAndDocuments('categories');
    dispatch(fetchCategoriesSucceed(categoriesArray));
  } catch (error) {
    dispatch(fetchCategoriesFailed(error));
  }
}