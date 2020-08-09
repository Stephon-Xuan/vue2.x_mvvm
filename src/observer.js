import Dep from "./dep"

// 进行数据劫持
export default class Observer {
  constructor(data) {
    this.data = data
    // 遍历对象完成所有数据的劫持
    this.walk(this.data)
  }

  /**
   * 遍历对象
   * @param {*} data 
   */
  walk(data) {
    if (!data || typeof data !== 'object') { // 递归结束条件
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  /**
   * 动态设置响应式数据
   * @param {*} data 
   * @param {*} key 
   * @param {*} value 
   */
  defineReactive(data, key, value) {
    let dep = new Dep()//一个数据有一个依赖列表
    Object.defineProperty(data, key, {
      enumerable: true,//可遍历
      configurable: false,//不可再配置
      get: () => {
        Dep.target && dep.addSub(Dep.target)//在watch里设置Dep.target,在这里动态加到dep中
        return value;//value是闭包的存在
      },
      set: newValue => {
        console.log('set')
        value = newValue;
        // TODO 触发view页面的变化(编译模板实现了，再写)
        //通知，view里的数据发生变化
        dep.notify()

      }
    })
    this.walk(value)// 给value继续深一步递归
  }
}