type Character = [number, string, string, string, Record<string, any>, string[]]

// @ts-ignore
import { characters } from '../data'
import SortNode from './SortNode'

export default class BackupTree {
  id: number = -1
  isEven: boolean = false
  nodes: BackupTree[] = []
  cTree: SortNode = null

  constructor () {}

  /**
   * set root node
   */
  public setup (root: SortNode) {
    this.cTree = new SortNode(0)
    this.nodes = []
    this.init(root)
    return this
  }

  /**
   * generate ID tree from current character ranks
   */
  private init (root: SortNode, tree: BackupTree = this) {
    for (const child of root.children) {
      const node = new BackupTree()
      node.id = child.id
      node.isEven = child.isEven
      tree.nodes.push(node)
      this.init(child, node)
    }
  }

  /**
   * restore character ranks from ID tree
   */
  public restore (idTree: BackupTree = this, cNode = this.cTree) {
    var len = idTree.nodes.length
    for (var i = 0; i < len; i++) {
      var nodeId = idTree.nodes[i].id
      var isEven = idTree.nodes[i].isEven
      var cItem = null
      for (var j = 0; j < characters.length; j++) {
        if (nodeId === characters[j][0]) {
          cItem = new SortNode(...<Character>characters[j])
          cItem.isEven = isEven
          break
        }
      }
      // why the hell is this NOT FOUND ???
      if (cItem === null) {
        continue
      }
      cNode.add(cItem, false)
      this.restore(idTree.nodes[i], cItem)
    }
    return this.cTree
  }
}
