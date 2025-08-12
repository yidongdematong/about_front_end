
console.log("主进程开始执行js脚本");
console.log("主进程业务处理");

console.log("开启子进程完成任务");

let promiseDemo= new Promise(function(resovle,reject){

    console.log("这里是子进程，promiseDemo开始执行任务");
    // 模拟异步操作
    resovle('resvole成功');
});

promiseDemo.then(function(value){
    console.log("promiseDemo执行成功",value);
},function(error){})



console.log("主进程业务处理1");
console.log("主进程业务处理2");

console.log("主进程业务处理完成，结束js脚本执行");