export function logger1({ getState }) {
    console.log('logger1: building middleware')
    return (next) => {
        console.log('logger1: currying next')

        return (action) => {
            console.log('logger1: will dispatch', action)

            // 调用 middleware 链中下一个 middleware 的 dispatch。
            let returnValue = next(action)

            console.log('logger1: state after dispatch', getState())

            // 一般会是 action 本身，除非
            // 后面的 middleware 修改了它。
            return returnValue
        }
    }
}

export function logger2({ getState }) {
    console.log('logger2: building middleware')

    return (next) => {
        console.log('logger2: currying next')

        return (action) => {
            console.log('logger2: will dispatch', action)

            // 调用 middleware 链中下一个 middleware 的 dispatch。
            let returnValue = next(action)

            console.log('logger2: state after dispatch', getState())

            // 一般会是 action 本身，除非
            // 后面的 middleware 修改了它。
            return returnValue
        }
    }
}

export function logger3({ getState }) {
    console.log('logger3: building middleware')

    return (next) => {
        console.log('logger3: currying next')

        return (action) => {
            console.log('logger3: will dispatch', action)

            // 调用 middleware 链中下一个 middleware 的 dispatch。
            let returnValue = next(action)

            console.log('logger3: state after dispatch', getState())

            // 一般会是 action 本身，除非
            // 后面的 middleware 修改了它。
            return returnValue
        }
    }
}

export function thunk({ dispatch, getState }) {
    console.log('thunk: building middleware', dispatch, getState)

    return (next) => {
        console.log('thunk: currying next')

        return (action) => {
            console.log('thunk: will dispatch', action)

            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            let returnValue = next(action)
            console.log('thunk: state after dispatch', getState())
            return returnValue
        }
    };
}

/* output:
Reducer counter Object {type: "@@redux/INITx.b.b.s.8.p"}
logger1: building middleware
logger2: building middleware
logger3: building middleware
thunk: building middleware
thunk: currying next
logger3: currying next
logger2: currying next
logger1: currying next
rootSaga begin
rootSaga end
Render on Subscribing

dispatch beginning...
logger1: will dispatch Object {type: "INCREMENT"}
logger2: will dispatch Object {type: "INCREMENT"}
logger3: will dispatch Object {type: "INCREMENT"}
thunk: will dispatch {type: "INCREMENT"}
Reducer counter Object {type: "INCREMENT"}
Reducer INCREMENT
Render on Subscribing

thunk: state after dispatch 1
logger3: state after dispatch 1
logger2: state after dispatch 1
logger1: state after dispatch 1
*/
