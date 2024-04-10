# complexapi  

Simple Node API to help with the design of more complex patterns

## Default Routes  

The default routes available are:

| Route | Details |  
|-------|---------|  
| `/` | Simple response with local parameters. |  
| `/status` | Expanded response including environment variables and a ping (`/`) of upstream URL(s). |  
| `/test` | Same as `/status` but invokes a recursive test upstream URL(s) on _their_ `/test` route . |  

## Routes When `NODE_BASE` Is Set  

The default routes available are:

| Route | Details |  
|-------|---------|  
| `/` | Simple response with local parameters. |  
| `/%NODE_BASE%` | Simple response with local parameters. |  
| `/%NODE_BASE%/status` | Expanded response including environment variables and a ping (`/`) of upstream URL(s). |  
| `/%NODE_BASE%/test` | Same as `/status` but invokes a recursive test upstream URL(s) on _their_ `/test` route . |  

## Upstream Prefix URLs  

You are able to add as many upstream URLs as you like by setting the `UPSTREAM_*` environment variables prefix.  Some examples are:

| Variable | Value | Description |
|----------|-------|-------------|
| `UPSTREAM_A` | `localhost:3001` | Call to the default route. |
| `UPSTREAM_COOLROUTE` | `mycontainer:8080/public` | Call to a container using a base route. |

## Variables  

The following environment variables are available:

| Variable     | Default | Description |
|--------------|---------|-------------|
| `NODE_ALIAS` |         | Optional alias used for logging clarity. |
| `NODE_BASE`  | `/`     | Optional base route for the API. |
| `NODE_PORT`  | `3000`  | Port the API listens to. |

## Examples  

The source code from Git contains three example scenarios.

### A : Parent-Child Example  

The first is a very simple example that uses two instances; one parent and one child.

#### Executing the example

```bash
git clone https://github.com/FredLackey/complexapi.git
cd ./complexapi/examples/a-single
docker compose up
```  

#### Docker Compose File

```yaml
services:

  SINGLE_SERVICE:
    image: fredlackey/complexapi:0.0.2
    container_name: complexapi-single
    ports:
      - "3000:3000"
    networks:
      - complexapi-network

networks:
  complexapi-network:
    driver: bridge
```

#### Output

Output from a GET call to `http://localhost:3000/test`.  Note the calls to the the upstream service using its alias as the output payload:

```json
{
  "name": "complex-api-example",
  "alias": "PUBLIC",
  "base": "(not set)",
  "desc": "Complex API Example",
  "env": "production",
  "ver": "0.0.2",
  "date": "2024-04-10T11:12:45.194Z",
  "vars": {
    "HOME": "/home/node",
    "HOSTNAME": "ce213a5df633",
    "NODE_ALIAS": "PUBLIC",
    "NODE_ENV": "production",
    "NODE_VERSION": "18.19.1",
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "PWD": "/home/node/app",
    "YARN_VERSION": "1.22.19"
  }
}

```json
{
  "name": "complex-api-example",
  "alias": "PUBLIC",
  "base": "(not set)",
  "desc": "Complex API Example",
  "env": "production",
  "ver": "0.0.2",
  "date": "2024-04-10T11:12:45.194Z",
  "vars": {
    "HOME": "/home/node",
    "HOSTNAME": "ce213a5df633",
    "NODE_ALIAS": "PUBLIC",
    "NODE_ENV": "production",
    "NODE_VERSION": "18.19.1",
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "PWD": "/home/node/app",
    "UPSTREAM_PRIVATE": "complexapi-private:3000",
    "YARN_VERSION": "1.22.19"
  },
  "tests": {
    "PRIVATE": {
      "name": "complex-api-example",
      "alias": "PRIVATE",
      "base": "(not set)",
      "desc": "Complex API Example",
      "env": "production",
      "ver": "0.0.2",
      "date": "2024-04-10T11:12:45.235Z"
    }
  }
}
```