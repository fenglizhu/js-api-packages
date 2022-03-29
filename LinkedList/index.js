  /**
   * 链表
   */

  /**
   * 单向链表节点
   */
  class Node {
    constructor(element) {
      this.element = element;
      this.next = null;
    }
  }

  /**
   * 单向链表
   */
  class LinkedList {
    constructor() {
      // 保存第一个元素的引用
      this.head = null;
      // 链表元素的数量
      this.count = 0;
    }

    /**
     * 向链表尾部添加一个元素
     */
    push(element) {

      // 创建node项
      let node = new Node(element);

      // 如果head值为null，意味着向链表添加第一个元素
      if (this.head == null) {
        this.head = node;
      } else {
        // 从第一个元素开始
        let current = this.head;

        // 循环找到最后一个节点，因为最后一项的next为null
        while(current.next != null) {
          current = current.next;
        }

        // 将其next值赋值为新元素，建立连接
        current.next = node;
      }

      // 增加链表的长度
      this.count++;
    }

    /**
     * 向链表的指定的位置插入新节点
     */
    insert(element, position) {

      // 检查越界值
      if (position >= 0 && position <= this.count) {

        // 创建新节点
        let node = new Node(element);

        // 如果插入的是第0个
        if(position == 0) {

          // 把创建节点的next指向this.head
          node.next = this.head;

          // 把this.head指向当前创建的节点
          this.head = node;

        } else {

          // 获取上一节点下一节点
          let { preNode } = this.getPreNextNodes(position);

          // 当前节点
          let current = preNode.next;

          // 新建节点的下一节点就是当前插入位置的节点
          node.next = current;

          // 当前节点指向新建节点
          preNode.next = node;
        }

        // 增加链表的长度
        this.count++

        // 插入数据成功
        return true;

      } else {
        // 插入数据失败
        return false
      }
    }

    /**
     * 查找节点是否存在，返回下表
     */
    indexOf(element) {
      let current = this.head;
      let current_index = 0;

      // 从第一个节点开始循环查找，直到最后
      while (current) {

        // 找到就返回下标
        if(current && element == current.element) {
          return current_index;
        
        // 如果没找到，查找下一节点，
        } else {
          current = current.next;
          current_index++;
        }
      }

      // 如果遍历整个链表都没有找到，就返回-1，
      return -1;
    }

    /**
     * 删除指定位置的节点
     */
    removeAt(index) {
      // 检查越界值
      if (index >= 0 && index < this.count) {
        // 创建一个对链表中第一个节点的引用
        let current = this.head;

        // 移除第一项
        if (index == 0) {
          // 把第一个节点的next作为第一节点
          this.head = current.next;
        } else {
          
          let { preNode, nextNode } = this.getPreNextNodes(index);

          // 将前一节点的next指向被删节点的后一节点
          preNode.next = nextNode;
        }

        // 减少链表的长度
        this.count--;

        // 返回被删节点
        return current.element
      }

      return undefined
    }
    
    /**
     * 查找当前节点的上一节点和下一节点
     */
    getPreNextNodes(index) {

      let current_index = 0;

      // 需要查找元素的前一节点
      let preNode = this.head;

      // 找出前一节点
      while (current_index < index - 1) {
        preNode = preNode.next;
        current_index++;
      }

      // 找出后一节点，注意：preNode.next是当前要找的节点
      let nextNode = preNode.next ? preNode.next.next : null

      return {
        preNode,
        nextNode
      }
    }

    /**
     * 链表是否为空
     */
    isEmpty() {
      return this.size() === 0
    }

    /**
     * 返回链表的长度
     */
    size() {
      return this.count;
    }
  }

  /**
   * 双向链表节点
   */
  class DoublyNode extends Node {
    constructor(element) {
      // 通过super调用Node的构造函数
      super(element);
      // 指向上一个节点
      this.prev = null;
    }
  }

  /**
   * 双向链表
   */
  class DoublyLinkedList extends LinkedList {
    constructor () {
      // 通过super调用LinkedList的构造函数
      super();
      // 保存对链表的最后一个引用
      this.tail = null;
    }
    /**
     * 向链表尾部插入节点
     */
    push(element) {

      // 创建DoublyNode项
      let node = new DoublyNode(element);

      // 如果head值为null，意味着向链表添加第一个元素
      if (this.head == null) {

        // 把head和tail都指向这个新节点
        this.head = node;
        this.tail = node;  // {新增}
      } else { 
        // current变量引用最后一个节点
        let current = this.tail;  // {新增}

        // 把current的下一个节点指向新节点
        current.next = node;

        // 新节点的上一个节点指向current
        node.prev = current;  // {新增}

        // 更新最后节点为新节点
        this.tail = node;  // {新增}
      }

      // 增加链表的长度
      this.count++;
    }

    /**
     * 向链表的指定的位置插入新节点
     */
    insert(element, position) {

      // 检查越界值
      if (position >= 0 && position <= this.count) {

        // 创建新节点
        let node = new DoublyNode(element);

        // 先用一个引用保存head
        let current = this.head;

        // 如果插入的是第0个
        if(position == 0) {

          // 如果双向链表为空
          if(this.head == null) {   // {新增}

            // 把head和tail都指向这个新节点
            this.head = node;
            this.tail = node;
          
          // 如果双向链表不为空
          } else {

            // 把创建节点的next指向head
            node.next = this.head;  // {新增}

            // current.prev指向新的节点
            current.prev = node;  // {新增}

            // head指向新的节点
            this.head = node;
          }
          
          // 把this.head指向当前创建的节点
          this.head = node;
        
        // 在尾部插入节点
        } else if (position === this.count) {
          
          // current变量引用最后一个节点
          current = this.tail;  // {新增}

          // 把current的下一个节点指向新节点
          current.next = node;

          // 新节点的上一个节点指向current
          node.prev = current;  // {新增}

          // 更新最后节点为新节点
          this.tail = node;  // {新增}

        } else {

          // 获取上一节点下一节点
          let { preNode, nextNode } = this.getPreNextNodes(position);

          current = preNode.next;

          // 新建节点的下一节点就是当前插入位置的节点
          node.next = current;

          // 当前节点指向新建节点
          preNode.next = node;

          // 当前节点的上一节点指向新的节点
          current.prev = node;  // {新增}

          // 新节点的上一节点指向preNode
          node.prev = preNode;  // {新增}
        }

        // 增加链表的长度
        this.count++

        // 插入数据成功
        return true;

      } else {
        // 插入数据失败
        return false
      }
    }

    /**
     * 删除指定位置的节点
     */
    removeAt(index) {
      // 检查越界值
      if (index >= 0 && index < this.count) {
        // 创建一个对链表中第一个节点的引用
        let current = this.head;

        // 移除第一项
        if (index == 0) {

          // 改变head的引用，将其从current改为下一个元素
          this.head = current.next;

          // 如果只有一项，更新tail  // {新增}
          if (this.count === 1) {
            this.tail = null;
          } else {
            // 更新 head.prev指向null
            this.head.prev = null;
          }
        
        // 是否删除的最后一个节点  {新增}
        } else if (index === this.count - 1) {
          // 把tail拿出来
          current = this.tail;

          // 让tail指向current的上一个节点
          this.tail = current.prev;

          // 让tail的下一个节点指向null
          this.tail.next = null;

        } else {
          
          let { preNode, nextNode } = this.getPreNextNodes(index);

          // 将前一节点的next指向被删节点的后一节点
          preNode.next = nextNode;

          // 将下一个节点的prev指向preNode
          nextNode.prev = preNode;  // {新增}

        }

        // 减少链表的长度
        this.count--;

        // 返回被删节点
        return current.element
      }

      return undefined
    }
  }