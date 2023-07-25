# Demo-SPA-Nuxt-Vuetify-CouchDB-Books

## Setup:
1. `yarn`
2. `yarn dev`
3. Navigate to [http://127.0.0.1:5984/_utils](http://127.0.0.1:5984/_utils)
4. Create admin (Go to "Admin Party")
5. Go to "Databases" and open "_users"
6. Then "All Documents -> (+) -> New Doc" and add new user:
```json
{
  "_id": "org.couchdb.user:geom",
  "name": "geom",
  "roles": [
    "user",
    "reader"
  ],
  "type": "user",
  "password_scheme": "pbkdf2",
  "iterations": 10,
  "derived_key": "6e35c34726a792f3851cda6d8909e502bc998a15",
  "salt": "482067994aee02e9bdde9cbabe0bfa2f"
}
```
7. "Databases -> Create Database" name it "books"
8. Open newly created database "books", go to "Permission", then "Roles", type "user" and "Add Role". 
9. Open running application [http://localhost:3000/](http://localhost:3000/) use username - `geom`, password `987`
10. ENJOY

P.S> Books data should have fields: title and author, and you can get JSON array from [here](https://github.com/benoitvallon/100-best-books/blob/master/books.json)  
