# start project

npm init -y
code --add .

# install express

npm install express

# install prettier

npm i --dev prettier
npm install typescript ts-node @types/node @types/express --save-dev
npx tsc --init
npm i --dev eslint
npx eslint --init
npm i --dev jasmin
npm i --dev @types/jasmine
npx jasmine init
npm i --dev supertest
npm i --dev @types/supertest
npm i morgan
npm i helmet
npm i express-rate-limit
npm i pg
npm i db-migrate
npm i db-migrate-pg
npm i bcrypt
npm i --dev @types/bcrypt
npm i jsonwebtoken
npm i --dev @types/jsonwebtoken

# blog of website of type Script

https://www.pullrequest.com/blog/intro-to-using-typescript-in-a-nodejs-express-project/

////==========/////=====/////============////=========////=======///

# env folder

PORT= 3000
DB_PORT= 3307
NODE_ENV= dev

# database connection information

POSTGRES_HOST= localhost
POSTGRES_PORT=5432
POSTGRES_DB= hotelo
POSTGRES_DB_TEST = hotelo
POSTGRES_USER = postgres
POSTGRES_PASSWORD = 123123

# bcrypt hash

BCRYPT_PASSWORD = my-secret-password
SLART_ROUNDS = 10

# jsonwebtoken

TOKEN_SECRET= my-token-secret
