# Docker Commands:

```sh
docker images
```

List All container images

---

```sh
docker ps
```

List all **running** containers

**Parameters:**

| Parameter | Action |
| --- | --- |
| -a, --all | Show all containers (default shows just running) |

---

```sh
docker pull {name}:{tag}
```

Pull Image from Registery, Default set to **DockerHub**.

---

```sh
docker run {name}:{tag}
```

Create a container from given image and start it. If image not founded locally, it will pull it from DockerHub and then run it.

**Parameters:**

| Parameter | Action |
| --- | --- |
| -d, --deatch | Run container in background and print container ID |
| -p, --publish list | Publish a container's port(s) to the host |
| --name string | Assign a name to the container |


> [!IMPORTANT]
> `docker run` always create a new container and doesn't re-use previous container

---

```sh
docker logs {container}
```

View Logs from service running inside the container. (Which are present at the time of execution).
You have to give the **container name** or **container ID** as a *{container}* parameter.

**Parameters:**

| Parameter | Action |
| --- | --- |
| -f, --follow | Follow log output: by default it will show the logs until the command execution and free the terminal, but by this flag, it will continue to show logs |

---

```sh
docker stop {container}
```

Stop one or more running containers

---

```sh
docker rm {container}
```

Remove one or more containers

---

```sh
docker start {container}
```

Start one or more running container

---

```sh
docker build -t {name}:{tag} {Dockerfile_path}
```
Build image from a **Dockerfile**

**Parameters:**

| Parameter | Action |
| --- | --- |
| -t, --tag stringArray | Name and optionally a tag (format:  "name:tag") |

---

```sh
docker image rm {image}
```
Remove one or more images

Aliases:
docker image rm, docker image remove, docker rmi

---