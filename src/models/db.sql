CREATE type role as enum (
    'individual',
    'business'
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
    role role NOT NULL,
    profile VARCHAR(100)
);

CREATE TABlE store (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE,
    userid INT REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE views (
    storename VARCHAR(100) REFERENCES store(name) ON DELETE CASCADE NOT NULL,
    seen BOOLEAN NOT NULL
);

CREATE TABLE vendors (
    id INT PRIMARY KEY,
    vendor VARCHAR(100) UNIQUE,
    commission INT,
    storeid INT REFERENCES store(id) ON DELETE CASCADE
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    size INT,
    name VARCHAR(100),
    price INT,
    vendorid INT REFERENCES vendors(id) ON DELETE CASCADE
);

CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    uid INT,
    vendorid INT REFERENCES vendors(id) ON DELETE CASCADE,
    price INT NOT NULL
);

CREATE TABLE storeinfo(
    storeid INT PRIMARY KEY REFERENCES store(id) ON DELETE CASCADE,
    features JSONB,
    hosted BOOLEAN
);


CREATE TABLE Media(
    storeid INT REFERENCES store(id) ON DELETE CASCADE NOT NULL,
    fileName VARCHAR(200) NOT NULL,
    label VARCHAR(200) NOT NULL
); 

-- INSERT INTO templates(name, image, category)
-- VALUES ('blog_1', '/images/blog_1.png', 'blog'), 
-- ('blog_2', '/images/blog_2.png', 'blog'),
-- ('ecom_1', '/images/ecom_1.png', 'ecommerce'),
-- ('ecom_2', '/images/ecom_2.png', 'ecommerce'),
-- ('finance', '/images/f_1.png', 'finance')