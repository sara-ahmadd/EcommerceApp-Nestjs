<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

# 🛒 Ecommerce App

## 📌 Introduction

This is a full-featured **E-commerce backend API** built using **NestJS**. It provides a robust and scalable foundation for an online store, supporting essential functionalities such as:

- **User authentication & role-based access control** (Admin, Vendor, Customer)
- **Product catalog management** including categories, subcategories, and brands
- **Cart system** with product quantity adjustments
- **Order processing** with multiple payment methods
- **Coupon system** for discounts and promotions
- **Email verification**, password reset, and OTP-based security flows via **NodeMailer**
- **Image and file uploads** handled via **Cloudinary**
- **Real-time communication** for updates or notifications using **Socket.IO**
- **Secure and seamless payments** via **Stripe**
- **MongoDB-based data persistence** using **Mongoose**

This API is structured to support clean architecture principles and can easily integrate with frontend applications or mobile apps.

## 🚀 Tech Stack

| Technology | Purpose                             |
| ---------- | ----------------------------------- |
| NestJS     | Node.js framework for building APIs |
| MongoDB    | NoSQL database for storing data     |
| Mongoose   | ODM for MongoDB                     |
| Stripe     | Payment processing                  |
| Cloudinary | Image and asset storage             |
| Socket.IO  | Real-time communication             |
| JWT        | Authentication & authorization      |
| APIDog     | API documentation                   |

---

The remainder of this document provides detailed API endpoints and example usage for every resource in the system including auth, user, category, product, brand, cart, and orders.

---

# Ecommerce-App-Nestjs

Base URLs:

# Authentication

# EcommerceApp/Auth

## POST Login

POST /auth/login

> Body Parameters

```json
{
  "email": "gavade3889@benznoi.com",
  "password": "1234"
}
```

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | no       | none        |
| body          | body     | object | no       | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## POST Register

POST /auth/register

> Body Parameters

```json
{
  "name": "sara",
  "email": "gavade3889@benznoi.com",
  "password": "1234",
  "confirmPassword": "1234",
  "phone": "01234567890",
  "role": "vendor",
  "address": "my address"
}
```

### Params

| Name              | Location | Type   | Required | Description |
| ----------------- | -------- | ------ | -------- | ----------- |
| body              | body     | object | no       | none        |
| » name            | body     | string | yes      | none        |
| » email           | body     | string | yes      | none        |
| » password        | body     | string | yes      | none        |
| » confirmPassword | body     | string | yes      | none        |
| » phone           | body     | string | yes      | none        |
| » address         | body     | string | yes      | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## POST Verify email

POST /auth/verify_email

> Body Parameters

```json
{
  "email": "gavade3889@benznoi.com",
  "otp": "T56xin5@L"
}
```

### Params

| Name    | Location | Type   | Required | Description |
| ------- | -------- | ------ | -------- | ----------- |
| body    | body     | object | no       | none        |
| » email | body     | string | yes      | none        |
| » otp   | body     | string | yes      | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## POST Forgot password

POST /auth/forgot_password

> Body Parameters

```json
{
  "email": "doyefe5665@movfull.com"
}
```

### Params

| Name    | Location | Type   | Required | Description |
| ------- | -------- | ------ | -------- | ----------- |
| body    | body     | object | no       | none        |
| » email | body     | string | yes      | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## POST Reset Password

POST /auth/reset_password

> Body Parameters

```json
{
  "email": "doyefe5665@movfull.com",
  "otp": "ORmQfYWeKP61",
  "password": "123",
  "confirmPassword": "123"
}
```

### Params

| Name              | Location | Type   | Required | Description |
| ----------------- | -------- | ------ | -------- | ----------- |
| body              | body     | object | no       | none        |
| » email           | body     | string | yes      | none        |
| » otp             | body     | string | yes      | none        |
| » password        | body     | string | yes      | none        |
| » confirmPassword | body     | string | yes      | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## POST Get new access token

POST /auth/new-access_token

