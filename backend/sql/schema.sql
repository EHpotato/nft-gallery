-- TODO: Figure out database schema
DROP TABLE IF EXISTS contracts;

CREATE TABLE contracts(address VARCHAR(42), tokens jsonb);