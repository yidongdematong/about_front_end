// JavaScript 函数按照它们被调用的顺序执行。而不是以它们被定义的顺序。
function myDisplayer(some) {
    console.log(some);
}
function first(){
      myDisplayer("Hello");
}
function second() {
  myDisplayer("Goodbye");
}

first();
second();

// PS D:\my\about_front_end\demo> node .\about_callback.js
// Hello
// Goodbye

// 顺序控制

function myCalculator(num1, num2) {
  let sum = num1 + num2;
  return sum;
}

let result = myCalculator(5, 5);
myDisplayer(result);

// javascript回调

// 回调是作为参数传递给另一个函数的函数。
function myCalculator1(num1, num2,callback) {
  let sum = num1 + num2;
 callback(sum);
}
myCalculator1(6, 6, myDisplayer);