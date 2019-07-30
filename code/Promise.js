// 三种状态
const STATUS = {
    PENDING: {
        code: 'pending',
        text: '等待中'
    },
    RESOLVED: {
        code: 'resolved',
        text: '成功'
    },
    REJECTED: {
        code: 'rejected',
        text: '失败'
    }
}

function MyPromise(fn) {

    let _this = this
    _this.currentState = STATUS.PENDING.code
    _this.value = undefined
    _this.resolvedCallbacks = []
    _this.rejectedCallbacks = []

    _this.resolve = function (val) {
        // 如果val是Promise，则递归执行
        if (val instanceof MyPromise) {
            return val.then(_this.resolve, _this.reject)
        }
        // 异步执行，保证执行顺序
        setTimeout(() => {
            if (_this.currentState === STATUS.PENDING.code) {
                _this.currentState = STATUS.RESOLVED.code
                _this.value = val
                _this.resolvedCallbacks.forEach(cb => cb())
            }
        })
    }

    _this.reject = function (val) {
        // 异步执行，保证执行顺序
        setTimeout(() => {
            if (_this.currentState === STATUS.PENDING.code) {
                _this.currentState = STATUS.REJECTED.code
                _this.value = val
                _this.rejectedCallbacks.forEach(cb => cb())
            }
        })
    }

    // 用于解决以下问题
    // new Promise(() => throw Error('error'))
    try {
        fn(_this.resolve, _this.reject)
    } catch (e) {
        _this.reject(e)
    }
}
