# API List

## API health check.
```
curl http://localhost:10000/api/health
```

## Login as admin
```
curl -X POST http://localhost:10000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"jrdevloper2003@gmail.com", "password":"A3JAbhijith"}'
```
## Add Product
```
 curl -X POST http://localhost:10000/api/products/addproducts \
  -H "Authorization: Bearer <ACESS_TOKEN> " \
  -F "name=Monochrome Vase" \
  -F "price=120.00" \
  -F "stock=15" \
  -F "status=Active" \
  -F "image=@<IMAGE_PATH>"
  ```