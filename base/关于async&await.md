promise 对象的出现解决了回调地狱的问题。
即无限套娃

```
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        console.log(d);
      });
    });
  });

  // getData end
});
```

- 调用 getData，传入回调函数 function(a){}
- 当 getData 完成后，执行回调获取 a,并调用 getMoreData(a,function(b){})
- 当 getMoreData(a)，完成后，执行回调，获取 b，并调用 getMoreData(b,function(c){})
- 依次类推，直到最终 console.log(d)

```
function getData() {
  return new Promise((resolve, reject) => {
    // 异步操作
    setTimeout(() => resolve('数据'), 1000);
  });
}

getData()
  .then(data => {
    console.log(data);
    return getMoreData(data);
  })
  .then(moreData => {
    console.log(moreData);
  })
  .catch(error => {
    console.error(error);
  });
```

引入 async/await，它建立在 Promise 之上，让异步代码看起来像同步代码一样。

async 函数
在函数声明前添加 async 关键字，表示该函数是异步的：

```
async function fetchData() {
  // 函数体
}
```

async 函数总是返回一个 Promise:

- 如果返回值不是 Promise，会自动包装成 resolved Promise
- 如果抛出异常，会返回 rejected Promise

await 表达式

await 只能在 async 函数内部使用：

```
async function fetchData() {
  const result = await somePromise;
  console.log(result);
}
```

await 会暂停 async 函数的执行，等待 Promise 完成：

- 如果 Promise 被 resovle，返回 resolve 的值
- 如果 Promise 被 reject,抛出错误（可以用 try/catch 捕获）

## 并行执行

如果需要并行执行多个异步操作，可以使用 Promise.all:

```
async function fetchMultipleData() {
  const [userData, productData] = await Promise.all([
    fetch('/api/user'),
    fetch('/api/products')
  ]);

  const user = await userData.json();
  const products = await productData.json();

  return { user, products };
}
```

我的实际目标是为了理解下面的一段代码，为了理解下面的 js 代码，所以才要搞懂 js 的语法逻辑。

```
/** 加载设备基本信息 */
    async loadDeviceInfo() {
      try {
        const response = await getManagement(
          this.basicInfoQueryParams.deviceId
        );
        this.deviceManagementForm = {
          ...this.deviceManagementForm,
          ...response.data,
        };
      } catch (error) {
        console.error("加载设备信息失败:", error);
        throw error;
      }
    },
    async loadDeviceData() {
      this.loading = true;
      try {
        await Promise.all([this.loadDeviceInfo(), this.loadClientInfo()]);
      } catch (error) {
        console.error("加载设备数据失败:", error);
        this.$message.error("加载设备数据失败");
      } finally {
        this.loading = false;
      }
    },
    /** 加载客户端信息 */
    async loadClientInfo() {
      try {
        const response = await getClientinfoByDeviceId(
          this.basicInfoQueryParams
        );
        this.deviceManagementForm.basicClientInfoForm = {
          ...this.deviceManagementForm.basicClientInfoForm,
          ...response.data,
        };

        this.tempDeviceId = response.data.clientId || "";
        this.tempDownTopic = response.data.downTopic || "";
        this.tempUpTopic = response.data.upTopic || "";
      } catch (error) {
        console.error("加载客户端信息失败:", error);
        throw error;
      }
    },
```

结合目前查询到的 js 资料，初步做个说明

- async loadDeviceInfo():异步请求 getManagement 方法，阻塞 loadDeviceInfo，即 loadDeviceInfo 方法要先等待 getManagement 这个方法返回，而且 getManagement 也是异步请求，等 getManagement 返回结果后赋值给 const response 常量，然后继续执行 loadDeviceInfo 方法内的语句，下面的应该是一个变量的解构，我之前有点印象，还得再去查一下资料
- async loadClientInfo() 同 loadDeviceInfo() 方式的过程逻辑是一样的，但是多了三个赋值的操作。
- async loadDeviceData() 这个方法做了一个汇总，即并发执行上面的两个方法，而且还用 await 修饰，即上面两个异步方法阻塞完成 loadDeviceData()
- 梳理完的逻辑是 loadDeviceData（）定义了两个并发完成 （loadDeviceInfo，loadClientInfo） 的操作
