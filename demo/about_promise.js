console.log("开始执行js脚本");


let promiseDemo= new Promise(function(resovle,reject){

    console.log("promiseDemo开始执行");
    // 模拟异步操作
    resovle('resvole成功');
});

promiseDemo.then(function(value){
    console.log("promiseDemo执行成功",value);
},function(error){})

console.log("promiseDemo执行完毕");