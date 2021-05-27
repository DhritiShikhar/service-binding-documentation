---
sidebar_position: 1
---

# Template

## Where the binding is getting injected

1. Verify that application is running:

```
➜  ~ kubectl get pods
NAME                                     READY     STATUS      RESTARTS   AGE
nodejs-rest-http-crud-56d679c5cd-5hn2z   1/1       Running     0          3m19s
```

2. Check the environment variables injected in the pod using the command `kubectl exec -it <application-pod-name> -- printenv`

Example:
```
kubectl exec -it nodejs-rest-http-crud-56d679c5cd-5hn2z -- printenv
MONGODB_BINDING_USERNAME=admin
MONGODB_BINDING_PASSWORD=password
```

## How to use injected binding in the application

```js
const basicAuthUsername = 'MONGODB_BINDING_USERNAME'
const basicAuthPassword = 'MONGODB_BINDING_PASSWORD'

module.exports = {
  basicAuth: {
    username: getEnv(basicAuthUsername) || 'admin',
    password: getEnv(basicAuthPassword) || 'pass',
  },
}

function getEnv(envVariable) {
  const origVar = process.env[envVariable];
  if (EnvVar) {
    const file = getEnv(fileVar);
    if (file) {
      return file.toString().split(/\r?\n/)[0].trim();
    }
  }
  return origVar;
}

```