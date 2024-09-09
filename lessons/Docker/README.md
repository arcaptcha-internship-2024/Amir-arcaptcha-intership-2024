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

Docker use `client-server` architecture for control everything. The Docker client and Docker daemon can run in same system or they can connect with eachother remotly using REST API or UNIX socket or a network. 

![Docker Architecture](./assets/images/Architecture-of-Docker.png)