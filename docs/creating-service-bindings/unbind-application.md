---
sidebar_position: 5
---

# Unbind Application

To unbind an application from a service, delete the `ServiceBinding` custom resource linked to it using the `kubectl` or `oc` command line tool:

```console
kubectl delete ServiceBinding <.metadata.name>
```
OR

```
oc delete ServiceBinding <.metadata.name>
```

where  `<.metadata.name>` is the name of the `ServiceBinding` resource.

Examples:

```
kubectl delete ServiceBinding binding-request
```

```
oc delete ServiceBinding binding-request
```