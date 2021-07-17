# Case Labeling App

This monorepo project contains two packages:
 
1. [web-app]: <code>case-labeling-app</code>
2. [server]: <code>case-labeling-service</code>
   - API documentation available at `GET /docs`
   - Health endpoint available at `GET /health`
   - Postman example collection available [here](https://gitlab.com/marcosoliveira91/case-labeling/-/wikis/Postman-Collection)

<br/>
The files <code>deployments/local/environment</code> and <code>packages/case-labeling-app/.env.local</code> are already set with local environment variables needed.
<br/><br/>

There's also a mock user already created. Credentials will be needed for authenticated routes.
```
name: Dr.Strangelove
email: strange.love@mail.com
password: Dummy123
```

<br />
You'll just need to follow this instructions to run it locally.
<br/>


```
npm ci
npm run build
```

and then to run each app:

```
npm run start:server
```
```
npm run start:webapp
```
