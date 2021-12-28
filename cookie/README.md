### 语法

```
document.cookie;
```

设置一个`cookie`

```
document.cookie = newCookie;
```

`newCookie` 的形式是**键值对形式的字符串**，比如：

```
document.cookie = 'username=zhufengli';
```

通过 `expires` 设置**过期时间**，时间格式就是 `Date.toUTCString()`。  
比如：`Sat, 01 Jan 2022 00:00:00 GMT`

```
document.cookie = 'age=10; expires=' + new Date('2022-01-01').toUTCString();
```

也可以通过 `max-age` 指定**有效时间范围**，单位是秒，

```
document.cookie = 'food=apple; max-age=60';
```
上面就是 60 秒后 cookie `food` 过期


通过 `domain` **指定域名**

```
document.cookie = 'sex=女; domain=zhufengli.com';
```

![image.png](https://s2.loli.net/2021/12/28/SXCGYhuwAtyblg5.png)


### 封装，挂在 window 下

```
if(!window.customCookies) {
  window.customCookies = {
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
}
```

### 使用

#### 设置

`customCookies.set()`，接受一个对象参数，对象的值为

- `key` (**必填**)
    - 要创建或覆盖的 `cookie` 的名字 (`String`)


- `value` (**必填**)
    - `cookie`的值 (`String`)


- `vEnd` (非必填)
    - 过期时间 (`String`)


- `path` (非必填) 
    - 如果没有定义，默认为当前文档位置的路径 (`String`)


- `domain` (非必填) 
    - 域名 (`String`)


- `secure` (非必填) 
    - `cookie`只通过`https`协议传输(`Boolean`)

```
customCookies.set({
  key: 'username', 
  value: '刘备', 
  vEnd: 60,  // 如果是数字，秒为单位
  path: '/', 
  domain: '', 
  secure: true
});

// 对象需要转字符串存
let userinfo = {
  name:'刘备',
  phone: 13265049537
}
customCookies.set({
  key: 'userinfo', 
  value: JSON.stringify(userinfo),
});
```

#### 获取某个cookie

`customCookies.get(key)`，接受一个参数，要获取的 `cookie` 的名字，返回获取 `cookie` 的值

```
customCookies.get('userinfo')
```

#### 获取所有的cookie

返回当前文档位置的路径下所有 `cookie`

```
customCookies.all()
```

#### 删除某个cookie

`customCookies.remove(key, path, domain)`，接受三个参数

- `key` (**必填**)
    - 要删除的 `cookie` 的名字 (`String`)


- `path` (非必填) 
    - 如果没有定义，默认为当前文档位置的路径 (`String`)


- `domain` (非必填) 
    - 域名 (`String`)

```
customCookies.remove('username')
// 或者
customCookies.remove('username', '/', '127.0.0.1')
```

#### 清除所有cookie

清除当前文档位置的路径下所有 `cookie`

```
customCookies.clear()
```

### 扩展

编码 `decodeURIComponent` `encodeURIComponent` 兼容浏览器支持中文

参考文章：

[MDN cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)  
[MDN encodeURIComponent](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)  
[MDN decodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)
