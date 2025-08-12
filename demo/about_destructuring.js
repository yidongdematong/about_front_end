//  普通赋值
{
let a = 1;
let b = 2;
let c = 3;
console.log(a, b, c); // 输出: 1 2 3
}
// 数组解构,位置对应
{
let [a, b, c] = [11, 22, 33];
console.log(a, b, c); // 输出: 1 2 3
}

// 数组解构,属性对应
{
let [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo, bar, baz); // 输出: 1 2 3
}

// 数组解构,属性对应
{
let [ , , third] = ["foo", "bar", "baz"];
console.log(third); // 输出: "baz"
}
// 数组解构,属性对应，不完全结构
{
let [x, , y] = [1, 2, 3];
console.log(x, y); // 输出: 1 3
}

// 数组解构,属性对应，剩余运算符
{
let [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail); // 输出: 1 [2, 3, 4]
}