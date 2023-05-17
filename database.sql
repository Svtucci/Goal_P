
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


-- This is the DB SQL 

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (15) NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "daily_goal" INTEGER 
);

CREATE TABLE "entry" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users" (id),
    "amount" INTEGER, 
    "data_date" DATE 
); 

INSERT INTO "users" ("username", "password", "daily_goal")
VALUES ('');

INSERT INTO "entry"  ("user_id", "amount", "data_date")
VALUES ("$1", "$2", "$3");