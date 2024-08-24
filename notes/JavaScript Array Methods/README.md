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

