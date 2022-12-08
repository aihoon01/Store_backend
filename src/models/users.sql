CREATE type role as enum (
    "individual",
    "business"
);

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role role NOT NULL,
    emailtoken VARCHAR(200),
    isverified BOOLEAN NOT NULL
);