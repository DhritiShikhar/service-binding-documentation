---
sidebar_position: 6
---

# Service Binding Resource

Service Binding resources use `binding.operators.coreos.com` group with  `v1alpha1` version and `ServiceBinding` kind. Read more about the required fields [here](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/#required-fields).

A sample Service Binding resource that connects a nodejs application to a postgresql database:


```yaml
apiVersion: binding.operators.coreos.com/v1alpha1
kind: ServiceBinding

metadata:
  name: database-binding 

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

## Service Binding Spec

`.spec` describes the desired state of binding provided by the user.

| Property                    | Type | Description |
| --------------------------- | ---- | ----------- |
| .spec.application           | object | It is used to uniquely identify an application using Name, Group, Version and Resource |
| .spec.service               | array (object) | It is used to uniquely identify a service using Name, Group, Version and Kind |

Read more details on Group, Version and Kinds [here](https://book.kubebuilder.io/cronjob-tutorial/gvks.html).

## Service Binding Status

`.status` describes current state of binding provided by the operator. The operator continually and actively manages every object's actual state to match the desired state.

| Property | Type | Description |
| -------- | ---- | ----------- |
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
| CollectionReady | It Indicates if binding data are collected from the referred service. On failure the `condition.status` is set to "False" and `condition.reason` provides more details.
 |
| InjectionReady | It indicates if binding data are injected into application. On failure, the `condition.status` is set to "False" and `condition.reason` provides more details. |
| Ready | It indicates if binding is successful. On failure, the `condition.status` is set to "False" and `condition.reason` provides more details. |

## Bind as files or environment variables

Service Binding Operator provides the ability to inject bindings as files or environment variables. By default, `bindAsFiles` is set to "True" and bindings are injected as files in the location '/bindings'.

| Property | Type | Description |
| -------- | ---- | ----------- |
| .spec.bindAsFiles | bool | When set as "False" enables injecting gathered bindings as env variables into the application/workload |

To modify the default location of the bindings, `mountPath` can be set.

| Property | Type | Description |
| -------- | ---- | ----------- |
| .spec.mounthPath | string | It is used to specify a custom binding root path |

## Auto detect binding

In a scenario, when annotations are not provided by the service provider, `detectBindingResource` can be used. 

| Property | Type | Description |
| -------- | ---- | ----------- |
| .spec.detectBindingResource | bool | The operator binds all information from dependent resources (secrets, configMaps, services) owned by backingService CR |

By default, `detectBindingResource` is set to "False".