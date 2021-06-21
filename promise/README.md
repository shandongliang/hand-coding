####
1.创建promise类，根据status的状态做相应处理；
2.resolve或者reject异步，通过订阅发布模式处理；
3.通过返回promise来实现链式调用，；
4.链式调用返回值分promise和普通值，resolvePromise函数处理，通过宏任务或者微任务确保异步，使得处理函数resolvePromise获取promise2；
5.根据是否是有then方法的对象来判断；
6.处理then的两个参数不存在的情况；
7.catch函数是then的语法糖。