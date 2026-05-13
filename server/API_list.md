# API List

## API health check.
```
curl /api/health
```

## user registeration
```
curl -X POST /api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "new.customer@example.com", "password": "SecurePassword123!"}'
  ```

## Login as admin
```
curl -X POST /api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"jrdevloper2003@gmail.com", "password":"A3JAbhijith"}'
```
## Reset password
```
curl -X POST /api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "your.registered.email@example.com"}'

*(Note: The link included in the email will redirect the user based on the "Site URL" and "Redirect URLs" you have configured in your Supabase Dashboard under Authentication -> URL Configuration.)*
```
## Add Product
```
curl -X POST /api/products/addproducts \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -F "name=Monochrome Trench" \
  -F "description=Detailed description here" \
  -F "price=85.00" \
  -F "retail_price=45.00" \
  -F "max_selling_price=120.00" \
  -F "stock=50" \
  -F "status=Active" \
  -F "category=outerwear" \
  -F "tags=[\"Minimalist\", \"Autumn 24\"]" \
  -F "main_image=@/path/to/main_image.jpg" \
  -F "sub_images=@/path/to/sub1.jpg" \
  -F "sub_images=@/path/to/sub2.jpg"
  ```
## Show Product
```
curl /api/products
```
## show single product
```
curl -X GET /api/products/YOUR_PRODUCT_ID_HERE

Because it is a public GET route, you can also paste `/api/products/YOUR_PRODUCT_ID_HERE` directly into your web browser to see the product details!
```


## Add to cart
```
curl -X POST /api/cart/add \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"productId": "a0c01d06-812f-4136-8c8a-47af29b27f84", "quantity": 1}'

If you run it twice, it will automatically update the quantity to 2 instead of creating a duplicate row!
```

## Show Cart

```
curl -X GET /api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Update Cart
```
curl -X PUT /api/cart/update \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"productId": "YOUR_PRODUCT_ID_HERE", "quantity": 2}'
```

## Delete Cart
```
curl -X DELETE /api/cart/remove/YOUR_PRODUCT_ID_HERE \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Checkout

