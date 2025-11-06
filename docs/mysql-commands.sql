create database if not exists heroclash4geeks;

use heroclash4geeks;

## uncomment if you are not using docker
## create user if not exists dsw@'%' identified by 'dsw';
## grant select, update, insert, delete on heroclash4geeks.* to dsw@'%';


create table if not exists `heroclash4geeks`.`characters` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `characterClass` VARCHAR(255) NULL,
  `attack` INT UNSIGNED NULL,
  `hp` INT UNSIGNED NULL,
  `level` INT UNSIGNED NULL,
  `mana` INT UNSIGNED NULL,
  PRIMARY KEY (`id`));

create table if not exists `heroclash4geeks`.`characterItems` (
  `characterId` INT UNSIGNED NOT NULL,
  `itemName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`characterId`, `itemName`),
  CONSTRAINT `fk_characterItem_character`
    FOREIGN KEY (`characterId`)
    REFERENCES `heroclash4geeks`.`characters` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE);

insert into heroclash4geeks.characters values(1,'Anakin Skywalker','Fallen Jedi',11,101,11,22);
insert into heroclash4geeks.characterItems values(1,'Lightsaber');
insert into heroclash4geeks.characterItems values(1,'Death Star');


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
  id_tamanio INT NULL,
  FOREIGN KEY (id_tipo)
    REFERENCES tipo(id_tipo)
    ON DELETE SET NULL,
  FOREIGN KEY (id_tamanio)
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