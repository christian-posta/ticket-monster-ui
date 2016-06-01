## Ticket Monster UI

To run with docker:

```
mvn -Pf8-build
docker run -it --rm -p 8080:8080 fabric8/ticket-monster-ui:1.0-SNAPSHOT
```

Can port forward to your local machine from vagrant like this:

> vagrant ssh -- -vnNTL *:8080:$DOCKER_HOST_IP:8080
