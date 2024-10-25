CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    status VARCHAR(15), 
    user_ID SERIAL REFERENCES users(id));