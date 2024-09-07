# Docker 

> [!NOTE]
> You can find the source of this file in link below:
> [Video Source](https://youtu.be/pg19Z8LL06w?si=-ANu7g9AfZ2A6ONE)

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
