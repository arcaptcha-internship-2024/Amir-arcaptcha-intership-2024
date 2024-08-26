// 1. Given an array of numbers, create a new array that contains only the even numbers.
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let evenNumbers = numbers.filter(num => num % 2 === 1);
console.log(evenNumbers)

// 2. Create a new array that contains the squares of each number in the given array.
let squares = numbers.map(num => Math.pow(num, 2));
console.log(squares);

// 3. Calculate the sum of all numbers in an array.
let sum = numbers.reduce((accumulator, value) => accumulator + value);
console.log(sum);

// 4. Locate the first number greater than 5 in an array.
console.log(numbers.findIndex(num => num > 5));

// 5. Check if there are any negative numbers in an array.
console.log(numbers.some(num => num < 0));

// 6. Determine if all elements in an array are positive numbers.
console.log(numbers.every(num => num > 0));

// 7. Sort an array of strings in alphabetical order.
const fruits = ['banana', 'apple', 'orange', 'mango'];
console.log(fruits.sort());

// 8. Combine two arrays into one.
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

let combinedArray = array1.concat(array2);
console.log(combinedArray);

// 9. Create a new array that contains the first three elements of an array.
console.log(numbers.slice(0, 3))

// 10. Remove two elements from an array starting at index 1 and return the modified array.
console.log(numbers.splice(1, 2));
console.log(numbers);

// 11. Imagine that we have a array of objects and we want to create an array on objects that contain persons that has
// Age above the average.

const data = [
    { name: 'ali', age: 23 },
    { name: 'gholi', age: 44 },
]

let result = data.filter(person => person.age > data.reduce((accumulator, person) => accumulator + person.age, 0) / data.length )
.map(person => Object.assign(person, {"name_count": person.name.length}));
console.log(result);