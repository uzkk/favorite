export default class SortNode {
  public isEven: boolean = false
  public parent: SortNode = null
  public children: SortNode[] = []

  constructor (
    public id: number = 0,
    public name: string = '',
    public nick: string = '',
    public appearence: string = '',
    public meta: Record<string, any> = {},
    public tags: string[] = [],
  ) {}

  /**
   * clone a node
   */
  clone () {
    return new SortNode(
      this.id,
      this.name,
      this.nick,
      this.appearence,
      this.meta,
      this.tags,
    )
  }

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
   * add child node
   */
  add (child: SortNode, doEvenAction = false) {
    // remove node from its parent
    if (child.parent) {
      child.parent.children.splice(child.parent.children.indexOf(child), 1)
    }

    // handle even
    if (doEvenAction) {
      var copies = this.children.splice(0, this.children.length)
      for (var i = copies.length - 1; i >= 0; i--) {
        copies[i].parent = child
      }
      child.children.push(...copies)
    }

    this.children.push(child)
    child.parent = this
  }

  /**
   * remove current node
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
