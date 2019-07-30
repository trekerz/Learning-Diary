/**
 * 模仿generator实现
 * @param {Function} cb 需调用者实现的generator函数
 */
function generator (cb: Function) {
    return (function () {
        // 状态记录
        const object = {
            next: 0,
            stop: function () {}
        }
        return {
            next: function () {
                const ret = cb(object)
                if (ret === undefined) {
                    return {
                        value: undefined,
                        done: true
                    }
                }
                return {
                    value: ret,
                    done: false
                }
            }
        }
    })()
}
