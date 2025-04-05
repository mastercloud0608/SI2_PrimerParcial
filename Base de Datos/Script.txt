CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- Se recomienda almacenar contraseñas hasheadas
    email VARCHAR(100) UNIQUE,
    role_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_roles FOREIGN KEY (role_id)
        REFERENCES roles (id)
);

INSERT INTO roles (nombre, descripcion) VALUES
('admin', 'Administrador del sistema'),
('cliente', 'Usuario cliente'),
('vendedor', 'Usuario vendedor'),
('cajero', 'Usuario cajero'),
('supervisor', 'Supervisor de operaciones');


INSERT INTO usuarios (username, password, role_id)
VALUES (
    'anthony',
    '12345678',
    (SELECT id FROM roles WHERE nombre = 'admin')
);

UPDATE usuarios SET password = '12345678' WHERE username = 'anthony';

