// @ts-ignore
import characters from '@dynamic/characters'
import SortObject from './SortObject'

declare let characters: [number, string, string, Record<string, any>, string[]][]

export default class IDSortTree {
  id: number = -1
  isEven: boolean = false
  nodes: IDSortTree[] = []
  cTree: SortObject = null

  constructor () {}

  /**
   * set root node
   */
  setupCTree () {
    this.cTree = new SortObject(0)
    this.nodes = []
  }

  /**
   * generate ID tree from current character ranks
   * public void
   */
  initTree (cTree: SortObject, idNode: IDSortTree) {
    var len = cTree.children.length
    for (var i = 0; i < len; i++) {
      var node = new IDSortTree()
      node.id = cTree.children[i].id
      node.isEven = cTree.children[i].isEven
      idNode.nodes.push(node)
      this.initTree(cTree.children[i], node)
    }
  }

  /**
   * restore character ranks from ID tree
   * public SortTree
   */
  restoreCTree (idTree, cNode) {
    if (cNode === null) {
      cNode = this.cTree
    }
    var len = idTree.nodes.length
    for (var i = 0; i < len; i++) {
      var nodeId = idTree.nodes[i].id
      var isEven = idTree.nodes[i].isEven
      var cItem = null
      for (var j = 0; j < characters.length; j++) {
        if (nodeId === characters[j][0]) {
          cItem = new SortObject(...characters[j])
          cItem.isEven = isEven
          break
        }
      }
      // why the hell is this NOT FOUND ???
      if (cItem === null) {
        continue
      }
      cNode.add(cItem, false)
      this.restoreCTree(idTree.nodes[i], cItem)
    }
    return this.cTree
  }
}
