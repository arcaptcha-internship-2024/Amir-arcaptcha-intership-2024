# ARCaptcha Back-End document for project 1

In this document, we are going to setup project using docker, and after, send request to different endpoints:

## Setup using Docker file:

> [!IMPORTANT]
> If you're using file type for saving data follow below steps first

1. Create a .env file

```sh
touch .env
```

2. Put this in env file

```js
DB_TYPE="file"
```

3. Create a folder and db.json file

```sh
mkdir db
touch db/db.json
```

4. Initialize the **db.json** file for using by copy and paste this initial db into db.json:

```json
{
    "admin": [],
    "contactRequest": [],
    "contactRequestComments": []
}
```

5. Configue required environment variables, there is a sample in `.env.example` of all required environment variables.

---

In Phase 1, we are going to build image and run container by docker, to do so, open the project root directory in terminal and after that run:

```sh
docker build -t arcaptcha_project_backend:1.0 .
```

After successfully image created, run the container by:

```sh
docker run --name arcaptcha_backend -d -p 8000:8000  arcaptcha_project_backend:1.0
```


## Testing:

For run unit tests:

1. Create a `db/db.test.json` file including this data:

```json
{
    "admin": [],
    "contactRequest": [],
    "contactRequestComments": []
}
```

2. Run test command:

```sh
npm run test
```
