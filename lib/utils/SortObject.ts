export default class SortObject {
  public isEven: boolean = false
  public parent: SortObject = null
  public children: SortObject[] = []

  constructor (
    public id: number,
    public name: string = '',
    public nick: string = '',
    public meta: Record<string, any> = {},
    public tags: string[] = [],
  ) {}

  /**
   * get current rank
   */
  rank () {
    return this.parent
      ? this.isEven
        ? this.parent.rank()
        : this.level()
      : 0
  }

  /**
   * get node depth
   */
  level () {
    if (!this.parent) return 0
    return this.parent.level() + 1
  }

  /**
  * 追加子结点
  */
  add (child: SortObject, doEvenAction = false) {
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
