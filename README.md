# maka_test

1. after downloading from git
2. npm i
3. meteor run

4. Login by Rest API
```
curl http://localhost:3000/api/login/ -d "email=admin@admin.com&password=1234"
```

5. Check return auth token

```
{
    "authToken": "Your authToken",
    "userId": "Your userId",
    "when": "2021-07-16T15:47:49.084Z"
}
```

6. Logout by Rest API


```
curl http://localhost:3000/api/logout -X POST -H 'X-Auth-Token: Your AuthToken'
```