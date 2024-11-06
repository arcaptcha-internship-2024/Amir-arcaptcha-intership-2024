# File System Module

In this document, I'm gonna share my experience from reading and researching fs module in NodeJS.

Generally, file system module in NodeJS are seprated in different shapes. For instance:

1. Promise-based API:

```js
const fs = require('node:fs/promises');
```

2. CallBack and Sync API:

```js
const fs = require('node:fs');
```

> All the file system operations have synchronous, callback and promise-based forms, and are accessible using both CommonJS syntax or ES6 Modules.

#### Using Promise-Based API

1. Open File:

For more flags, see: [File System Flags](https://nodejs.org/api/fs.html#file-system-flags).

Flag `r` that is set in the example below, Open file for reading. An exception occurs if the file does not exist.

```js
const fs = require("node:fs/promises");

const main = async () => {
    await fs.open("/your/file/path/here", flag="r"); 
    for await (const chunk of file.readableWebStream())
    console.log(chunk);

    await file.close();
}

main();
```

2. Read Data from File:

By default, if you not include the encoding option, it will return a `Buffer`.

```js
const { readFile } = require("node:fs/promises");
let data = await readFile("/your/file/path/here", { encoding: 'utf8' });
console.log(data);
```

3. Write data into file:


```js
const { writeFile } = require("node:fs/promises");
const main = async () => {
    await writeFile("/your/file/path/here", "Your data here", { encoding: "utf8" });
}
```
