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

A sample Service Binding resource that connects a nodejs application to a postgresql database:


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

Create a NodeJS application:

```yaml
kubectl apply -f - << EOD
---
apiVersion: apps/v1 ############################### GROUP/VERSION
kind: Deployment    ############################### RESOURCE

metadata:
  name: nodejs-rest-http-crud  #################### NAME
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

Application can be a podSpec based resource like "Deployment" or "DeploymentConfig" or a non podSepc based resource like a Custom Resource Definition.

### Service

Apply the following CatalogSource:

```yaml
kubectl apply -f - << EOD
---
apiVersion: operators.coreos.com/v1alpha1
kind: CatalogSource
metadata:
    name: sample-db-operators
    namespace: openshift-marketplace
spec:
    sourceType: grpc
    image: quay.io/redhat-developer/sample-db-operators-olm:v1
    displayName: Sample DB Operators
EOD
```

Then navigate to the `Operators` -> `OperatorHub` in the OpenShift console and in the `Database` category select the `PostgreSQL Database operator` and install a beta version.

Create a postgresql database:

```yaml
kubectl apply -f - << EOD
---
apiVersion: postgresql.baiju.dev/v1alpha1 ########### GROUP/VERSION
kind: Database ###################################### RESOURCE
metadata:
  name: db-demo ##################################### NAME
  namespace: service-binding-demo
spec:
  image: docker.io/postgres
  imageName: postgres
  dbName: db-demo
EOD
```

### Service Binding

To connect the `nodejs-rest-http-crud` Deployment with `db-demo` Database,
create a `ServiceBinding` custom resource which includes both Deployment and Database metadata:
- Group 
- Version 
- Resource 
- Name

```yaml
apiVersion: binding.operators.coreos.com/v1alpha1
kind: ServiceBinding

metadata:
  name: binding-request 

spec:

  application:
    group: apps 
    version: v1
    resource: deployments
    name: nodejs-app

  service:
   group: postgresql.baiju.dev
   version: v1alpha1
   resource: Database
   name: db-demo
```

### Status

The `status` describes the current state of the `ServiceBinding` object. The operator continually and actively manages every object's actual state to match the desired state you supplied.

Service Binding Operator Status has three parts:
- `applications` return each matching application resource
- `conditions` represent the latest available observations of Service Binding's state
- `secret` represents the name of the secret created by the Service Binding Operator

A sample service binding status:

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
  - lastHeartbeatTime: "2020-10-15T13:23:36Z"
    lastTransitionTime: "2020-10-15T13:23:23Z"
    status: "True"
    type: Ready
  secret: binding-request-72ddc0c540ab3a290e138726940591debf14c581
```

#### Conditions

Service Binding Status Conditions have three types:

- `CollectionReady` type represents collection of secrets from the service. On failure of collecting secrets from the service, the `conditions.status` becomes "False" with a reason.

- `InjectionReady` type represents injection of secret into the application. On failure to inject information into the service, the `conditions.status` becomes "False" with a reason.

- Ready type represents overall ready status. On failure, the `conditions.status` becomes "False" with a reason.

Conditions can have the following combination of type, status and reason:

| Type            | Status | Reason               | Type           | Status | Reason                   | Type           | Status | Reason                    |
| --------------- | ------ | -------------------- | -------------- | ------ | ------------------------ |----------------|--------|---------------------------|
| CollectionReady | False  | EmptyServiceSelector | InjectionReady | False  |                          | Ready          | False  | EmptyServiceSelector      |
| CollectionReady | False  | ServiceNotFound      | InjectionReady | False  |                          | Ready          | False  | ServiceNotFound           |
| CollectionReady | True   |                      | InjectionReady | False  | EmptyApplicationSelector | Ready          | True   | EmptyApplicationSelector  |
| CollectionReady | True   |                      | InjectionReady | False  | ApplicationNotFound      | Ready          | False  | ApplicationNotFound       |
| CollectionReady | True   |                      | InjectionReady | True   |                          | Ready          | True   |                           |