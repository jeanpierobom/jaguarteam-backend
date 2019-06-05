--Country
INSERT INTO country (id, name) VALUES (1, 'Canada');
INSERT INTO country (id, name) VALUES (2, 'India');
INSERT INTO country (id, name) VALUES (3, 'Brazil');
INSERT INTO country (id, name) VALUES (4, 'United States of America');
INSERT INTO country (id, name) VALUES (5, 'Mexico');

-- City
INSERT INTO city (id, name, country_id) VALUES (1, 'Vancouver', 1);
INSERT INTO city (id, name, country_id) VALUES (2, 'Toronto', 1);
INSERT INTO city (id, name, country_id) VALUES (3, 'Calgary', 1);
INSERT INTO city (id, name, country_id) VALUES (4, 'Richmond', 1);
INSERT INTO city (id, name, country_id) VALUES (5, 'Montreal', 1);

INSERT INTO city (id, name, country_id) VALUES (6, 'Mumbai', 2);
INSERT INTO city (id, name, country_id) VALUES (7, 'Delhi', 2);

INSERT INTO city (id, name, country_id) VALUES (8, 'Brasilia', 3);
INSERT INTO city (id, name, country_id) VALUES (9, 'Rio de Janeiro', 3);
INSERT INTO city (id, name, country_id) VALUES (10, 'Sao Paulo', 3);

INSERT INTO city (id, name, country_id) VALUES (11, 'Seattle', 4);
INSERT INTO city (id, name, country_id) VALUES (12, 'New York', 4);

-- Students
INSERT INTO user
(id, email, password, user_type, name, city_id, birth_date, bio, mother_country_id)
VALUES (default, 'user1@email.com', 'pwd', 'S', 'A Student from India', 1, '2000-01-01', 'Bio text here...', 2);

INSERT INTO user
(id, email, password, user_type, name, city_id, birth_date, bio, mother_country_id)
VALUES (default, 'user2@email.com', 'pwd', 'S', 'A Student from Brazil', 2, '2000-01-01', 'Bio text here...', 3);

INSERT INTO user
(id, email, password, user_type, name, city_id, birth_date, bio, mother_country_id)
VALUES (default, 'user3@email.com', 'pwd', 'S', 'A Student from Mexico', 2, '2000-01-01', 'Bio text here...', 5);

-- Teacher
INSERT INTO user
(id, email, password, user_type, name, city_id, birth_date, bio, mother_country_id)
VALUES (default, 'user4@email.com', 'pwd', 'T', 'A Teacher from Canada', 1, '2000-01-01', 'Bio text here...', 1);

INSERT INTO user
(id, email, password, user_type, name, city_id, birth_date, bio, mother_country_id)
VALUES (default, 'user5@email.com', 'pwd', 'T', 'A Teacher from USA', 2, '2000-01-01', 'Bio text here...', 4);

INSERT INTO user
(id, email, password, user_type, name, city_id, birth_date, bio, mother_country_id)
VALUES (default, 'user6@email.com', 'pwd', 'T', 'A Teacher from India', 2, '2000-01-01', 'Bio text here...', 2);
