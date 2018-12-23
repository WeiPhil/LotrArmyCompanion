-- database setup
USE app;

CREATE TABLE example
(  
    id INTEGER AUTO_INCREMENT,
    name TEXT,
    PRIMARY KEY (id)
) COMMENT='this is a test table';
