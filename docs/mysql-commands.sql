create database if not exists miturnoDB;

use miturnoDB;


-- ==========================================
-- TABLA: TAMANIO
-- ==========================================
CREATE TABLE tamanio (
  capacidad_x_equipo INT PRIMARY KEY ,
  ancho DECIMAL(5,2),
  largo DECIMAL(5,2)
);

-- ==========================================
-- TABLA: TIPO
-- ==========================================
CREATE TABLE tipo (
  id_tipo INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50)NULL,
  piso VARCHAR(50)NULL,
  techo VARCHAR(50)NULL
);

-- ==========================================
-- TABLA: CANCHA
-- ==========================================
CREATE TABLE cancha (
  id_cancha INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  numero INT NOT NULL,
  nombre VARCHAR(100) NULL,
  tipo_turno VARCHAR(50) NULL,
  id_tipo INT NULL,
  capacidad_x_equipo INT NULL,
  FOREIGN KEY (id_tipo)
    REFERENCES tipo(id_tipo)
    ON DELETE SET NULL,
  FOREIGN KEY (capacidad_x_equipo)
    REFERENCES tamanio(capacidad_x_equipo)
    ON DELETE SET NULL
);

-- ==========================================
-- TABLA: TURNO
-- ==========================================
CREATE TABLE turno (
  id_turno INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  hora_ini TIME,
  hora_fin TIME
);

-- ==========================================
-- TABLA: CANCHA_TURNO  (relación N a N)
-- ==========================================
CREATE TABLE cancha_turno (
  id_cancha INT,
  id_turno INT,
  PRIMARY KEY (id_cancha, id_turno),
  FOREIGN KEY (id_cancha)
    REFERENCES cancha(id_cancha)
    ON DELETE CASCADE,
  FOREIGN KEY (id_turno)
    REFERENCES turno(id_turno)
    ON DELETE CASCADE
);

-- ==========================================
-- TABLA: RESERVA
-- ==========================================
CREATE TABLE reserva (
  id_reserva INT PRIMARY KEY,
  id_turno INT,
  estado_reserva VARCHAR(30),
  fecha_reserva DATE,
  FOREIGN KEY (id_turno)
    REFERENCES turno(id_turno)
    ON DELETE CASCADE
);