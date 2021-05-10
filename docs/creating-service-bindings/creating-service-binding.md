---
sidebar_position: 1
---

# Creating Service Binding

In this section, we consider that the service you want to connect to is already exposing binding metadata by either:
- Being part of the "known" services
- Exposing binding-metadatas by default
If it's not the case, please refer to the following section(#)


### Service Binding Resource

```yaml
apiVersion: binding.operators.coreos.com/v1alpha1
kind: ServiceBinding

metadata:
  name: binding-request 

spec:

  application:
    name: nodejs-app
    group: apps
    version: v1
    resource: deployments

  services:
  - group: postgresql.baiju.dev
    version: v1alpha1
    kind: Database
    name: db-demo
```

There are 2 parts in the request:
- application
- services

### Application

An application can be referenced either by name or by labels.

#### Reference by Name

```
  application:
    name: nodejs-app
    group: apps
    version: v1
    resource: deployments
```

#### Reference by Label Selector

```
  application:
    matchLabels:
      app: frontend
    group: apps
    version: v1
    resource: deployments
```

### Status

Status of Service Binding on success:

```
status:
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
- Conditions represent the latest available observations of Service Binding's state
- Secret represents the name of the secret created by the Service Binding Operator

Conditions have two types `CollectionReady` and `InjectionReady`:
- CollectionReady type represents collection of secret from the service
- InjectionReady type represents injection of secret into the application

By default, Service Binding Operator injects the service credentials as files in the application under `/bindings` directory.