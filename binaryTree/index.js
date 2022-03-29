/**
 * 二叉树
 */

/**
 * 树节点类
 */
class TreeNode {
  constructor(value) {
    // 节点的值
    this.value = value;
    // 左节点
    this.leftNode = null;
    // 右节点
    this.rightNode = null;
  }
}

/**
 * 树操作
 */
class BinarySearchTree {
  constructor() {
    // 根节点
    this.root = null;
  }
  /**
   * 插入节点
   */
  insert(value){
    if (this.root == null) {
      this.root = new TreeNode(value);
    } else {
      this.insertNode(this.root, value);
    }
  }
  /**
   * 插入根节点以外的节点
   */
  insertNode(node,value) {
    // 小于节点则放到左节点
    if(value < node.value) {
      // 如果左节点不存在，则将新值作为左子节点
      if(node.leftNode == null) {
        node.leftNode = new TreeNode(value);
      
      // 否则，继续找到下一层
      }else {
        this.insertNode(node.leftNode, value);
      }
    
    // 大于节点则放到右节点
    } else if(value > node.value) {

      // 如果右节点不存在，则将新值作为右子节点
      if(node.rightNode == null) {
        node.rightNode = new TreeNode(value);

      // 否则，继续找到下一层
      }else {
        this.insertNode(node.rightNode, value);
      }
    }
  }

  /**
   * 查找节点
   */
  search(value) {
    return this.searchNode(this.root, value);
  }

  /**
   * 递归查找节点
   */
  searchNode(node, value) {
    // 如果节点不存在，返回false表示没有找到该值
    if(node == null) {
      return false;
    }

    // 如果找到，返回该节点
    if (value == node.value) {
      return node;
    
    // 如果要找的值大于当前节点的值，那就从右节点处继续往下找
    } else if (value > node.value) {
      return this.searchNode(node.rightNode, value);
    
    // 如果要找的值小于当前节点的值，那就从左节点处继续往下找
    } else {
      return this.searchNode(node.leftNode, value);
    }
  }

  /**
   * 删除节点
   */
  remove(value){
    return this.removeNode(this.root, value)
  }

  /**
   * 递归查找移除节点
   */
  removeNode(node, value) {
    // 没有节点直接返回null
    if(node == null) {
      return null;
    
    // 如果值比当前节点的值小
    } else if (value < node.value) {

      // 沿着树的左侧找下一个节点
      node.leftNode = this.removeNode(node.leftNode, value);

      // 返回更新后的节点
      return node
    
    // 如果值比当前节点的值大
    } else if (value > node.value) {

      // 沿着树的右侧找下一个节点
      node.rightNode = this.removeNode(node.rightNode, value);

      // 返回更新后的节点
      return node
    
    // 如果值和当前节点的值相等
    } else {

      // 没有子节点
      if(node.leftNode == null && node.rightNode == null) {
        return null
      
      // 没有左子节点
      } else if (node.leftNode == null) {
        return node.rightNode
      
      // 没有右子节点
      } else if (node.rightNode == null) {
        return node.leftNode
      
      // 有两个子节点
      } else {

        // 找出要移除的节点右边子节点中的最小节点
        let aux = this.minNode(node.rightNode);

        // 用右侧子节点中的最小节点的值去更新当前删除节点的值
        // 相当于把它移除了
        node.value = aux.value;
        
        // 继续把右侧子节点中的最小节点移除
        // 因为它已经被移至要移除节点的位置了
        node.rightNode = this.removeNode(node.rightNode, aux.value);

        // 向父节点返回更新后节点的引用
        return node
      }

    }
  }

  /**
   * 查找最小值
   */
  min() {
    return this.minNode(this.root)
  }

  /**
   * 查找最小节点
   */
  minNode(node) {
    let current = node;
    // 循环一直往左侧查找
    while(current != null && current.leftNode != null) {
      current = current.leftNode
    }
    // 返回最小节点
    return current
  }

  /**
   * 查找最大值
   */
  max() {
    return this.maxNode(this.root)
  }

  /**
   * 查找最大节点
   */
  maxNode(node) {
    let current = node;
    // 循环一直往左侧查找
    while(current != null && current.rightNode != null) {
      current = current.rightNode
    }
    // 返回最小节点
    return current
  }

}