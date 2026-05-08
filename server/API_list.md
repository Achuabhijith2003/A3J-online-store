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
## Show Product
```
curl http://localhost:10000/api/products
```
## show single product
```
curl -X GET http://localhost:10000/api/products/YOUR_PRODUCT_ID_HERE

Because it is a public GET route, you can also paste `http://localhost:10000/api/products/YOUR_PRODUCT_ID_HERE` directly into your web browser to see the product details!
```


## Add to cart
```
curl -X POST http://localhost:10000/api/cart/add \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"productId": "a0c01d06-812f-4136-8c8a-47af29b27f84", "quantity": 1}'

If you run it twice, it will automatically update the quantity to 2 instead of creating a duplicate row!
```

## Show Cart

```
curl -X GET http://localhost:10000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Update Cart
```
curl -X PUT http://localhost:10000/api/cart/update \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"productId": "YOUR_PRODUCT_ID_HERE", "quantity": 2}'
```

## Delete Cart
```
curl -X DELETE http://localhost:10000/api/cart/remove/YOUR_PRODUCT_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Checkout




curl -X POST http://localhost:10000/api/products/addproducts \
  -H "Authorization: Bearer eyJhbGciOiJFUzI1NiIsImtpZCI6IjAxNGI2ZDIwLTZhYjYtNDQ2MS1hMzM5LThjN2Q4NGRmYjNkMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3dqanhwbmpjcnZmdmlnb2tscml0LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI1YjYwMzExYi0xNWQ2LTQ3MDktOWI4ZS1jNjM0ZTM1ZDkzYmYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzc4MjM4NDg3LCJpYXQiOjE3NzgyMzQ4ODcsImVtYWlsIjoianJkZXZsb3BlcjIwMDNAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbF92ZXJpZmllZCI6dHJ1ZX0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3NzgyMzQ4ODd9XSwic2Vzc2lvbl9pZCI6ImQxOWU0MDVjLWZhN2UtNDA1NS05ZTMwLTNlOWI5MWZhMmUzOCIsImlzX2Fub255bW91cyI6ZmFsc2V9.f3n3c6LdiTw9V1tC7t0IDBUG2MJ1SJVTw5UTPVW9rsX0dMoPOJUU-OcA0GTkAFtttcIvdXMEsC5Jo-LE2_GWjw " \
  -F "name=whd " \
  -F "price=120.00" \
  -F "stock=15" \
  -F "status=Active" \
  -F "image=@E:/A3J-online-store/test/data/Screenshot 2026-04-22 203734.png"