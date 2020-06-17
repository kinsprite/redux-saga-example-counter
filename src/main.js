import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Counter from './components/Counter'
import reducer from './reducers'
import rootSaga from './sagas'
import {logger1, logger2, logger3, thunk } from './middlewares'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(logger1, logger2, logger3, thunk, sagaMiddleware))
sagaMiddleware.run(rootSaga)

const action = type => {
  console.log('dispatch beginning...')
  return store.dispatch({ type })
}

const makeThunk = type => {
  return (dispatch, getState) => {
    console.log('makeThunk: ', dispatch, getState)
    dispatch({ type });
  }
}

const thunkAction = type => {
  return store.dispatch(makeThunk(type))
}

function render() {
  console.log('Render on Subscribing')

  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementIfOdd={() => action('INCREMENT_IF_ODD')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      onIncrementThunk={() => thunkAction('INCREMENT')}
    />,
    document.getElementById('root'),
  )
}

render()
store.subscribe(render)
