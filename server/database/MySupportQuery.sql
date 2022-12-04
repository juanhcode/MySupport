CREATE TABLE USUARIO (
	ID VARCHAR(40) PRIMARY KEY,
	nombre VARCHAR(30) NOT NULL,
	apellidos VARCHAR(50) NOT NULL,
	password VARCHAR(200) NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	rol VARCHAR(20) NOT NULL,
	estado BOOLEAN NOT NULL
);

CREATE TABLE SUPERVISOR (
	ID VARCHAR(40) PRIMARY KEY,
	CONSTRAINT FK_SUPERVISOR_ID FOREIGN KEY (ID)
	REFERENCES USUARIO (ID)
);


CREATE TABLE AGENTE (
	ID VARCHAR(40) PRIMARY KEY,
	CONSTRAINT FK_AGENTE_ID FOREIGN KEY (ID)
	REFERENCES USUARIO (ID)
);


CREATE TABLE SUPERVISOR_ASIGNA_AGENTE(
	AGENTE_ID VARCHAR(40),
	SUPERVISOR_ID VARCHAR(40),
	PRIMARY KEY (AGENTE_ID, SUPERVISOR_ID),
	CONSTRAINT FK_SUPERVISOR_ASIGNA_AGENTE_AGENTE_ID FOREIGN KEY (AGENTE_ID)
	REFERENCES AGENTE (ID),
	CONSTRAINT FK_SUPERVISOR_ASIGNA_AGENTE_SUPERVISOR_ID FOREIGN KEY (SUPERVISOR_ID)
	REFERENCES SUPERVISOR (ID)
);

CREATE TABLE EMPRESA(
	ID VARCHAR(40) UNIQUE,
	NIT INT PRIMARY KEY,
	nombre VARCHAR(30) NOT NULL,
	pais VARCHAR(30) NOT NULL,
	ciudad VARCHAR(30) NOT NULL,
	direccion VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL
);

CREATE TABLE AREA(
	AREA_ID INT PRIMARY KEY,
	NIT INT,
	nombre VARCHAR(30) NOT NULL,
	CONSTRAINT FK_AREA_NIT FOREIGN KEY (NIT)
	REFERENCES EMPRESA (NIT)
);


CREATE TABLE EMPLEADO (
	ID VARCHAR(40) PRIMARY KEY,
	AREA_ID INT NOT NULL,
	CONSTRAINT FK_EMPLEADO_ID FOREIGN KEY (ID)
	REFERENCES USUARIO (ID),
	CONSTRAINT FK_EMPLEADO_AREA_ID FOREIGN KEY (AREA_ID)
	REFERENCES AREA (AREA_ID)
);

CREATE TABLE ESTADO_TICKET (
	ESTADO_ID VARCHAR(2) PRIMARY KEY,
	nombre VARCHAR(20) NOT NULL
);

CREATE TABLE TICKET(
	TICKET_ID VARCHAR(40) PRIMARY KEY,
	EMPLEADO_ID VARCHAR(40),
	AGENTE_ID VARCHAR(40),
	ESTADO_ID VARCHAR(2),
	titulo VARCHAR(50) NOT NULL,
	descripcion VARCHAR(100) NOT NULL,
	empresa VARCHAR(50) NOT NULL,
	imagenURL VARCHAR(256) NOT NULL,
	fecha_inicio DATE NOT NULL,
	fecha_final DATE,
	estado_borrado BOOLEAN NOT NULL,
	CONSTRAINT FK_TICKET_EMPLEADO_ID FOREIGN KEY (EMPLEADO_ID)
	REFERENCES EMPLEADO (ID),
	CONSTRAINT FK_TICKET_AGENTE_ID FOREIGN KEY (AGENTE_ID)
	REFERENCES AGENTE (ID),
	CONSTRAINT FK_TICKET_ESTADO_ID FOREIGN KEY (ESTADO_ID)
	REFERENCES ESTADO_TICKET (ESTADO_ID)
);

CREATE TABLE TELEFONO (
	NIT INT,
	telefono VARCHAR(10) NOT NULL,
	PRIMARY KEY (NIT, telefono),
	CONSTRAINT FK_TELEFONO_NIT FOREIGN KEY (NIT)
	REFERENCES EMPRESA (NIT)
);

CREATE TABLE COMENTARIO (
	TICKET_ID VARCHAR(40),
	COMENTARIO TEXT, 
	CONSTRAINT FK_COMENTARIO_TICKET_ID FOREIGN KEY (TICKET_ID) 
	REFERENCES TICKET (TICKET_ID)
);

--Estado de tickets
INSERT INTO ESTADO_TICKET (ESTADO_ID,nombre) VALUES ('O','Abierto');
INSERT INTO ESTADO_TICKET (ESTADO_ID,nombre) VALUES ('C','Cerrado');
INSERT INTO ESTADO_TICKET (ESTADO_ID,nombre) VALUES ('A','Aprobado');


---Creacion de una empresa
INSERT INTO EMPRESA (NIT,nombre,pais,ciudad,direccion,email) VALUES (6512343, 'Ecopetrol','Colombia','Barrancabermeja','carrera 20 #40 53','centraldereferencia@ecopetrol.com.co');

---Creacion de una Area
INSERT INTO AREA (AREA_ID,NIT,nombre) VALUES (111,6512343,'Marketing');

---Creacion de un Usuario
INSERT INTO USUARIO (ID,nombre,apellidos,password,email,rol,estado) VALUES (1,'Juan','Hoyos','12345','juanhoyos@ecopetrol.com.co','Empleado',true);

---Creacion de un Empleado
INSERT INTO EMPLEADO (ID,AREA_ID) VALUES (1,111);

---Ticket abierto
INSERT INTO TICKET (TICKET_ID,EMPLEADO_ID,titulo,descripcion,imagenURL,fecha_inicio,estado,ESTADO_ID) VALUES (1,1,'I need help','Help me','https://img.freepik.com/foto-gratis/dos-tickets-amarillos_1101-56.jpg?1','2022-11-06',true,'O');

---Ticket Cerrado
INSERT INTO TICKET (TICKET_ID,EMPLEADO_ID,titulo,descripcion,imagenURL,fecha_inicio,estado,ESTADO_ID) VALUES (2,1,'Ticket cerrado','El tcicket es cerrado','https://img.freepik.com/foto-gratis/dos-tickets-amarillos_1101-56.jpg?1','2022-11-07',true,'C');

--Ticket aprobado
INSERT INTO TICKET (TICKET_ID,EMPLEADO_ID,titulo,descripcion,imagenURL,fecha_inicio,estado,ESTADO_ID) VALUES (3,1,'Ticket aprobado','El tcicket es aprobado','https://img.freepik.com/foto-gratis/dos-tickets-amarillos_1101-56.jpg?1','2022-11-07',true,'A');

--Conexion a bd