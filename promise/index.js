const MyPromise = require('./MyPromise');

let promise1 = new MyPromise((resolve, reject) => { //executor 执行器，自动执行
	resolve("promise1")
})

let promise2 = promise1.then(() => {
	return new MyPromise((resolve, reject) => {
		setTimeout(() => {
			resolve(new MyPromise((resolve, reject) => {
				resolve("new promise resolve")
			}))
		},2000)
	})
	// return Promise.resolve('promise resolved')
	// return 'then promise'
	// return 
}, reason => {
	return reason
})

promise2.then().then(value => {
	throw Error('Error');
}, reason => {
	console.log(reason)
})
.catch(e => {
	console.log(e)
})

// promise.then( (value) => {
//     console.log(value+"1")
// }, (reason) => {
//     console.log('rejected ' + reason)
// })
// promise.then( (value) => {
//     console.log(value+"2")
// }, (reason) => {
//     console.log('rejected ' + reason)
// })