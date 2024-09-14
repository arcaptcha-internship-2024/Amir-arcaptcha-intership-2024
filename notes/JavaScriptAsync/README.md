# Async/Await in NodeJS

## Source:

- [Asynchronous JavaScript Course – Async/Await , Promises, Callbacks, Fetch API](https://www.youtube.com/watch?v=OFpqvaJ3QYg&t=1s)

## Contents

| Title | Link |
| --- | --- |
| What is Synchoronous Programming? | [Link](#what-is-synchoronous-programming) |
| What is Asynchoronous Programming? | [Link](#what-is-asynchoronous-programming) |

### What is Synchoronous Programming?

In synchronous programming tasks are executed one at a time, in a specific order. Each task must completed before the next can one start. So if a task takes too much time (Reading file, fetch data from APIs) The program will block until the task finish.

**Use case:**

When waiting for tasks is not important for you or sometimes you need something for continue the program proccess. In this case you have to use Synchronous programming

### What is Asynchoronous Programming?

Asynchronous programming, tasks are executed without blocking the execution of following tasks.
When an async task started, the program can move on to the next task while waiting for the async task to be completed in background.
Once task is done, a callback function, promise or `async/await` syntax can be used to handle the result when it becomes available.

**Use case:**

In I/O operations like network requests, reading files, or database queries. Where waiting for a result would block the program unnecessarily.

### CallBack Hell

