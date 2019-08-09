import rootSaga from '../Sagas/'
import { combineReducers } from 'redux'
import configureStore from './CreateStore'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  simpleAciton: require('./SimpleRedux').reducer
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers

  let { store, sagasManager, sagaMiddleware } = configureStore(
    finalReducers,
    rootSaga
  )

  if (module.hot) {
    module.hot.accept(() => {
      let nextRootReducer = require('./').rootReducer
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.done.then(() => {
        sagasManager.cancel()
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }
  return { store }
}
