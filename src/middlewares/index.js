export function logger1({ getState }) {
    console.log('logger1: build middleware')
    return (next) => {
        console.log('logger1: run next')

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
    console.log('logger2: build middleware')

    return (next) => {
        console.log('logger2: run next')
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

/* output:
Reducer counter Object {type: "@@redux/INITx.b.b.s.8.p"}
logger1: build middleware
logger2: build middleware
logger2: run next
logger1: run next
rootSaga begin
rootSaga end

logger1: will dispatchObject {type: "INCREMENT"}
logger2: will dispatch Object {type: "INCREMENT"}
Reducer counter Object {type: "INCREMENT"}
Reducer INCREMENT
logger2: state after dispatch 1
logger1: state after dispatch 1
*/
