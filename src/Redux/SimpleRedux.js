import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  simpleAction: ['message']
});

export const SimpleTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
const initialState = {
  message: ''
};

export const INITIAL_STATE = Immutable(initialState);

/* ------------- Reducers ------------- */

export const simpleAction = (state, { message }) => {
  return state.merge({ message });
};

export const reset = state => INITIAL_STATE;

/* ------------- Selectors ------------- */
export const DealSelectors = {};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIMPLE_ACTION]: simpleAction
});
