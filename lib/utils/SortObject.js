export default class SortObject {
  constructor (...data) {
    this.id = data[0]
    this.name = data[1]
    this.nick = data[2]

    // 上/下位关系（父子结点？）
    this.parent = null
    this.isEven = false // 上位平局了？
    this.children = []
    this.meta = data[4]
    this.tags = data[5]
  }

  /**
  * 获得排名
  */
  rank () {
    if (this.parent) {
      return (this.isEven ? this.parent.rank() : this.level())
    }
    return 0
  }

  /**
  * 获得结点所在深度
  */
  level () {
    if (this.parent) {
      return this.parent.level() + 1
    }
    return 0
  }

  /**
  * 追加子结点
  */
  add (child, doEvenAction) {
    // 首先断开child父结点与child的连接 1R-（这个1R-是个啥？？）
    if (child.parent) {
      child.parent.children.splice(child.parent.children.indexOf(child), 1)
    }

    // 特别处理平局情形
    if (doEvenAction) {
      // 把自己的子结点全部交出去 2A-, 3a+
      var copies = this.children.splice(0, this.children.length)
      for (var i = copies.length - 1; i >= 0; i--) {
        copies[i].parent = child
      }
      Array.prototype.push.apply(child.children, copies)
    }

    // 2A+
    this.children.push(child)
    child.parent = this
  }

  /**
  * 删除
  */
  remove () {
    while (this.children.length > 0) {
      this.parent.add(this.children[0], false)
    }
    this.parent.children.splice(this.parent.children.indexOf(this), 1)
  }

  /**
  * 全体结点中搜索 resourceId 并返回 SortObject。没找到则返回 null。
  */
  findSortObjectById (resourceId) {
    if (this.id === resourceId) {
      return this
    }
    var len = this.children.length
    for (var i = 0; i < len; i++) {
      var result = this.children[i].findSortObjectById(resourceId)
      if (result !== null) {
        return result
      }
    }
    return null
  }
}
