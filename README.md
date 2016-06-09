## Ticket Monster UI

First we need to build the docker container:

```
docker build -t ticketmonster/ui:1.0 .
```

Can port forward to your local machine from vagrant like this:

> vagrant ssh -- -vnNTL *:8080:$DOCKER_HOST_IP:8080
