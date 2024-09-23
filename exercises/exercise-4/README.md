# Exercise 4

## Question:

Imagine that we have an array of unrepeatable numbers and we want to have a function to call and pass the first parameter as **count** that is number of random numbers we want to fetch from given **numbers** array in second parameter.

---

## Answer:

I had an idea to solve this problem and the idea was if we have an array, we can shuffle it randomly and then, slice the shuffled array from beginning until we reach the given count.

To achieve this goal, I searched and I had found an algorithm for shuffling array with good time complexity and also excellent space complexity.

| Type | Complexity |
| --- | --- |
| Time Complexity | O(n) |
| Space Complexity | O(1) |

**Quick question, Why?**

This algorithm will iterate over the array, which means that the time complexity is related to the size of array. Every time, the algorithm will generate a random number that has been salted by another out-standing number that we can use index that every time we are getting it in the loop. **Why using index?** because if we use other number that is fewer than 0 or greater than array size, the random index will not generate currectly and we will achieve **IndexError**.

So, the key point here is because the **Math.random()** in Javascript will give us a number in range 0 to 1, we can multiply it by a salt and reach our randomIndex. It is obvious that by **Math.floor()** we can have a integer number.

After that, we will shuffle the current index value with generated random index and by doing this, the numbers will shuffled.

The space Complexity is O(1) because we are using a single array and also for shuffle elements, we are not creating any new variable.

At the end, We will return a sliced array from beginning until the given count.

## Sources:

| Title | Link |
| --- | --- |
| Shuffle a given array using Fisher–Yates shuffle Algorithm | [Link](https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/) |
| Destructuring assignment (Single line shuffle element of array in JS) | [Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) |
