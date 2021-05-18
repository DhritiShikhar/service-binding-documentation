---
sidebar_position: 2
---

# Quick Start

In this section we are providing a sample application that one can deploy and just use to play around.

## Kubernetes

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

The Service Binding status should be updated:

```yaml
status:
  conditions:
  - lastHeartbeatTime: "2021-05-17T09:05:46Z"
    lastTransitionTime: "2021-05-17T07:09:48Z"
    status: "True"
    type: CollectionReady
  - lastHeartbeatTime: "2021-05-17T09:05:46Z"
    lastTransitionTime: "2021-05-17T07:09:48Z"
    status: "True"
    type: InjectionReady
  - lastHeartbeatTime: "2021-05-17T09:05:46Z"
    lastTransitionTime: "2021-05-17T07:09:48Z"
    status: "True"
    type: Ready
```

## OpenShift

_Here we provided a small sample on OpenShift_