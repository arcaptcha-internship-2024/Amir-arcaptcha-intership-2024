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

#### Array.prototype.forEach(callbackFunction)
The `forEach()` method will call a callback functon once for every element in array.

```javascript
const numbers = [1, 2, 1];
numbers.forEach(number => {
    console.log(number);
})
// 1
// 2
// 1
```

#### Array.prototype.includes(searchElement, fromIndex:optional)

The `includes()` method will search in array for find the given element and if find any result, return `true` and if not, return `false`.

```javascript
const names = ["John", "Mike", "Sara"];

names.includes("John");
// true

names.includes("Michel");
// false
```

#### Array.prototype.indexOf(searchElement, fromIndex:optional)

The `indexOf()` method will search for given element in array and if find it return the index of first element, and if lost, return `-1`.

```javascript
const names = ["John", "Mike", "Sara"];

names.indexOf("Sara");
// 2

names.indexOf("Michel");
// -1
```

#### Array.prototype.join(separator: optional)

The `join()` method will create a string from all elements in array using a given separator that is optional.
If call this function without give any separator, it will concate strings using a comma `,`.
If there is a single element in array, it will generate string without any separator.


```javascript
const names = ["John", "Mike", "Sara"];

names.join();
// John,Mike,Sara

names.join(" | ");
// John | Mike | Sara

let name = ['Amir'];
name.join()
// Amir
```

#### Array.prototype.keys()

The `keys()` method of arrays, will return a `array iterator` contains key index for each element in array

```javascript
const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();

for (let key of iterator) {
  console.log(key);
}
// 0
// 1
// 2
```

#### Array.prototype.lastIndexOf(searchElement, fromIndex:optional)

The `lastIndexOf()` will returns the last index at which a given element can be found in the array, or -1 if it is not present.

```javascript
const names = ["John", "Mike", "John"];

names.lastIndexOf("John");
// 2
```

#### Array.prototype.map(callbackFunction)

The `map()` method in arrays will create a new array contains all element returned from callbackFunction.

```javascript
const numbers = [4, 6, 8, 10];
console.log(numbers.map(num => num * 2))
// [8, 12, 16, 20]
```

#### Array.prototype.pop()

The `pop()` method will return the last item from array and also remove it from array.

```javascript
const names = ["John", "Mike", "Sara"];

names.pop();
// Sara

console.log(names)
// [John, Mike]
```

#### Array.prototype.push(element1, element2, ...)

The `push()` method will add element or elements from given parameter and append them into array.
This method will add append items at the end of the array and return new length of array

```javascript
const names = ["John", "Mike", "Sara"];

console.log(names.push("Amir"));
// 4

console.log(names.push("Michel", "Jack"))
// 6
```

#### Array.prototype.reduce(callbackFunction, initialValue: Optional)

The `reduce()` method will call a function with 2 values, **accumulator** and **current** value, accumulator is a variable that holds the value from every calculation in this method. With `initialValue` parameter we can set a initial value for accumulator otherwise the initial value will be the value of first element.
The returned result is a single value, that would be accumulator final result.

```javascript
const numbers = [4, 6, 8, 10];
console.log(numbers.reduce((accumulator, current) => accumulator + number, 0))
// 28
```

#### Array.prototype.reduceRight(callbackFunction, initialValue: Optional)

The `reduceRight()` method will do the same as `reduce()` but it will start iteration other the loop from **right-to-left**.

```javascript
const numbers = [4, 6, 8, 10];
console.log(numbers.reduceRight((accumulator, current) => accumulator + number, 0))
// 28
```

#### Array.prototype.reverse()

The `reverse()` method will reverse array in place, it means that it will reverse the actual array and also return a reversed array.

```javascript
const names = ["John", "Mike", "Sara"];

console.log(names.reverse());
// ["Sara", "Mike", "John"]

console.log(names)
// ["Sara", "Mike", "John"]
```

#### Array.prototype.shift()

The `shift()` method of array will remove the first element from array and return it from array.

```javascript
const names = ["John", "Mike", "Sara"];

console.log(names.shift());
// "John"

console.log(names)
// ["Mike", "Sara"]
```

#### Array.prototype.slice(start, end: Optional)

The `slice()` method will return a slice array from current array. If end parameter had set, it will slice array from start point until end index and if not, it will start from start index and continue until reach the end of array.

```javascript
const names = ["John", "Mike", "Sara", "Michel", "Jack", "Bob"];

console.log(names.slice(1, 3));
// ["Mike", "Sara"]

console.log(names.slice(2));
// ["Sara", "Michel", "Jack", "Bob"]

console.log(names);
// ["John", "Mike", "Sara", "Michel", "Jack", "Bob"]
```

#### Array.prototype.some(callbackFunction)

The `some()` method test whether at least one element in array pass the test function or not.
It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array.

```javascript
const numbers = [4, 6, 8, 10, -5, 0, -4, 13];

console.log(numbers.some(num => num < 0))
// true

console.log(numbers.some(num => num > 1000))
// false
```

#### Array.prototype.sort(compareFunction)
...
