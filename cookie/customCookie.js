export default customCookies = {
  /**
   * 获取cookie值
   * key      String    必填      要获取的cookie的名字
   */
  get(key) {
    var reg = new RegExp("(^| )" + encodeURIComponent(key) + "=([^;]*)(;|$)");
    let result = document.cookie.match(reg);
    if(result && result.length) {
      return decodeURIComponent(result[2])
    } else {
      return null
    }
  },
  /**
   * 设置cookies
   * key      String    必填      要创建或覆盖的cookie的名字
   * value    String    必填      cookie的值
   * vEnd     String    非必填    过期时间
   * path     String    非必填    如果没有定义，默认为当前文档位置的路径
   * domain   String    非必填    域名
   * secure   Boolean   非必填    cookie只通过https协议传输
   */
  set({key, value, vEnd, path, domain, secure}) {
    if(!key || !value) return;
    let time = '';
    if(vEnd) {
      switch (vEnd.constructor) {
        case Date:
          time = `; expires=${vEnd.toUTCString()}`
          break;
        case Number:
          time = vEnd == Infinity ? `expires=${new Date('9999-12-31 23:59:59').toUTCString()}` : `; max-age=${vEnd}`
          break;
        case String:
          time = `; expires=${vEnd}`
          break;
        default:
          break;
      }
    }
    document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + time + (path ? `; path=${path}` : '') + 
    (domain ? `; domain=${domain}` : '') + (secure ? `; secure=${secure}` : '')
  },

  /**
   * 移除单个cookies
   * key      String    必填      要移除的cookie的名字
   * path     String    非必填    如果没有定义，默认为当前文档位置的路径
   * domain   String    非必填    域名
   */
  remove(key, path, domain) {

    if (key && this.hasItem(key)) {
      document.cookie = encodeURIComponent(key) + `=; expires=${new Date('1970-01-01').toUTCString()}` + 
      (domain ? `; domain=${domain}` : '') + 
      (path ? `; path=${path}` : '');
      return true
    } else {
      return false
    }
  },
  /**
   * 判断是否存在指定的cookie
   * key      String    必填    要查找的cookie的名字
   */
  hasItem(key) {
    let reg = new RegExp("(?:^|;\\s*)" + encodeURIComponent(key) + "\\s*\\=");
    return reg.test(document.cookie)
  },
  /**
   * 获取所有的cookie
   */
  all() {
    let map = {};
    let cookies = document.cookie.match(/([^; =]+)=([^;]+)/g);
    for (let item of cookies) {
      let cook = item.split('=');
      map[decodeURIComponent(cook[0])] = decodeURIComponent(cook[1])
    }
    return map
  },
  /**
   * 获取所有cookie的key
   */
  getKeys() {
    var allKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var i = 0; i < allKeys.length; i++) { 
      allKeys[i] = decodeURIComponent(allKeys[i]); 
    }
    return allKeys;
  },
  /**
   * 清除所有cookies, 只清除当前文档位置的路径
   */
  clear() {
    let keys = this.getKeys();
    for (item of keys) {
      this.remove(item)
    }
  }
}