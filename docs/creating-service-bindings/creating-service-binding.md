---
sidebar_position: 1
---

# Creating Service Binding

In this section, we consider that the service you want to connect to is already exposing binding metadata by either:
- Beeing part of the "known" services
- Exposing binding-metadatas by default
If it's not the case, please refer to the following section(#)


### Import an application

- Navigate to the `+Add` page on the menu
- Click on the `From Git` button
- Fill the form with the following information:
>Project = service-binding-demo
>
>Git Repo URL = https://github.com/pmacik/nodejs-rest-http-crud
>
> Builder Image = Node.js
>
> Application Name = nodejs-app
>
> Name = nodejs-app
>
>Select the resource type to generate = Deployment
>
>Create a route to the application = checked

### Create a service instance
```yaml
kubectl apply -f - << EOD
---
apiVersion: postgresql.baiju.dev/v1alpha1
kind: Database
metadata:
  name: db-demo
  namespace: service-binding-demo
spec:
  image: docker.io/postgres
  imageName: postgres
  dbName: db-demo
EOD
```

### Create Service Binding

```yaml
apiVersion: binding.operators.coreos.com/v1alpha1
kind: ServiceBinding
metadata:
  name: binding-request 
  namespace: service-binding-demo
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

Service Binding Operator injects the service credentials as files in the application under `/bindings` directory.