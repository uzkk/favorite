import SortObject from './SortObject'
import characters from '@dynamic/characters'

export default class IDSortTree {
  constructor () {
    var rootID = -1
    this.id = rootID
    this.isEven = false // 上位と引き分けているか？
    this.nodes = []
    this.cTree = null
  }

  /**
   * ルートアイテム設定をします
   * public void
   */
  setupCTree () {
    this.cTree = new SortObject('!root')
    this.nodes = []
  }

  /**
   * キャラクターアイテムクラスのソート状態からIDツリーを生成します
   * public void
   */
  initTree (cTree, idNode) {
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
   * このIDツリーからキャラクターアイテムクラスのソート状態を復元します
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
      // 謎の NOT FOUND
      if (cItem === null) {
        continue
      }
      cNode.add(cItem, false)
      this.restoreCTree(idTree.nodes[i], cItem)
    }
    return this.cTree
  }
}
