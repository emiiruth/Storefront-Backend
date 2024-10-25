CREATE TABLE order_products (
    id SERIAL PRIMARY KEY, 
    quantity integer, 
    order_ID bigint REFERENCES orders(ID), 
    product_ID bigint REFERENCES products(ID));