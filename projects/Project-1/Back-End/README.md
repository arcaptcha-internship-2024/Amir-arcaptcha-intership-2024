# ARCaptcha Back-End document for project 1

In this document, we are going to setup project using docker, and after, send request to different endpoints:

## Setup using Docker file:

In Phase 1, we are going to build image and run container by docker, to do so, open the project root directory in terminal and after that run:

```sh
docker build -t arcaptcha_project_backend:1.0 .
```

After successfully image created, run the container by:

```sh
docker run --name arcaptcha_backend -d -p 8000:8000  arcaptcha_project_backend:1.0
```

#### Endpoints:

- 127.0.0.1:8000/api/users/create

Create a user based on given data in JSON format

```json
{
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "09121234567",
    "company_name": "arcaptcha",
    "job_position": "Back-End Developer",
    "description": "Back-End Developer in high-tech company"
}
```

**Response:**

```json
{
    "id": "f1a873d3-4691-4bc0-9c2c-0690bdc01f60"
}
```