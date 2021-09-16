# Management software for a vet
# Models
Animal
```
birthday: date
species: Species (1-1)
vaccinated: boolean (default: false)
```
Owner
```
fullName: string (required)
address: Address (1-1)
```
Pet (extends Animal)
```
owner: Owner
```
WildAnimal (extends Animal)
```
trackingId: number
```
Address
```
street: string
city: string
country: string
zipCode: string
Species
label: string
```

# Backend
● use Loopback 4
● use Postgres as Database to store the data
● All data should be accessible via CRUD as RestService
● use lb4 command line interface

# Install loopback
```sh
npm i -g @loopback/cli
```

# Backend setup
```sh
cd backend/
```
### Define Server host and port in .env
```
HOST=localhost
PORT=3000
```

### Define postgres config in .env
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=user
DB_PASSWORD=password
DB_DATABASE=database
```
# Install and run Backend
```sh
npm install
npm run rebuild
npm run migrate
npm run start
```
# OpenAPI spec
```
http://localhost:3000/openapi.json
```
# API Explorer
```
http://localhost:3000/explorer/
```

# Frontend
● use newest version of angular
● use angular material design
● enable data: create/read/update/delete in the angular application
# Frontend setup
```sh
cd frontend/
```
### Define API_ENDPOINT in frontend/src/environments/environment.ts
```
API_ENDPOINT: 'http://localhost:3000',
```

# Install and run Frontend
```sh
npm install
npm run build
npm start
```
