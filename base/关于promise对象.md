## 关于 Promise

promise 是异步编程的一种解决方案，最早由社区提出和实现，es6 将其写进了语言标准，统一了用法，原生提供了 Promise 对象。

所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 api，各种异步操作都可以用同样的方法进行处理。

Promise 对象有以下两个特点：

- 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending(进行中)、fulfilled（已成功）和 rejected(已失败)。只有异步操作的结果，可以决定当前是哪种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，“承诺”，表示其他手段无法改变。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对 Promise 对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise 对象提供统一的接口，使得控制异步操作更加容易。

Promise 也有一些缺点。首先，无法取消 Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。第三，当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 基本语法

es6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例。

```
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

说明：

- Promise 构造函数接受一个函数作为参数，该函数的两个参数分别是 resolve 和 reject。他们是两个函数，由 javascript 引擎提供，不用自己部署。
- resolve 函数的作用是，将 Promise 对象的状态从“未完成”便成为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果作为参数传递出去；reject 函数的作用是，将 Promise 对象的从“未完成”变成“失败”（即从 pending 变为 rejected）,在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise 实例生成以后，可以用 then 方法分别指定 resolved 状态和 rejected 状态的回调函数。

```
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

then 方法可以接受两个回调函数作为参数。第一个回调函数是 Promise 对象的状态变为 resolved 时调用，第二个回调函数是 Promise 对象的状态变为 rejected 时调用。这两个函数都是可选的，不一定要提供。它们都接受 Promise 对象传出的值作为参数。

Promise 新建后就会立即执行

```
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

上面代码中，Promise 新建后立即执行，所以首先输出的是 Promise。然后，then 方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以 resolved 最后输出。

## Promise.all()

Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```
const p = Promise.all([p1, p2, p3]);
```

上面代码中，Promise.all()方法接受一个数组作为参数，p1、p2、p3 都是 Promise 实例，如果不是，就会先调用下面讲到的 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理。另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

p 的状态由 p1、p2、p3 决定，分成两种情况。

- 只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。
- 只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。

具体例子：

```
// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
```

上面代码中，promises 是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成 fulfilled，或者其中有一个变为 rejected，才会调用 Promise.all 方法后面的回调函数。

另一个例子。

```
const databasePromise = connectDatabase();

const booksPromise = databasePromise
  .then(findAllBooks);

const userPromise = databasePromise
  .then(getCurrentUser);

Promise.all([
  booksPromise,
  userPromise
])
.then(([books, user]) => pickTopRecommendations(books, user));
```

上面代码中，booksPromise 和 userPromise 是两个异步操作，只有等到它们的结果都返回了，才会触发 pickTopRecommendations 这个回调函数。

注意，如果作为参数的 Promise 实例，自己定义了 catch 方法，那么它一旦被 rejected，并不会触发 Promise.all()的 catch 方法。
