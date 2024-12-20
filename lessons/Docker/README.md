# Docker 

> [!NOTE]
> You can find the source of this file in link below:
> [Video Source](https://youtu.be/pg19Z8LL06w?si=-ANu7g9AfZ2A6ONE)

## Table of contents:

| Title | Link |
| --- | --- |
| What is Docker? | [Link](#what-is-docker) |
| What problems Docker solved? | [Link](#what-problems-docker-solved) |
| Virtual Machines VS Docker | [Link](#virtual-machines-vs-docker) |
| What is Docker Image? | [Link](#what-is-docker-image) |
| What is Docker Container? | [Link](#what-is-docker-container) |
| Docker Image VS Docker containers | [Link](#docker-images-vs-docker-containers) |
| Docker registeries | [Link](#docker-registeries) |
| Docker Images tag | [Link](#docker-images-tag) |
| Run your first container  | [Link](#run-your-first-container) |
| Port Binding  | [Link](#port-binding) |
| Docker registry VS Docker repository | [Link](#docker-registry-vs-docker-repository) |
| Building own docker image | [Link](#building-own-docker-image) |
| Example of create a simple docker image | [Link](#example-of-structure-for-a-nodejs-application) |
| Dockerfile Example | [Link](#dockerfile-example) |
| More about Docker architecture | [Link](#more-about-docker-architecture) |
| Docker Network | [Link](#docker-network) |
| Docker Compose | [Link](#docker-compose) |
| Write Docker compose | [Link](#write-docker-compose) |
| Set environment variable in docker-compose.yml | [Link](#set-environment-varible-in-docker-composeyml) |

#### What is Docker?

Docker is a **virtualization software** that makes both developing and deploying phases much easier by packaging the application in something called a `container`.
Containers have all necessary dependencies for application to be execute.

`Container`: *A standardized unit, that has everything the application needs to run*.

Containers are also portable and can share easily!

#### What problems Docker solved?

- Improve deliver application from development to deployment.
- Everyone can run docker images in every Operating systems.
- Commands are same in every OS
- With Docker you can run multiple images with different versions of same app at one time without any conflict
- No **extra** configurations need to set on server for deployment (except Docker runtime)
- Less room for errors
- Easy deployment process


#### Virtual Machines VS Docker

**How an Operating system made up?**

Operating system has 2 main layer:

1. OS kernel: A part that communicate with hardware, and interact between hardware and software components.
2. OS Application layer: Applications will managed in application layer and application layer will interact softwares to kernel.

OS Kernel is like a middleware between application layer and hardware.

**What parts of OS will virtualized by Docker?**

- Docker virtualized application layer with some additional application layer on top of that like: *Python, Java, ...* .
- Docker will use OS Kernel and it doesn't have its own kernel.

**Difference between Docker and VM:**

The Virtual machines have their own kernel when they executed but docker will use Host OS kernel that has installed on.

| Topic | Docker | Virtual Machines |
| --- | --- | --- |
| Size | Smaller Size, usually in MB | Large size, usually in GB |
| Speed | Run in second | Takes time to run |
| Compability | Docker doesn't run in every OS | Not depend on OS |

Docker cannot use *Windows* kernel to run linux based images, in order it will use a hypervisor layer with a light weight linux distro.

#### What is Docker Image?

It is a file that comprised of multiple layers, used to execute code in Docker container. Docker image is an executable package of software that includes everything needed to run an application. This image informs how a container should instantiate, determine which software component will run and how container should act.

#### What is Docker Container?

Docker container is a runtime instance of a Docker image. Docker containers allows developers to package all dependencies with application for easy to setup in everywhere.

#### Docker Images VS Docker Containers

| Docker Images | Docker Container |
| --- | --- |
| Docker Image is a executable application artifact | Start an application |
| Include code source and all dependencies and configurations | A running instance of an image  |
| Add environment variables, create directories, files, etc. | You can have multiple containers from one image |

#### Docker registeries:

A Storage and distribution system for Docker images

Inlcude official images for variours tools

DockerHub is a registery that docker images can stored there, and also there is a huge storage of official tool images.

#### Docker Images tag:

Every Docker Images has specified by a **tag** that seperate images with eachother.

The **latest** tag is most important tag for every images that is the last updated image on DockerHub.

#### Run your first container:

*You can find related commands in COMMANDS.sh*

1. pull `hello-world` image from DockerHub
2. run the image


> [!NOTE]
> After execute a container in detach mode, you can access logs by `docker logs {container}`
>
> For access container from our local, we have to use port binding

#### Port Binding:

- Application inside container runs in an **isolated Docker network**
- We need to expose the container port to the **host** (The machine the container runs on)

**Port Binding:** 
Bind the container's port to the host's port to make the service availabe to the outside world

Example:

```sh
docker run -d -p 80:80 nginx:latest
```

> [!NOTE]
> It is standard to use the same port on your host as container is using

#### Docker registry VS Docker repository

Docker registery is a service providing storage for hosting docker repositories.

Some Private Docker registries:
- Amazon Elastic Container Registery (ECR)
- Microsoft Azure
- Google Cloud
- DockerHub!

**Docker repositoty** is collection of related images with the same name but different version.

#### Building own docker image:

First, we need to create a **definition** of how to build an image from our application.

This Definition will store in a file named **Dockerfile**.

Structure of Dockerfile:

- Dockerfiles start from a parent image or "base image"
- It's a Docker image that our application based on
- **You choose the base image depending on which tools you need to have available**
- Dockerfile should start with a `FROM` to define the base image

| Dockerfile Command | Action |
| --- | --- |
| `FROM` | Define the base image to use |
| `RUN` | Will execute any command in a shell inside a container environment |
| `COPY` | Copy files or directories from <src\> to the container path <dest\>. While `RUN` **is executed in container**, `COPY` **is executed in host** |
| `WORKDIR` | Sets the working directory for all commands, like `cd` in bash |
| `CMD` | The instruction that is to be executed when a Docker container starts, **There can only be a one `CMD` instruction in a Dockerfile** |

> [!NOTE]
> Dockerfile use DSL (Domain Specific Language) and contains instruction for createing an image.
>
> Docker image is creating use a Dockerfile

##### Example of structure for a Nodejs application:

- Linux operation system
- Node and npm installed
- Copy application file from host into container
- Executing `npm install` to install dependencies

##### Dockerfile Example:

```Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package.json .
RUN npm install
COPY src/ .
CMD ["node", "server.js"]
```

> [!IMPORTANT]
> In this directory, there is a simple Nodejs application that you can build it using docker
>
> It's important to get correct path for Docker file, by default I imagined that your terminal is in this directory.

Create Image:

```sh
docker build -t first_node_app:1.0 .
```

Create Container:

```sh
docker run first_node_app:1.0
```

#### More about Docker architecture:

Docker use `client-server` architecture for control everything. The Docker client and Docker daemon can run in same system or they can connect with each other remotly using REST API or UNIX socket or a network. 

![Docker Architecture](./assets/images/Architecture-of-Docker.png)


#### Docker network:

> [!TIP]
> - [Source](https://www.geeksforgeeks.org/basics-of-docker-networking/)

Docker networking allows you to create a Network of Docker containers managed by a master node called the `manager`.
Containers inside a network can communicate with each other and share their informations by packets.

A network is a group of two or more devices that can communicate with each other either physically or virtually.
The Docker network is a virtual network created by docker to allow communication between docker containers. If two containers be on same network, they can communicate with each other without needs for port exposing on the host machine.

> [!NOTE]
> There are some types of network available in docker, and there are also others that can install by plugins.


## Docker Compose:

Imagine that you have an application that is made of different containers. All containers have to connect with eachother and also communicate with themselves. For doing this, Docker provide a service called `docker-compose`.
So, you have an application that made of containers and containers must : 
- They must be deployed and run together
- The services need to communicate

Docker compose is a tool that allow you to `define and run` `multiple services` and application in `one isolated environment`.

**Use Case:**

If you want to have multiple containers with multiple configuration, you can use `docker compose` to manage them easily.

**Configuration:**

- You use a single YAML file to configure and maintain your application services
- With a single command you create and also start all the services from your configuration

**What is YAML?**

> [!NOTE]
> YAML is a human-friendly data serialization language for all programming languages.

#### Write Docker compose:

1. For writing Docker compose you have to list your services that you want to run
2. The name you provide here is name of the container that will be create
3. Next, you have to write a base image for your container
4. After that, you can define a list of ports for binding (mostly you have just 1), The first port refers to the machine port and the second port refers to the port in container (Host:Container)
5. Next, You define a list for environment variables

> [!IMPORTANT]
> If your images have dependencies with each other, you can use **depends_on** for manage the dependencies


```yml
services:
  mysql:
    image: mysql:8.0-debian
    container_name: test_mysql
    restart: always
    ports:
      - 3307:3306
    environment:
      - MYSQL_ROOT_PASSWORD=Alimardani33
      - MYSQL_DATABASE=test_db
      - MYSQL_USER=amir
      - MYSQL_PASSWORD=Alimardani33
    volumes:
      - mysql_data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin:latest
    container_name: test_phpmyadmin
    restart: always
    ports:
      - 8080:80
    environment:
      PMA_HOST: mysql
      PMA_PORT: 3306
    depends_on:
      - "mysql"

volumes:
  mysql_data:
```

**Docker Compose Benefits:**

- Helps to structure your commands
- Simplifies container management
- Easier to make changes, and see current confirguration
- Declarative approach: defining the desired state
- Code that defines how your services should run
- Code can be versioned
- Easier collaboration

> [!NOTE]
> By default, Compose sets up a single network for your application

**Use Docker compose:**

```sh
docker compose -f docker-compose.yml up --build -d
```

#### Set environment varible in docker-compose.yml

> [!IMPORTANT]
> Do not use environment variables to pass important and sensitive information to the container, we should use **[secrets](https://docs.docker.com/compose/how-tos/use-secrets/)** instead.

There is 2 ways to set environment variables in docker-compose.yml

1. Use the `environment` attribute

You can set your environment variables in your container's environment with the `environment` attribute in `docker-compose.yml`

**It supports both list and mapping syntax:**

```yml
services:
  webapp:
    environment:
      DEBUG: "true"
```

**OR**

```yml
services:
  webapp:
    environment:
      - DEBUG=true
```

**Additional information:**

You can choose not to set a value and pass the environment variables from your shell straight through to your containers. It works in the same way as `docker run -e VARIABLE ...`:

```yml
web:
  environment:
    - DEBUG
```

The value of the `DEBUG` variable in the container is taken from the value for the same variable in the shell in which Compose is run. Note that in this case no warning is issued if the DEBUG variable in the shell environment is not set.

---

You can also take advantage of interpolation. In the following example, the result is similar to the one above but Compose gives you a warning if the DEBUG variable is not set in the shell environment or in an .env file in the project directory.

```yml
web:
  environment:
    - DEBUG=${DEBUG}
```

2. Use the `env_file` attribute:

A container's environment can also be set using `.env` file along with the `env_file` attribute.

```yml
services:
  webapp:
    env_file: "./.env"
```

**OR**

```yml
services:
  webapp:
    env_file: 
      - ./.env
```

The `env_file` attribute also let you use the same .env file for your project in docker-compose and also make it clear. Note that using `env_file` attribute you can pass multiple environment variable files.

The paths to your .env file, specified in the env_file attribute, are relative to the location of your compose.yml file.

**Additional Information:**

- If multiple files are specified, there are evaluated in order and can be override values set in previous file
- As docker compose version 2.24.0 you can set your `.env` file, defined by `env_file` attribute, to be optional by using the `required` field.
When the `required` is set to `false` and the `.env` file is missing, Compose silently ignores the entry.

```yml
env_file:
  - path: ./.env
    required: true # default
  - path: ./override.env
    required: false
```

Values in your `.env` file can be override from the command line using 

```sh
docker compose run -e
```

