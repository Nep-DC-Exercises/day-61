CREATE TABLE magic (
    id SERIAL PRIMARY KEY,
    question VARCHAR(50) NOT NULL,
    answer VARCHAR(50) NOT NULL,
    question_type VARCHAR(20) NOT NULL
);
