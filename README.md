
Start med at forke dette repo og installer en lokal MySQL database. 
Navnet på databasen skal være ```users```

1. Opret en .env fil i mappen find-errors-backend og indsæt følgende: 
Husk at tilpasse USER og PASSWORD til din MySQL database. 
```
PORT=8081
JWT_REFRESH_EXPIRATION=30000000
JWT_EXPIRATION=1400000
JWT_SECRET=4f1feeca525de4cdb064656007da3edac7895a87ff0ea865693300fb8b6e8f9c
HOST=localhost
USER=USERNAME_HER
PASSWORD=PASSWORD_HER
DIALECT=mysql
DB=users
```

2. Naviger til mappen i terminalen med cd... ("cd ../" for at gå tilbage )   og kør i en ny terminal:

``` npm install ```

Og for at få forbindelse til Mysql kør: 

``` node --watch server.js ```

4. Åben endnu en terminal og naviger til frontend mappen og kør:

```npm install```

```npm run dev```

Nu skulle projektet gerne køre med både frontend og backend løsningen. 
