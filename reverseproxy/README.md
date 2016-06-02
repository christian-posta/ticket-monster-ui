## reverseproxy

This proxy helps us keep friendly URLs even when there are composite UIs or composite microservice REST apis
It also helps us avoid tripping the browser Same Origin policy

Build the docker container:

> docker build -t ticketmonster/proxy:1.0 .

Run in kubernetes

> kubectl run proxy --image=ticketmonster/proxy:1.0 --port=80
