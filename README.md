## Ticket Monster UI

First we need to build the docker container:

```
cd web
docker build -t ticketmonster/ui:2.0 .
```

Run with kubernetes

```
kubectl run tm-ui --image=ticketmonster/ui:2.0
``` 

Now expose the UI as a Kuberentes Service:

```
kubectl expose rc tm-ui-1 --name ticket-monster --port 80
```

In OpenShift, we can expose this as a route (similar to Kubernetes Ingress). Here's an example:

```
oc expose svc ticket-monster --hostname ticketmonster.vagrant.f8
```

Now we should be able to hit the service from the command line or the browser:



Can port forward to your local machine from vagrant like this:

> vagrant ssh -- -vnNTL *:8080:$DOCKER_HOST_IP:8080
