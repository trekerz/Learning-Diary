/**
 * 防抖函数
 * 可以选择立即执行或延迟执行
 * @param {Function} fn 回调函数
 * @param {Number} wait 防抖时间
 * @param {Boolean} immediately 立即执行还是延迟执行
 * 
 *  **示例代码：**
 *  ```javascript
 *      window.onscroll = debounce(function () {
 *          console.log('scroll')
 *      }, 2000, true)
 *  ```
 */
function debounce (fn, wait, immediately) {
    let debouceTime
    return function () {
        const callNow = !debouceTime
        if (debouceTime) {
            clearTimeout(debouceTime)
        }
        debouceTime = setTimeout(() => {
            if (!callNow && !immediately) {
                fn()
            }
            clearTimeout(debouceTime)
            debouceTime = null
        }, wait || 500)
        if (callNow) {
            fn()
        }
    }
}
