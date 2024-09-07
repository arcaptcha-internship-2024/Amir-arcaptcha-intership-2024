# Docker Commands:

```sh
docker images
```

List All container images

---

```sh
docker ps
```

List all running containers

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

