
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
    "username" VARCHAR (30) NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "daily_goal" INTEGER 
);

CREATE TABLE "entry" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user" (id),
    "amount" INTEGER, 
    "data_date" DATE 
); 

INSERT INTO "entry" ("user_id", "amount", "data_date")
VALUES ($1, $2, $3);

INSERT INTO "user" (username, password, daily_goal)
    VALUES ($1, $2, $3) RETURNING id;

SELECT * FROM "user";

INSERT INTO "entry" (user_id, amount, data_date)
      VALUES ($1, $2, NOW()) RETURNING id;
      
UPDATE "user" SET daily_goal = $1 WHERE id = $2;

DELETE FROM "entry" WHERE id = $1 AND user_id = $2;

SELECT * FROM "entry" WHERE data_date >= NOW() - INTERVAL '1 month'
AND user_id = $1;

SELECT * FROM "user" WHERE id = $1;

