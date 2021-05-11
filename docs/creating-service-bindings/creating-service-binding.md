---
sidebar_position: 1
---

# Creating Service Binding

In this section, we consider that the service you want to connect to is already exposing binding metadata by either:
- Being part of the "known" services
- Exposing binding-metadatas by default
If it's not the case, please refer to the following section(#)


### Service Binding Resource

Service Binding resources use `binding.operators.coreos.com` group with  `v1alpha1` version and `ServiceBinding` kind.

A sample Service Binding Resource that connects a nodejs application to a postgresql database:


```yaml
apiVersion: binding.operators.coreos.com/v1alpha1
kind: ServiceBinding

metadata:
  name: binding-request 

spec:

  application:
    name: nodejs-rest-http-crud
    group: apps
    version: v1
    resource: deployments

  services:
  - group: postgresql.dev
    version: v1alpha1
    kind: Database
    name: db-demo
```

The `spec` of a Service Binding resource has two sections:
- application
- services

### Application

An application is a process running within a container. Examples include a NodeJS Express application, a Ruby Rails application or a Spring Boot application.

A sample NodeJS application:

```yaml
kubectl apply -f - << EOD
---
apiVersion: apps/v1 
kind: Deployment    

metadata:
  name: nodejs-rest-http-crud
  labels:
    app: nodejs-rest-http-crud
    runtime: nodejs
    runtime-version: 14-ubi7

spec:
  selector:
    matchLabels:
      app: nodejs-rest-http-crud
  replicas: 1
  template:
    metadata:
      labels:
        app: nodejs-rest-http-crud
        deploymentconfig: nodejs-rest-http-crud
    spec:
      containers:
      - name: nodejs-rest-http-crud
        image: nodejs-rest-http-crud:latest
        ports:
        - containerPort: 8080
          protocol: TCP
EOD
```

An application can be referenced either by name or by labels. It is recommended to use either name or label but not both of them together.

#### Reference by Name

Name can be used to select a single resource.

```yaml
  application:
    name: nodejs-app
    group: apps
    version: v1
    resource: deployments
```

#### Reference by Label Selector

Labels can be used to select a collection of resources.

```yaml
  application:
    matchLabels:
      component: frontend
      release: canary
    group: apps
    version: v1
    resource: deployments
```

In the case of multiple labels, all must be satisfied in a logical AND (&&) operator.

```yaml
  application:
    matchLabels:
      component: frontend
      release: canary
    matchLabels:
      version: "5.2.10"
    group: apps
    version: v1
    resource: deployments
```

### Service

One or more services can be bound with application.

```yaml
  services:
  - group: postgresql.dev
    version: v1alpha1
    kind: Database
    name: db-demo

  - group: mongodb.dev
    version: v1beta1
    kind: Database
    name: mongodb

  - group: kafka.dev
    version: v1
    kind: Kafka
    name: kafka-demo
```

### Status

Status of Service Binding on success:

```yaml
status:
  applications:
  - name: nodejs-app
    group: apps
    version: v1
    resource: deployments
  conditions:
  - lastHeartbeatTime: "2020-10-15T13:23:36Z"
    lastTransitionTime: "2020-10-15T13:23:23Z"
    status: "True"
    type: CollectionReady
  - lastHeartbeatTime: "2020-10-15T13:23:36Z"
    lastTransitionTime: "2020-10-15T13:23:23Z"
    status: "True"
    type: InjectionReady
  secret: binding-request-72ddc0c540ab3a290e138726940591debf14c581
```
where:
- applications returns each matching application resource
- Conditions represent the latest available observations of Service Binding's state
- Secret represents the name of the secret created by the Service Binding Operator

Conditions have two types `CollectionReady` and `InjectionReady`:
- CollectionReady type represents collection of secret from the service
- InjectionReady type represents injection of secret into the application

By default, Service Binding Operator injects the service credentials as files in the application under `/bindings` directory.