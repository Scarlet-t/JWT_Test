# ⋆. 𐙚˚࿔ A BACKEND TO THE FOLLOWING PROJECT 𝜗𝜚˚⋆  

[Museum-WebUI](https://museum-web-ui.vercel.app/)   
[Repo](https://github.com/Scarlet-t/Museum-WebUI/)  

# ⋆⊹♡˚ʚ JWT-Test (or Funny Funtime With JWT) ɞ˚♡⊹⋆

> 𓆩❤︎𓆪 an Express.js API situation I made to understand JWT authentication.

in theory, one can:
* register
* log in
* get a JWT token
* access protected routes
* add/remove favourites
* add/remove history

##### !!! but do note i will be able to see any username one might enter.

---

# ⋆⊹♡˚ʚ API LINK ɞ˚♡⊹⋆
>(/ not defined) 

[Funny Funtime With JWT Yippee](https://funny-funtime-with-jwt-yippee.vercel.app/)

---

# ⋆⊹♡˚ʚ TEST ACCOUNTS ɞ˚♡⊹⋆

```json
{
  "userName": "moomer",
  "password": "1234",
  "password2": "1234"
}
```

```json
{
  "userName": "poobie",
  "password": "moooo:3",
  "password2": "moooo:3"
}
```

---

# ⋆⊹♡˚ʚ API ROUTES ɞ˚♡⊹⋆

## Register

```http
POST /api/user/register
```

Body:
> example

```json
{
  "userName": "newuser",
  "password": "1234",
  "password2": "1234"
}
```

---

## Login

```http
POST /api/user/login
```

Body:
> example

```json
{
  "userName": "moomer",
  "password": "1234"
}
```

Response:

```json
{
  "message": "logged in!!",
  "token": "your_jwt_token_here"
}
```

# ⋆⊹♡˚ʚ TOKEN-DEPENDENT ROUTES ɞ˚♡⊹⋆
> these vary based on your token woah

## Get Favourites

```http
GET /api/user/favourites
```

---

## Add Favourite

```http
PUT /api/user/favourites/:id
```

Example:

```http
PUT /api/user/favourites/123
```

---

## Remove Favourite

```http
DELETE /api/user/favourites/:id
```

---

## Get History

```http
GET /api/user/history
```

---

## Add History

```http
PUT /api/user/history/:id
```

---

## Remove History

```http
DELETE /api/user/history/:id
```
