INSERT INTO type_ducument (id, name) VALUES (1, 'Cédula de ciudadanía')
INSERT INTO type_ducument (id, name) VALUES (2, 'Cédula de extranjería')
INSERT INTO type_ducument (id, name) VALUES (3, 'Pasaporte')
INSERT INTO type_ducument (id, name) VALUES (4, 'Otro')

INSERT INTO `user` (id, andress, date_of_birth, document_number, first_name, last_name, phone, document_id) VALUES (1 ,'calle 57 ', '2021-04-14', '4534634234', 'Hamilton', 'Acevedo', '78278490', 1)
INSERT INTO `user` (id, andress, date_of_birth, document_number, first_name, last_name, phone, document_id) VALUES (2 ,'calle 100 ', '2021-04-12', '1004634231', 'Ediel', 'Avila', '300827', 2)
INSERT INTO `user` (id, andress, date_of_birth, document_number, first_name, last_name, phone, document_id) VALUES (3 ,'calle 120 ', '2021-04-12', '1005674231', 'Ana', 'Lopez', '100827', 2)


-- INSERT INTO user_academic (id, namber, user_id) VALUES (1, 'Derecho', 1)
INSERT INTO user_academic (id, namber, user_id) VALUES (2, 'Programacion', 2)
INSERT INTO user_academic (id, namber, user_id) VALUES (1, 'Derecho', 2)