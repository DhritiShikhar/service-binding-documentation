---
sidebar_position: 1
---

# Creating Service Binding

In this section, we consider that the service you want to connect to is already exposing binding metadata by either:
- Being part of the "known" services
- Exposing binding-metadatas by default
If it's not the case, please refer to the following section(#)


## Service Binding Resource

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
`.apiVersion` is a combination of API group and version in the format `<group>/<version>`. To create a service binding, `binding.operators.coreos.com` group and `v1alpha1` version is used. 

`.kind` is the type of the kubernetes resource. To create a service binding, `ServiceBinding` kind is used.

`.metadata.name` specifies a unique name for `ServiceBinding` object within a namespace.

## Spec

`.spec` describes desired state of binding provided by the user.

`.spec.application` is used to uniquely identify an application resource

  - `.spec.application.group`: It is the API group of the application resource. It can be collected from the `group` part of the `apiVersion` field of the application object. Example: If the `apiVersion` field of the application object is `apps/v1`, `apps` is the API group of the resource. 
  
  - `.spec.application.version`: It is the API group version of the application resource. It can be collected from the `version` part of the `apiVersion` field of the application object. Example: If the `apiVersion` field of the application object is `apps/v1`, `v1` is the API group version of the resource. 

  - `.spec.application.resource`: It is the type of the application resource. It can be collected from `.kind` field of the application resource.
  
  - `.spec.application.name`: It is the unique name of the application. It can be collected from `.metadata.name` field of the application object.

`.spec.service` is used to uniquely identify a service resource

  - `.spec.service.group`: It is the API group of the service resource. It can be collected from the `group` part of the `apiVersion` field of the service object. Example: If the `apiVersion` field of the service object is `apps/v1`, `apps` is the API group of the resource. 

  - `.spec.service.version`: It is the API group version of the service resource. It can be collected from the `version` part of the `apiVersion` field of the service object. Example: If the `apiVersion` field of the service object is `apps/v1`, `v1` is the API group version of the resource. 

  - `.spec.service.resource`: It is the type of the service resource. It can be collected from `.kind` field of the service resource.
  
  - `.spec.service.name`: It is the unique name of the service. It can be collected from `.metadata.name` field of the service object.


## Status

`.status` describes current state of binding provided by the operator. The operator continually and actively manages every object's actual state to match the desired state.

Service Binding Status has three parts:
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

### Conditions

Service Binding Status Conditions have three types:

- `CollectionReady` type represents collection of secrets from the service. On failure of collecting secrets from the service, the `conditions.status` becomes "False" with a reason.

- `InjectionReady` type represents injection of secret into the application. On failure to inject information into the service, the `conditions.status` becomes "False" with a reason.

- `Ready` type represents overall ready status. On failure, the `conditions.status` becomes "False" with a reason.

Conditions can have the following combination of type, status and reason:

| Type            | Status | Reason               | Type           | Status | Reason                   | Type           | Status | Reason                    |
| --------------- | ------ | -------------------- | -------------- | ------ | ------------------------ |----------------|--------|---------------------------|
| CollectionReady | False  | EmptyServiceSelector | InjectionReady | False  |                          | Ready          | False  | EmptyServiceSelector      |
| CollectionReady | False  | ServiceNotFound      | InjectionReady | False  |                          | Ready          | False  | ServiceNotFound           |
| CollectionReady | True   |                      | InjectionReady | False  | EmptyApplicationSelector | Ready          | True   | EmptyApplicationSelector  |
| CollectionReady | True   |                      | InjectionReady | False  | ApplicationNotFound      | Ready          | False  | ApplicationNotFound       |
| CollectionReady | True   |                      | InjectionReady | True   |                          | Ready          | True   |                           |