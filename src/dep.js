// 观察者模式中 通知
//dep是多个观察者/监听者组成列表名单
export default class Dep {
  constructor() {
    // 存放所有watcher
    this.subs = {}
  }
  //添加
  addSub(target) {
    this.subs[target.uid] = target
  }
  //通知
  notify() {
    for (let uid in this.subs) {
      this.subs[uid].update()
    }
  }
}