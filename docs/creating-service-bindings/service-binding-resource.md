---
sidebar_position: 6
---

# Service Binding Resource

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


| Property | Type | Description |
| -------- | ---- | ----------- |
| .apiVersion | string | APIVersion defines the versioned schema of this representation of an object |
| .kind | string | Kind is a string value representing the REST resource this object represents |
| .metadata.name | string | Name is primarily intended for creation idempotence and configuration definition. It cannot be updated. It must be unique within a namespace |
| .metadata.namespace | string | Namespace of the resource |
| .spec | object | Spec describes the application and services |
| .status | object | Current status of the service binding |

## Service Binding Spec

| Property | Type | Description |
| -------- | ---- | ----------- |
| .spec.application | array (string) | It is used to uniquely identify an application resource |
| .spec.application.group | string | It is the API group of the application resource |
| .spec.application.version | string | It is the API group version of the application resource |
| .spec.application.resource | string | It is the type of the application resource. It can be collected from `.kind` field of the application resource |
| .spec.application.name | string | It is the unique name of the application. It can be collected from `.metadata.name` field of the application object |
| .spec.service | array (string) | It is used to uniquely identify a service resource |
| .spec.service.group | string | It is the API group of the service resource |
| .spec.service.version | string | It is the API group version of the application resource |
| .spec.service.resource | string | It is the type of the service resource. It can be collected from `.kind` field of the service resource |
| .spec.service.name | string | It is the unique name of the service. It can be collected from `.metadata.name` field of the service object |

## Service Binding Status

`.status` describes current state of binding provided by the operator. The operator continually and actively manages every object's actual state to match the desired state.

| Property | Type | Description |
| -------- | ---- | ----------- |
| .applications | string | It describes each bound application resource |
| .conditions | string | It represents the latest available observations of Service Binding's state |
| .secret | string | represents the name of the binding secret created by the Service Binding Operator |

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

| Condition | Description |
| -------- | ----------- |
| CollectionReady | It represents collection of secrets from the service. On failure of collecting secrets from the service, the `conditions.status` becomes "False" with a reason.
 |
| InjectionReady | It represents injection of secret into the application. On failure to inject information into the service, the `conditions.status` becomes "False" with a reason. |
| Ready | It represents overall ready status. On failure, the `conditions.status` becomes "False" with a reason. |

Conditions can have the following combination of type, status and reason:

| Type            | Status | Reason               | Type           | Status | Reason                   | Type           | Status | Reason                    |
| --------------- | ------ | -------------------- | -------------- | ------ | ------------------------ |----------------|--------|---------------------------|
| CollectionReady | False  | EmptyServiceSelector | InjectionReady | False  |                          | Ready          | False  | EmptyServiceSelector      |
| CollectionReady | False  | ServiceNotFound      | InjectionReady | False  |                          | Ready          | False  | ServiceNotFound           |
| CollectionReady | True   |                      | InjectionReady | False  | EmptyApplicationSelector | Ready          | True   | EmptyApplicationSelector  |
| CollectionReady | True   |                      | InjectionReady | False  | ApplicationNotFound      | Ready          | False  | ApplicationNotFound       |
| CollectionReady | True   |                      | InjectionReady | True   |                          | Ready          | True   |                           |

## Advanced Options

| Property | Type | Description |
| -------- | ---- | ----------- |
| .spec.bindAsFiles | bool | When set as `false` enables injecting gathered bindings as env variables into the application/workload |
| .spec.detectBindingResource | bool | The operator binds all information from dependent resources (secrets, configMaps, services) owned by backingService CR |
| .spec.mounthPath | string | It is used to specify a custom binding root path |
| .spec.mappings | array (object) | It is used to set customized binding secrets using a combination of Go and jsonpath templating |
| .spec.namingStrategy | string | It is used to define injected environment variable key or file name |