-- TODO: Figure out database schema
DROP TABLE IF EXISTS contracts;

CREATE TABLE contracts(
    address VARCHAR(42), 
    tokenID INTEGER,
    tokenURI jsonb,
    PRIMARY KEY(address, tokenID)    
);