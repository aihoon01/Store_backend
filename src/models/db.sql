CREATE type role as enum (
    "individual",
    "business"
);

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    bname VARCHAR (100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    contact VARCHAR(100),
    location VARCHAR(200),
    role role NOT NULL
);


CREATE type category as enum (
    'ecommerce',
    'finance',
    'blog'
);

CREATE TABlE store {
    id SERIAL NOT NULL,
    name VARCHAR(100),
    userid INT REFERENCES users(id),
};

CREATE TABLE storeinfo(
    id SERIAL PRIMARY KEY NOT NULL,
    storeid INT REFERENCES store(id) UNIQUE,
    category category NOT NULL,
    features JSON 
);

