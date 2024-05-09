CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS user_ (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS factory (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS product (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL,
    user_id UUID,
    factory_id UUID,
    FOREIGN KEY (user_id) REFERENCES user_(id),
    FOREIGN KEY (factory_id) REFERENCES factory(id)
);

CREATE TABLE IF NOT EXISTS product_factory (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID,
    factory_id UUID,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (factory_id) REFERENCES factory(id)
);