> Body Parameters

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWZmZThhOTM0ZDIxNzI3NWJkMGEyNSIsImlhdCI6MTc0NTE3MzcwNCwiZXhwIjoxNzQ1Nzc4NTA0fQ.79HjGfB9DfxIMN8y8yxFgjDRgerPFTDDOCUqTXZqG3I"
}
```

### Params

| Name           | Location | Type   | Required | Description |
| -------------- | -------- | ------ | -------- | ----------- |
| body           | body     | object | no       | none        |
| » refreshToken | body     | string | yes      | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

# EcommerceApp/User

## PATCH Update user

PATCH /user/profile

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## GET Get Profile

GET /user/profile

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | yes      | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## GET GetAllUsers

GET /user/all-users

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | no       | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

# EcommerceApp/Category

## POST Create Category

POST /category/create

> Body Parameters

```yaml
name: electronics
image: file://D:\Screenshot 2025-02-12 125850.png
```

### Params

| Name          | Location | Type           | Required | Description |
| ------------- | -------- | -------------- | -------- | ----------- |
| Authorization | header   | string         | no       | none        |
| body          | body     | object         | no       | none        |
| » name        | body     | string         | no       | none        |
| » image       | body     | string(binary) | no       | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## GET Get All Categories

GET /category/all

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## GET Get category by slug

GET /categoy/name

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## PATCH Update category by slug

PATCH /category/slug

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## DELETE Delete category by id (admins)

DELETE /category/680e73ad56fa7b90882e69fe

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | no       | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

# EcommerceApp/SubCategory

## DELETE Delete sub-category by id (admins)

DELETE /sub_category/6810f1e73d22112ef3fc36a9

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | no       | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## PATCH Update sub-category by slug or id

PATCH /sub_category/

> Body Parameters

```yaml
name: cameras
image: file://D:\Screenshot 2025-02-09 200011.png
```

### Params

| Name          | Location | Type           | Required | Description |
| ------------- | -------- | -------------- | -------- | ----------- |
| id            | query    | string         | no       | none        |
| Authorization | header   | string         | no       | none        |
| body          | body     | object         | no       | none        |
| » name        | body     | string         | no       | none        |
| » image       | body     | string(binary) | no       | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## GET Get sub-category by slug

GET /sub_category/head-phones

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## GET Get All SubCategories

GET /sub_category/all

### Params

| Name | Location | Type   | Required | Description |
| ---- | -------- | ------ | -------- | ----------- |
| page | query    | string | no       | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## POST Create subCategory

POST /sub_category/create

> Body Parameters

```yaml
name: dish washer
image: file://D:\profile-pic.png
categoryId: 68124fd5911c03eff0cc0167
```

### Params

| Name          | Location | Type           | Required | Description |
| ------------- | -------- | -------------- | -------- | ----------- |
| Authorization | header   | string         | no       | none        |
| body          | body     | object         | no       | none        |
| » name        | body     | string         | no       | none        |
| » image       | body     | string(binary) | no       | none        |
| » categoryId  | body     | string         | no       | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

# EcommerceApp/Brand

## POST Create brand

POST /brand/create

> Body Parameters

```yaml
name: mienta
logo: file://D:\Screenshot 2025-01-20 205226.png
```

### Params

| Name          | Location | Type           | Required | Description |
| ------------- | -------- | -------------- | -------- | ----------- |
| Authorization | header   | string         | no       | none        |
| body          | body     | object         | no       | none        |
| » name        | body     | string         | no       | none        |
| » logo        | body     | string(binary) | no       | none        |

> Response Examples

> 400 Response

```json
{
  "name": "string",
  "message": "string",
  "expiredAt": "string"
}
```

### Responses

| HTTP Status Code | Meaning                                                          | Description | Data schema |
| ---------------- | ---------------------------------------------------------------- | ----------- | ----------- |
| 400              | [Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **400**

| Name        | Type   | Required | Restrictions | Title | description |
| ----------- | ------ | -------- | ------------ | ----- | ----------- |
| » name      | string | true     | none         |       | none        |
| » message   | string | true     | none         |       | none        |
| » expiredAt | string | true     | none         |       | none        |

## GET Get brand by slug

GET /brand/test

> Response Examples

> 200 Response

```json
{
  "status": "string",
  "message": "string",
  "Brand": {
    "name": "string",
    "image": {
      "secure_url": "string",
      "public_id": "string"
    },
    "slug": "string",
    "createdBy": {
      "_id": "string",
      "name": "string",
      "email": "string"
    }
  }
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name           | Type   | Required | Restrictions | Title | description |
| -------------- | ------ | -------- | ------------ | ----- | ----------- |
| » status       | string | true     | none         |       | none        |
| » message      | string | true     | none         |       | none        |
| » Brand        | object | true     | none         |       | none        |
| »» name        | string | true     | none         |       | none        |
| »» image       | object | true     | none         |       | none        |
| »»» secure_url | string | true     | none         |       | none        |
| »»» public_id  | string | true     | none         |       | none        |
| »» slug        | string | true     | none         |       | none        |
| »» createdBy   | object | true     | none         |       | none        |
| »»» \_id       | string | true     | none         |       | none        |
| »»» name       | string | true     | none         |       | none        |
| »»» email      | string | true     | none         |       | none        |

## GET Get all brands

GET /brand/all

> Response Examples

> 200 Response

```json
{
  "status": "string",
  "message": "string",
  "data": [
    {
      "logo": {
        "secure_url": "string",
        "public_id": "string"
      },
      "_id": "string",
      "name": "string",
      "folder": "string",
      "createdBy": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "slug": "string",
      "__v": 0
    }
  ],
  "total": 0,
  "page": 0,
  "limit": 0,
  "totalPages": 0
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name           | Type     | Required | Restrictions | Title | description |
| -------------- | -------- | -------- | ------------ | ----- | ----------- |
| » status       | string   | true     | none         |       | none        |
| » message      | string   | true     | none         |       | none        |
| » data         | [object] | true     | none         |       | none        |
| »» logo        | object   | false    | none         |       | none        |
| »»» secure_url | string   | true     | none         |       | none        |
| »»» public_id  | string   | true     | none         |       | none        |
| »» \_id        | string   | false    | none         |       | none        |
| »» name        | string   | false    | none         |       | none        |
| »» folder      | string   | false    | none         |       | none        |
| »» createdBy   | string   | false    | none         |       | none        |
| »» createdAt   | string   | false    | none         |       | none        |
| »» updatedAt   | string   | false    | none         |       | none        |
| »» slug        | string   | false    | none         |       | none        |
| »» \_\_v       | integer  | false    | none         |       | none        |
| » total        | integer  | true     | none         |       | none        |
| » page         | integer  | true     | none         |       | none        |
| » limit        | integer  | true     | none         |       | none        |
| » totalPages   | integer  | true     | none         |       | none        |

## PATCH Update brand by id or slug

PATCH /brand

> Body Parameters

```yaml
name: test brandd
logo: file://D:\Screenshot 2025-02-09 200039.png
```

### Params

| Name          | Location | Type           | Required | Description |
| ------------- | -------- | -------------- | -------- | ----------- |
| id            | query    | string         | no       | none        |
| Authorization | header   | string         | no       | none        |
| body          | body     | object         | no       | none        |
| » name        | body     | string         | no       | none        |
| » logo        | body     | string(binary) | no       | none        |

> Response Examples

> 200 Response

```json
{
  "status": "string",
  "message": "string",
  "updatedBrand": {
    "logo": {
      "secure_url": "string",
      "public_id": "string"
    },
    "_id": "string",
    "name": "string",
    "folder": "string",
    "createdBy": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "slug": "string",
    "__v": 0
  }
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name           | Type    | Required | Restrictions | Title | description |
| -------------- | ------- | -------- | ------------ | ----- | ----------- |
| » status       | string  | true     | none         |       | none        |
| » message      | string  | true     | none         |       | none        |
| » updatedBrand | object  | true     | none         |       | none        |
| »» logo        | object  | true     | none         |       | none        |
| »»» secure_url | string  | true     | none         |       | none        |
| »»» public_id  | string  | true     | none         |       | none        |
| »» \_id        | string  | true     | none         |       | none        |
| »» name        | string  | true     | none         |       | none        |
| »» folder      | string  | true     | none         |       | none        |
| »» createdBy   | string  | true     | none         |       | none        |
| »» createdAt   | string  | true     | none         |       | none        |
| »» updatedAt   | string  | true     | none         |       | none        |
| »» slug        | string  | true     | none         |       | none        |
| »» \_\_v       | integer | true     | none         |       | none        |

## DELETE delete brand

DELETE /brand/6810fee46507318c3359bfa6

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | no       | none        |

> Response Examples

> 200 Response

```json
{
  "status": "string",
  "message": "string"
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name      | Type   | Required | Restrictions | Title | description |
| --------- | ------ | -------- | ------------ | ----- | ----------- |
| » status  | string | true     | none         |       | none        |
| » message | string | true     | none         |       | none        |

# EcommerceApp/Product

## POST Create new product

POST /product/create

> Body Parameters

```yaml
name: universal
description: Collection of home appliences
category: 68161b1b51cce900129cccd1
sub_category: 68125000911c03eff0cc016b
brand: 6812502a911c03eff0cc0170
price: '400'
stock: '5'
thumbnail: file://D:\Screenshot 2025-02-13 215639.png
discount: '20'
```

### Params

| Name           | Location | Type           | Required | Description |
| -------------- | -------- | -------------- | -------- | ----------- |
| Authorization  | header   | string         | no       | none        |
| body           | body     | object         | no       | none        |
| » name         | body     | string         | no       | name        |
| » description  | body     | string         | no       | none        |
| » category     | body     | string         | no       | group       |
| » sub_category | body     | string         | no       | none        |
| » brand        | body     | string         | no       | none        |
| » price        | body     | string         | no       | none        |
| » stock        | body     | string         | no       | none        |
| » thumbnail    | body     | string(binary) | no       | none        |
| » discount     | body     | string         | no       | none        |

> Response Examples

> 201 Response

```json
{
  "status": "string",
  "message": "string",
  "product": {
    "name": "string",
    "description": "string",
    "price": 0,
    "stock": 0,
    "slug": "string",
    "images": ["string"],
    "thumbnail": {
      "secure_url": "string",
      "public_id": "string",
      "_id": "string"
    },
    "category": "string",
    "sub_category": "string",
    "brand": "string",
    "createdBy": "string",
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
}
```

### Responses

| HTTP Status Code | Meaning                                                      | Description | Data schema |
| ---------------- | ------------------------------------------------------------ | ----------- | ----------- |
| 201              | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **201**

| Name            | Type     | Required | Restrictions | Title | description |
| --------------- | -------- | -------- | ------------ | ----- | ----------- |
| » status        | string   | true     | none         |       | none        |
| » message       | string   | true     | none         |       | none        |
| » product       | object   | true     | none         |       | none        |
| »» name         | string   | true     | none         |       | none        |
| »» description  | string   | true     | none         |       | none        |
| »» price        | integer  | true     | none         |       | none        |
| »» stock        | integer  | true     | none         |       | none        |
| »» slug         | string   | true     | none         |       | none        |
| »» images       | [string] | true     | none         |       | none        |
| »» thumbnail    | object   | true     | none         |       | none        |
| »»» secure_url  | string   | true     | none         |       | none        |
| »»» public_id   | string   | true     | none         |       | none        |
| »»» \_id        | string   | true     | none         |       | none        |
| »» category     | string   | true     | none         |       | none        |
| »» sub_category | string   | true     | none         |       | none        |
| »» brand        | string   | true     | none         |       | none        |
| »» createdBy    | string   | true     | none         |       | none        |
| »» \_id         | string   | true     | none         |       | none        |
| »» createdAt    | string   | true     | none         |       | none        |
| »» updatedAt    | string   | true     | none         |       | none        |
| »» \_\_v        | integer  | true     | none         |       | none        |

## GET Get product by id

GET /product/get_product/6814c56833db05bb92598a7b

### Params

| Name | Location | Type   | Required | Description |
| ---- | -------- | ------ | -------- | ----------- |
| id   | query    | string | no       | none        |

> Response Examples

> 200 Response

```json
{
  "status": "string",
  "message": "string",
  "product": {
    "name": "string",
    "description": "string",
    "price": 0,
    "stock": 0,
    "createdBy": {
      "_id": "string",
      "name": "string",
      "email": "string",
      "role": "string"
    },
    "category": {
      "image": {
        "secure_url": "string",
        "public_id": "string"
      },
      "_id": "string",
      "name": "string",
      "folder": "string",
      "createdBy": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "slug": "string",
      "__v": 0
    },
    "images": ["string"],
    "thumbnail": {
      "secure_url": "string",
      "public_id": "string",
      "_id": "string"
    },
    "sub_category": {
      "image": {
        "secure_url": "string",
        "public_id": "string"
      },
      "_id": "string",
      "name": "string",
      "folder": "string",
      "createdBy": "string",
      "category": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "slug": "string",
      "__v": 0
    },
    "brand": {
      "logo": {
        "secure_url": "string",
        "public_id": "string"
      },
      "_id": "string",
      "name": "string",
      "folder": "string",
      "createdBy": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "slug": "string",
      "__v": 0
    },
    "slug": "string"
  }
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name            | Type     | Required | Restrictions | Title | description |
| --------------- | -------- | -------- | ------------ | ----- | ----------- |
| » status        | string   | true     | none         |       | none        |
| » message       | string   | true     | none         |       | none        |
| » product       | object   | true     | none         |       | none        |
| »» name         | string   | true     | none         |       | none        |
| »» description  | string   | true     | none         |       | none        |
| »» price        | integer  | true     | none         |       | none        |
| »» stock        | integer  | true     | none         |       | none        |
| »» createdBy    | object   | true     | none         |       | none        |
| »»» \_id        | string   | true     | none         |       | none        |
| »»» name        | string   | true     | none         |       | none        |
| »»» email       | string   | true     | none         |       | none        |
| »»» role        | string   | true     | none         |       | none        |
| »» category     | object   | true     | none         |       | none        |
| »»» image       | object   | true     | none         |       | none        |
| »»»» secure_url | string   | true     | none         |       | none        |
| »»»» public_id  | string   | true     | none         |       | none        |
| »»» \_id        | string   | true     | none         |       | none        |
| »»» name        | string   | true     | none         |       | none        |
| »»» folder      | string   | true     | none         |       | none        |
| »»» createdBy   | string   | true     | none         |       | none        |
| »»» createdAt   | string   | true     | none         |       | none        |
| »»» updatedAt   | string   | true     | none         |       | none        |
| »»» slug        | string   | true     | none         |       | none        |
| »»» \_\_v       | integer  | true     | none         |       | none        |
| »» images       | [string] | true     | none         |       | none        |
| »» thumbnail    | object   | true     | none         |       | none        |
| »»» secure_url  | string   | true     | none         |       | none        |
| »»» public_id   | string   | true     | none         |       | none        |
| »»» \_id        | string   | true     | none         |       | none        |
| »» sub_category | object   | true     | none         |       | none        |
| »»» image       | object   | true     | none         |       | none        |
| »»»» secure_url | string   | true     | none         |       | none        |
| »»»» public_id  | string   | true     | none         |       | none        |
| »»» \_id        | string   | true     | none         |       | none        |
| »»» name        | string   | true     | none         |       | none        |
| »»» folder      | string   | true     | none         |       | none        |
| »»» createdBy   | string   | true     | none         |       | none        |
| »»» category    | string   | true     | none         |       | none        |
| »»» createdAt   | string   | true     | none         |       | none        |
| »»» updatedAt   | string   | true     | none         |       | none        |
| »»» slug        | string   | true     | none         |       | none        |
| »»» \_\_v       | integer  | true     | none         |       | none        |
| »» brand        | object   | true     | none         |       | none        |
| »»» logo        | object   | true     | none         |       | none        |
| »»»» secure_url | string   | true     | none         |       | none        |
| »»»» public_id  | string   | true     | none         |       | none        |
| »»» \_id        | string   | true     | none         |       | none        |
| »»» name        | string   | true     | none         |       | none        |
| »»» folder      | string   | true     | none         |       | none        |
| »»» createdBy   | string   | true     | none         |       | none        |
| »»» createdAt   | string   | true     | none         |       | none        |
| »»» updatedAt   | string   | true     | none         |       | none        |
| »»» slug        | string   | true     | none         |       | none        |
| »»» \_\_v       | integer  | true     | none         |       | none        |
| »» slug         | string   | true     | none         |       | none        |

## GET Get all products

GET /product/all

### Params

| Name | Location | Type   | Required | Description |
| ---- | -------- | ------ | -------- | ----------- |
| page | query    | string | no       | none        |

> Response Examples

> 200 Response

```json
{
  "status": "string",
  "message": "string",
  "products": {
    "data": [
      {
        "_id": "string",
        "name": "string",
        "description": "string",
        "price": 0,
        "stock": 0,
        "slug": "string",
        "images": ["string"],
        "thumbnail": {
          "secure_url": "string",
          "public_id": "string",
          "_id": "string"
        },
        "category": {
          "image": {},
          "_id": "string",
          "name": "string",
          "slug": "string"
        },
        "sub_category": {
          "image": {},
          "_id": "string",
          "name": "string",
          "slug": "string"
        },
        "brand": {
          "logo": {},
          "_id": "string",
          "name": "string",
          "slug": "string"
        },
        "createdBy": {
          "_id": "string",
          "name": "string",
          "email": "string"
        },
        "createdAt": "string",
        "updatedAt": "string",
        "__v": 0
      }
    ],
    "total": 0,
    "page": 0,
    "limit": 0,
    "totalPages": 0
  }
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name             | Type     | Required | Restrictions | Title | description |
| ---------------- | -------- | -------- | ------------ | ----- | ----------- |
| » status         | string   | true     | none         |       | none        |
| » message        | string   | true     | none         |       | none        |
| » products       | object   | true     | none         |       | none        |
| »» data          | [object] | true     | none         |       | none        |
| »»» \_id         | string   | false    | none         |       | none        |
| »»» name         | string   | false    | none         |       | none        |
| »»» description  | string   | false    | none         |       | none        |
| »»» price        | integer  | false    | none         |       | none        |
| »»» stock        | integer  | false    | none         |       | none        |
| »»» slug         | string   | false    | none         |       | none        |
| »»» images       | [string] | false    | none         |       | none        |
| »»» thumbnail    | object   | false    | none         |       | none        |
| »»»» secure_url  | string   | true     | none         |       | none        |
| »»»» public_id   | string   | true     | none         |       | none        |
| »»»» \_id        | string   | true     | none         |       | none        |
| »»» category     | object   | false    | none         |       | none        |
| »»»» image       | object   | true     | none         |       | none        |
| »»»»» secure_url | string   | true     | none         |       | none        |
| »»»»» public_id  | string   | true     | none         |       | none        |
| »»»» \_id        | string   | true     | none         |       | none        |
| »»»» name        | string   | true     | none         |       | none        |
| »»»» slug        | string   | true     | none         |       | none        |
| »»» sub_category | object   | false    | none         |       | none        |
| »»»» image       | object   | true     | none         |       | none        |
| »»»»» secure_url | string   | true     | none         |       | none        |
| »»»»» public_id  | string   | true     | none         |       | none        |
| »»»» \_id        | string   | true     | none         |       | none        |
| »»»» name        | string   | true     | none         |       | none        |
| »»»» slug        | string   | true     | none         |       | none        |
| »»» brand        | object   | false    | none         |       | none        |
| »»»» logo        | object   | true     | none         |       | none        |
| »»»»» secure_url | string   | true     | none         |       | none        |
| »»»»» public_id  | string   | true     | none         |       | none        |
| »»»» \_id        | string   | true     | none         |       | none        |
| »»»» name        | string   | true     | none         |       | none        |
| »»»» slug        | string   | true     | none         |       | none        |
| »»» createdBy    | object   | false    | none         |       | none        |
| »»»» \_id        | string   | true     | none         |       | none        |
| »»»» name        | string   | true     | none         |       | none        |
| »»»» email       | string   | true     | none         |       | none        |
| »»» createdAt    | string   | false    | none         |       | none        |
| »»» updatedAt    | string   | false    | none         |       | none        |
| »»» \_\_v        | integer  | false    | none         |       | none        |
| »» total         | integer  | true     | none         |       | none        |
| »» page          | integer  | true     | none         |       | none        |
| »» limit         | integer  | true     | none         |       | none        |
| »» totalPages    | integer  | true     | none         |       | none        |

## PATCH Update product with its id

PATCH /product/update_product/6814c56833db05bb92598a7b

> Body Parameters

```yaml
thumbnail: file://D:\Screenshot 2025-02-12 125850.png
images:
  - file://D:\impfunction.png
  - file://D:\Screenshot 2025-02-13 215639.png
```

### Params

| Name          | Location | Type           | Required | Description |
| ------------- | -------- | -------------- | -------- | ----------- |
| Authorization | header   | string         | no       | none        |
| body          | body     | object         | no       | none        |
| » thumbnail   | body     | string(binary) | no       | none        |
| » images      | body     | string(binary) | no       | none        |

> Response Examples

> 200 Response

```json
{
  "status": "string",
  "message": "string",
  "updatedProduct": {
    "_id": "string",
    "name": "string",
    "description": "string",
    "price": 0,
    "stock": 0,
    "slug": "string",
    "images": [
      {
        "secure_url": "string",
        "public_id": "string",
        "_id": "string"
      }
    ],
    "thumbnail": {
      "secure_url": "string",
      "public_id": "string",
      "_id": "string"
    },
    "category": "string",
    "sub_category": "string",
    "brand": "string",
    "createdBy": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name             | Type     | Required | Restrictions | Title | description |
| ---------------- | -------- | -------- | ------------ | ----- | ----------- |
| » status         | string   | true     | none         |       | none        |
| » message        | string   | true     | none         |       | none        |
| » updatedProduct | object   | true     | none         |       | none        |
| »» \_id          | string   | true     | none         |       | none        |
| »» name          | string   | true     | none         |       | none        |
| »» description   | string   | true     | none         |       | none        |
| »» price         | integer  | true     | none         |       | none        |
| »» stock         | integer  | true     | none         |       | none        |
| »» slug          | string   | true     | none         |       | none        |
| »» images        | [object] | true     | none         |       | none        |
| »»» secure_url   | string   | true     | none         |       | none        |
| »»» public_id    | string   | true     | none         |       | none        |
| »»» \_id         | string   | true     | none         |       | none        |
| »» thumbnail     | object   | true     | none         |       | none        |
| »»» secure_url   | string   | true     | none         |       | none        |
| »»» public_id    | string   | true     | none         |       | none        |
| »»» \_id         | string   | true     | none         |       | none        |
| »» category      | string   | true     | none         |       | none        |
| »» sub_category  | string   | true     | none         |       | none        |
| »» brand         | string   | true     | none         |       | none        |
| »» createdBy     | string   | true     | none         |       | none        |
| »» createdAt     | string   | true     | none         |       | none        |
| »» updatedAt     | string   | true     | none         |       | none        |
| »» \_\_v         | integer  | true     | none         |       | none        |

## PATCH Delete image by secure_url & public_id

PATCH /product/delete_image/6814c56833db05bb92598a7b

> Body Parameters

```json
{
  "image": {
    "secure_url": "https://res.cloudinary.com/dpiuyacez/image/upload/v1746192165/Ecommerce-nestjs_app/products/AsxnG3ElqB/fub3iby2qfd56kjurd6k.png",
    "public_id": "Ecommerce-nestjs_app/products/AsxnG3ElqB/fub3iby2qfd56kjurf6k",
    "_id": "6814c6dd9eb2756c1cbde4c1"
  }
}
```

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | no       | none        |
| body          | body     | object | no       | none        |

> Response Examples

> 200 Response

```json
{
  "status": "string",
  "message": "string"
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name      | Type   | Required | Restrictions | Title | description |
| --------- | ------ | -------- | ------------ | ----- | ----------- |
| » status  | string | true     | none         |       | none        |
| » message | string | true     | none         |       | none        |

## DELETE Delete product by id

DELETE /product/delete/6814c56833db05bb92598a7b

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | no       | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

# EcommerceApp/Cart

## POST Add product

POST /cart/add_product

> Body Parameters

```json
{
  "product_id": "6820e48b22bab96dd5cc40d5"
}
```

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | no       | none        |
| body          | body     | object | no       | none        |

> Response Examples

> 200 Response

```json
{}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

## GET Get User Cart

GET /cart/get_cart

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | no       | none        |

> Response Examples

> 200 Response

```json
{
  "status": "string",
  "message": "string",
  "cart": {
    "_id": "string",
    "user": "string",
    "products": [
      {
        "product": {
          "_id": "string",
          "name": "string",
          "description": "string",
          "price": 0,
          "stock": 0,
          "slug": "string",
          "folder": "string",
          "images": [null],
          "thumbnail": {},
          "category": {},
          "sub_category": "string",
          "brand": {},
          "createdBy": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "__v": 0
        },
        "quantity": 0,
        "_id": "string"
      }
    ],
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name              | Type     | Required | Restrictions | Title | description |
| ----------------- | -------- | -------- | ------------ | ----- | ----------- |
| » status          | string   | true     | none         |       | none        |
| » message         | string   | true     | none         |       | none        |
| » cart            | object   | true     | none         |       | none        |
| »» \_id           | string   | true     | none         |       | none        |
| »» user           | string   | true     | none         |       | none        |
| »» products       | [object] | true     | none         |       | none        |
| »»» product       | object   | true     | none         |       | none        |
| »»»» \_id         | string   | true     | none         |       | none        |
| »»»» name         | string   | true     | none         |       | none        |
| »»»» description  | string   | true     | none         |       | none        |
| »»»» price        | integer  | true     | none         |       | none        |
| »»»» stock        | integer  | true     | none         |       | none        |
| »»»» slug         | string   | true     | none         |       | none        |
| »»»» folder       | string   | true     | none         |       | none        |
| »»»» images       | [string] | true     | none         |       | none        |
| »»»» thumbnail    | object   | true     | none         |       | none        |
| »»»»» secure_url  | string   | true     | none         |       | none        |
| »»»»» public_id   | string   | true     | none         |       | none        |
| »»»»» \_id        | string   | true     | none         |       | none        |
| »»»» category     | object   | true     | none         |       | none        |
| »»»»» image       | object   | true     | none         |       | none        |
| »»»»»» secure_url | string   | true     | none         |       | none        |
| »»»»»» public_id  | string   | true     | none         |       | none        |
| »»»»» \_id        | string   | true     | none         |       | none        |
| »»»»» name        | string   | true     | none         |       | none        |
| »»»» sub_category | string   | true     | none         |       | none        |
| »»»» brand        | object   | true     | none         |       | none        |
| »»»»» logo        | object   | true     | none         |       | none        |
| »»»»»» secure_url | string   | true     | none         |       | none        |
| »»»»»» public_id  | string   | true     | none         |       | none        |
| »»»»» \_id        | string   | true     | none         |       | none        |
| »»»»» name        | string   | true     | none         |       | none        |
| »»»» createdBy    | string   | true     | none         |       | none        |
| »»»» createdAt    | string   | true     | none         |       | none        |
| »»»» updatedAt    | string   | true     | none         |       | none        |
| »»»» \_\_v        | integer  | true     | none         |       | none        |
| »»» quantity      | integer  | true     | none         |       | none        |
| »»» \_id          | string   | true     | none         |       | none        |
| »» createdAt      | string   | true     | none         |       | none        |
| »» updatedAt      | string   | true     | none         |       | none        |
| »» \_\_v          | integer  | true     | none         |       | none        |

## PATCH Update product quantity

PATCH /cart/update_product/6816198314bba1beccd7f80d

> Body Parameters

```json
{
  "quantity": 1
}
```

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| id            | query    | string | no       | ID          |
| Authorization | header   | string | no       | none        |
| body          | body     | object | no       | none        |

> Response Examples

> 404 Response

```json
{
  "message": "string",
  "error": "string",
  "statusCode": 0
}
```

### Responses

| HTTP Status Code | Meaning                                                        | Description | Data schema |
| ---------------- | -------------------------------------------------------------- | ----------- | ----------- |
| 404              | [Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **404**

| Name         | Type    | Required | Restrictions | Title | description |
| ------------ | ------- | -------- | ------------ | ----- | ----------- |
| » message    | string  | true     | none         |       | none        |
| » error      | string  | true     | none         |       | none        |
| » statusCode | integer | true     | none         |       | none        |

## DELETE Delete product from cart by id

DELETE /cart/delete_product/68161c7869cd86fead2a7ae4

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | no       | none        |

> Response Examples

> 200 Response

```json
{
  "status": "string",
  "message": "string",
  "updatedCart": {
    "_id": "string",
    "user": "string",
    "products": [
      {
        "product": "string",
        "quantity": 0,
        "_id": "string"
      }
    ],
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name          | Type     | Required | Restrictions | Title | description |
| ------------- | -------- | -------- | ------------ | ----- | ----------- |
| » status      | string   | true     | none         |       | none        |
| » message     | string   | true     | none         |       | none        |
| » updatedCart | object   | true     | none         |       | none        |
| »» \_id       | string   | true     | none         |       | none        |
| »» user       | string   | true     | none         |       | none        |
| »» products   | [object] | true     | none         |       | none        |
| »»» product   | string   | false    | none         |       | none        |
| »»» quantity  | integer  | false    | none         |       | none        |
| »»» \_id      | string   | false    | none         |       | none        |
| »» createdAt  | string   | true     | none         |       | none        |
| »» updatedAt  | string   | true     | none         |       | none        |
| »» \_\_v      | integer  | true     | none         |       | none        |

## DELETE Clear users cart

DELETE /cart/clear_cart

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | no       | none        |

> Response Examples

> 200 Response

```json
{
  "status": "string",
  "message": "string"
}
```

### Responses

| HTTP Status Code | Meaning                                                 | Description | Data schema |
| ---------------- | ------------------------------------------------------- | ----------- | ----------- |
| 200              | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **200**

| Name      | Type   | Required | Restrictions | Title | description |
| --------- | ------ | -------- | ------------ | ----- | ----------- |
| » status  | string | true     | none         |       | none        |
| » message | string | true     | none         |       | none        |

# EcommerceApp/Order

## POST Create order

POST /order/create

> Body Parameters

```json
{
  "paymentMethod": "cash"
}
```

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | no       | none        |
| body          | body     | object | no       | none        |

> Response Examples

> 201 Response

```json
{
  "status": "string",
  "prods": {
    "_id": "string",
    "user": "string",
    "products": ["string"],
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
}
```

### Responses

| HTTP Status Code | Meaning                                                      | Description | Data schema |
| ---------------- | ------------------------------------------------------------ | ----------- | ----------- |
| 201              | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **201**

| Name         | Type     | Required | Restrictions | Title | description |
| ------------ | -------- | -------- | ------------ | ----- | ----------- |
| » status     | string   | true     | none         |       | none        |
| » prods      | object   | true     | none         |       | none        |
| »» \_id      | string   | true     | none         |       | none        |
| »» user      | string   | true     | none         |       | none        |
| »» products  | [string] | true     | none         |       | none        |
| »» createdAt | string   | true     | none         |       | none        |
| »» updatedAt | string   | true     | none         |       | none        |
| »» \_\_v     | integer  | true     | none         |       | none        |

# EcommerceApp/Coupon

## POST Create coupon

POST /coupon/create

> Body Parameters

```json
{
  "code": "SARA_COURSE",
  "discount": "30",
  "isPercentage": false,
  "expiresAt": "2025-05-20T00:00:00.000Z"
}
```

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | no       | none        |
| body          | body     | object | no       | none        |

> Response Examples

> 201 Response

```json
{
  "status": "string",
  "message": "string",
  "coupon": {
    "user": "string",
    "code": "string",
    "discount": 0,
    "isPercentage": true,
    "expiresAt": "string",
    "isActive": true,
    "_id": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
}
```

### Responses

| HTTP Status Code | Meaning                                                      | Description | Data schema |
| ---------------- | ------------------------------------------------------------ | ----------- | ----------- |
| 201              | [Created](https://tools.ietf.org/html/rfc7231#section-6.3.2) | none        | Inline      |

### Responses Data Schema

HTTP Status Code **201**

| Name            | Type    | Required | Restrictions | Title | description |
| --------------- | ------- | -------- | ------------ | ----- | ----------- |
| » status        | string  | true     | none         |       | none        |
| » message       | string  | true     | none         |       | none        |
| » coupon        | object  | true     | none         |       | none        |
| »» user         | string  | true     | none         |       | none        |
| »» code         | string  | true     | none         |       | none        |
| »» discount     | integer | true     | none         |       | none        |
| »» isPercentage | boolean | true     | none         |       | none        |
| »» expiresAt    | string  | true     | none         |       | none        |
| »» isActive     | boolean | true     | none         |       | none        |
| »» \_id         | string  | true     | none         |       | none        |
| »» createdAt    | string  | true     | none         |       | none        |
| »» updatedAt    | string  | true     | none         |       | none        |
| »» \_\_v        | integer | true     | none         |       | none        |

## GET Get coupon by code

GET /coupon/SARA_COURSE

### Params

| Name          | Location | Type   | Required | Description |
| ------------- | -------- | ------ | -------- | ----------- |
| Authorization | header   | string | no       | none        |

> Response Examples

> 200 Response

```json
{
  "status": "string",
  "message": "string",
  "coupon": {
    "_id": "string",
    "user": "string",
    "code": "string",
    "discount": 0,
    "isPercentage": true,
    "expiresAt": "string",
    "isActive": true,
    "createdAt": "string",
    "updatedAt": "string",
    "__v": 0
  }
}
```
