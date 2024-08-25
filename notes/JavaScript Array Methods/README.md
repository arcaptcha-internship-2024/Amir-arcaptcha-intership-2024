# JavaScript Array Methods

In this Document we're going to take a look at javascript methods that are available for working with arrays.

## Methods:

#### Array.prototype.at()

The at() method give an integer as an argument and return the item at that value. Allows both positive and negative integers, negative integers will count from end of an array. If item doesn't exists, return **undefined**.

```javascript
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.at(1)) // 2
console.log(numbers.at(-1)) // 2
console.log(numbers.at(10)) // undefined
```

#### Array.prototype.concat()

The concat() method will merge 2 or more arrays into a one.
The method doesn't change the array, instead will return a new array.

```javascript
const numbers1 = [1, 2, 3, 4, 5];
const numbers2 = [6, 7, 8, 9, 10];
const numbers3 = [11, 12, 13, 14, 15, 16];

console.log(numbers1.concat(numbers2))
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

console.log(numbers1.concat(numbers2, numbers3)) 
// [1,  2,  3,  4,  5,  5, 6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16]

// It doesn't change the array:
console.log(numbers1) // [1, 2, 3, 4, 5]
```

#### Array.prototype.copyWithin(target, start, end)

The copyWithin() method will copy item from start and end index and put in target index until put all 

[Array.copyWithin()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)

```javascript
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(numbers.copyWithin(1, 7, 10))
// [0, 7, 8, 9, 4, 5, 6, 7, 8, 9, 10]

console.log(numbers.copyWithin(1, 7))
// [0, 7, 8, 9, 10, 5, 6, 7, 8, 9, 10]

console.log(numbers.copyWithin(6, 7, 10))
// [0, 1, 2, 3, 4, 5, 7, 8, 9, 9, 10]

console.log(numbers.copyWithin(6, 7))
//[0, 1, 2, 3,  4, 5, 7, 8, 9, 10, 10]
```

#### Array.prototype.entries()

This method will return an array iterator object that contains the key/value pairs for each index in the array.

```javascript
const numbers = ["john", "jimmy", "mark"];
const iterator = numbers.entries();
console.log(iterator.next().value)
// [0, 'john']

console.log(iterator.next().value)
// [1, 'jimmy']

console.log(iterator.next().value)
// [2, 'mark']


console.log(iterator.next().value)
// undefined
```

#### Array.prototype.every(callbackFuncation,)

The every() method will check all items in an array pass the test in function or not. It returns a Boolean Value.

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(numbers.every((item) => item < 10 )); // true
console.log(numbers.every((item) => item < 8 )); // false
```

#### Array.prototype.fill(item, start, end)

The fill() will fill the array items with the specified item in first parameter utill the end indices.


```javascript
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(numbers.fill(100, 5, 9));
// [0, 1, 2, 3, 4, 100, 100, 100, 100, 9, 10]


console.log(numbers.fill(100, 5));
// [0, 1, 2, 3, 4, 100, 100, 100, 100, 100, 100]



console.log(numbers.fill(100));
// [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
```

#### Array.prototype.filter(callbackFunction)

The filter() method will creates a shallow copy of a given array and filtered down that pass the test by the given array. The filter method doesn't change the array, instead return a new array.

```javascript
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(numbers.filter(item => item % 2 == 0))
// [0, 2, 4, 6, 8, 10]

console.log(numbers.filter(item => item > 5))
// [5, 6, 7, 8, 9, 10]
```

#### Array.prototype.find(callbackFunction)

The find() method will return the first element from array that pass the condition provided in the callback function.

```javascript
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(numbers.find(item => item % 2 == 0))
// 0

console.log(numbers.find(item => item % 5 == 0))
// 5
```

#### Array.prototype.findIndex(callbackFunction)

The findIndex() method will return the **first element index** from array that pass the condition provided in the callback function. If item doesn't founded, return -1.

```javascript
const numbers = [4, 6, 8, 10];
console.log(numbers.findIndex(item => item > 8 == 0))
// 3

console.log(numbers.findIndex(item => item % 5 == 0))
// -1
```

#### Array.prototype.findLast(callbackFunction)

The findLast() method will iterate over the array in reverse and then return the value of the first element that pass the testing function.
If no item satisfy the test function, it will return `undefined`.

```javascript
const numbers = [4, 6, 8, 10];
console.log(numbers.findLast(item => item % 3 === 0))
// 6

console.log(numbers.findLast(item => item === 8))
// 8
```

#### Array.prototype.findLastIndex(callbackFunction)

The findLastIndex() method will iterate over the array in reverse order and return the index of the value that pass the testing function.
If no item satisfy the test function, it will return `-1`.

```javascript
const numbers = [4, 6, 8, 10];
console.log(numbers.findLastIndex(item => item % 3 === 0))
// 1

console.log(numbers.findLastIndex(item => item === 8))
// 2
```

#### Array.prototype.flat(depth)

The flat() method will get an **optional** argument `depth` and make a new array with all sub-array elements that are less than the depth and concate the array with them and return a single array instead.


```javascript
const numbers = [4, 6, [8, [10, 12, [13, 18]]]];
console.log(numbers.flat())
// [4, 6, 8, [10, 12, [13, 18]]]

console.log(numbers.flat(2))
// [4, 6, 8, 10, 12, [13, 18]]

console.log(numbers.flat(Infinity))
// [4, 6, 8, 10, 12, 13, 18]
```

#### Array.prototype.flatMap(callbackFunction)

The flatMap() method will return a flat array which is created by applying the callback function on every elemnt of array.
It is combination of `map()` and also `flat()` methods.

```javascript
const numbers = [1, 2, 1];
console.log(numbers.flatMap(num => num === 2 ? [2, 2] : 1));
// [1, 2, 2, 1]
```