## Ticket Monster UI

First we need to build the docker container.

## Vanilla Kubernetes
If you're running on vanilla Kubernetes (or some distro that doesn't do docker builds) then you need access to a docker Daemon. To build navigate into the `web` folder and run the docker build:

```
cd web
docker build -t ticketmonster/ui:2.0 .
```

If your kubernetes isntallation is not local, you'll need to tag and push the image to a docker registry that can be reached by your Kubernetes installation. Once you've pushed it to a docker registry, run like this:


```
kubectl run tm-ui --image=ticketmonster/ui:2.0
``` 

Now expose the UI as a Kuberentes Service:

```
kubectl expose rc tm-ui-1 --name ticket-monster --port 80
```

Lastly, you'll need to expose a Kubernetes Ingress route. See [the docs on Ingress Resources](http://kubernetes.io/docs/user-guide/ingress/) for more.

## Running on OpenShift 3.x
OpenShift makes a lot of this a lot easier for these reasons:

* we can do the docker build inside of openshift with BuildConfigs; we don't need access to a docker daemon
* openshift has an out of the box integrated docker registry; don't need to find one that's accessible to our Kubernetes installation


Let's try it. First we need to build the docker image. Navigate to `web` folder and ask openshif to do the build:

```
oc new-build --binary=true --name ticket-monster-ui
oc start-build ticket-monster-ui  --from-dir=.
```


Now, let's create the application and deploy it:

```
oc new-app ticket-monster-ui
oc deploy ticket-monster-ui
```

NOTE: the default security context constraints enforce certain assumptions about the Docker image for security reasons. At the moment, we cannot run as root out of the box inside the Docker image (and bind to port 80). To alleviate this for the purposes of this example, let's edit the `restricted` scc and allow to `RunAsAny` user:

```
export EDITOR=vim
oc edit scc restricted
```

Change the `runAsUser` section to match:

```
 runAsUser:
   type: RunAsAny
```
 


In OpenShift, we can expose this as a route (similar to Kubernetes Ingress). Here's an example:

```
oc expose svc ticket-monster-ui --hostname ticketmonster.vagrant.f8
```

Now we should be able to hit the service from the command line or the browser:



Additonal notes: Can port forward to your local machine from vagrant like this:

> vagrant ssh -- -vnNTL *:8080:$DOCKER_HOST_IP:8080
