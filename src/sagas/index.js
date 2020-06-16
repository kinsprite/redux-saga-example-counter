/* eslint-disable no-constant-condition */

import { put, takeEvery, delay } from 'redux-saga/effects'

export function* incrementAsync() {
  console.log('incrementAsync begin')
  yield delay(1000)
  console.log('incrementAsync middle')
  yield put({ type: 'INCREMENT' })
  yield put({ type: 'INCREMENT_ASYNC_MORE' })
  console.log('incrementAsync end')
}

function *logIncrementAsync() {
  console.log('logIncrementAsync')
}

function *logIncrementAsyncMore() {
  console.log('logIncrementAsyncMore')
}

export default function* rootSaga() {
  console.log('rootSaga begin')
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
  yield takeEvery('INCREMENT_ASYNC', logIncrementAsync)
  yield takeEvery('INCREMENT_ASYNC_MORE', logIncrementAsyncMore)
  console.log('rootSaga end')
}

/* output:
Reducer counter: Object {type: "@@redux/INITg.1.9.5.4"}
rootSaga begin
rootSaga end  // 启动时 saga 函数就退出

Reducer counter: Object {type: "INCREMENT_ASYNC"}
incrementAsync begin
logIncrementAsync     // 说明：一个put()事件，可以有多个takeEvery()

incrementAsync middle
Reducer counter: Object {type: "INCREMENT", @@redux-saga/SAGA_ACTION: true}
Reducer INCREMENT

Reducer counter: Object {type: "INCREMENT_ASYNC_MORE", @@redux-saga/SAGA_ACTION: true}
logIncrementAsyncMore
incrementAsync end
*/
