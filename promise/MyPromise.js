const PENDING = 'PENDING',
  		FULFILLED = 'FULFILLED',
      REJECTED = 'REJECTED';

// 根据返回值是否是promise分别处理
function resolvePromise(promise2, x, resolve, reject){
	// 返回的是promise2本身
	if(promise2 === x) {
		return reject(new TypeError('Chaining cycle detected for promise #<MyPromise>]'))
	}
	// 防止多次调用resolve和reject
	let called = false;
	// x是非null对象或者函数时，有可能是MyPromise对象，否则是普通值
	if((typeof x === 'object' && x !== null) || typeof x === 'function') {
		//try...catch...是为了捕获回去then方法的异常
		try {
			let then = x.then;
			// x是否有then方法，否的话x是普通对象
			if(typeof then === 'function'){
				then.call(x, y => {
					if(called) return;
					called = true;
					// 递归调用，处理多层嵌套
					resolvePromise(promise2, y, resolve, reject);
				}, r => {
					if(called) return;
					called = true;
					reject(r);
				})
			} else {
				resolve(x);
			}
		} catch(e) {
			if(called) return;
			called = true;
			reject(e);
		}
	} else {
		resolve(x)
	}
}


class MyPromise {
  constructor(executor){
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
		this.onFulfilledCallback = [];
		this.onRejectedCallback = [];
		const resolve = value => {
			if(this.status === PENDING){
				this.status = FULFILLED;
				this.value = value;
				//发布
				this.onFulfilledCallback.forEach(fn => fn());
			}
		}
		const reject = reason => {
			if(this.status === PENDING){
				this.status = REJECTED;
				this.reason = reason;
				//发布
				this.onRejectedCallback.forEach(fn => fn());
			}
		}
		try{
			executor(resolve, reject);
		} catch (e) {
			reject(e)
		}
  }
	then (onResolved, onRejected) {
		// onResolved, onRejected可以为空，处理为空的情况
		onResolved = onResolved ? onResolved : value => value;
		onRejected = onRejected ? onRejected : reason => { throw reason }
		let promise2 = new MyPromise((resolve, reject) => {
			if(this.status === FULFILLED){
				// 通过宏任务或者微任务确保异步，使得处理函数resolvePromise或得promise2
				setTimeout(() => {
					//处理异常，只要异常返回reject（error）
					try { 
						// 获取返回值用来处理不同情况返回值，常规值和promise
						let x = onResolved(this.value); 
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				})
			}
			if(this.status === REJECTED) {
				setTimeout(() => {
					try {
						let x = onRejected(this.reason);
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				})
			}
	
			//订阅，通过发布订阅模式处理promise内部的异步情况
			if(this.status === PENDING) {
				this.onFulfilledCallback.push(() => {
					try {
						let x = onResolved(this.value);
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				});
				this.onRejectedCallback.push(() => {
					try {
						let x = onRejected(this.reason);
						resolvePromise(promise2, x, resolve, reject);
					} catch (e) {
						reject(e);
					}
				});
			}
		})
		return promise2; // 返回一个新的promise
	}
	//catch是then的语法糖
	catch(errorCallback){
		return this.then(null, errorCallback)
	}
}

module.exports =  MyPromise;