import Dep from "./dep"

let $uid = 0//观察者id
export default class Watcher {
  constructor(exp, scope, callback) {
    this.exp = exp
    this.scope = scope
    this.callback = callback
    this.uid = $uid++
    this.update()
  }
  /**
   * 计算表达式
   */
  get() {
    Dep.target = this;//把观察者放进依赖中
    let newValue = Watcher.computeExpression(this.exp, this.scope);
    Dep.target = null;
    return newValue;
  }

  /**
   * 回调函数的调用
   */
  update() {
    let newValue = this.get()
    this.callback && this.callback(newValue)
  }

  static computeExpression(exp, scope) {//静态函数(watcher工具函数，不让它new出去)，计算表达式
    // 创建函数
    // 把scope当作作用域
    // 函数内部使用with来指定作用域
    // 执行函数, 得到表达式的值
    let fn = new Function('scope', "with(scope){return " + exp + "}")//会触发observer
    return fn(scope)
  }
}