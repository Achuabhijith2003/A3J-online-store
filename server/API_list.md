# API List

## API health check.
```
curl http://localhost:10000/api/health
```

## login as admin
```
curl -X POST http://localhost:10000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"jrdevloper2003@gmail.com", "password":"A3JAbhijith"}'
```

