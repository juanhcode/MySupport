CREATE TABLE ROL (
	ROL_ID INT PRIMARY KEY,
	nombre VARCHAR(30)
);

CREATE TABLE SUPERVISOR (
	SUPERVISOR_ID INT PRIMARY KEY,
	ROL_ID INT,
	nombre VARCHAR(30),
	apellidos VARCHAR(50),
	password VARCHAR(50),
	email VARCHAR(50),
	estado BOOLEAN,
	CONSTRAINT FK_SUPERVISOR_ROL_ID FOREIGN KEY (ROL_ID)
	REFERENCES ROL (ROL_ID)
);


CREATE TABLE AGENTE (
	AGENTE_ID INT PRIMARY KEY,
	ROL_ID INT,
	nombre VARCHAR(30),
	apellidos VARCHAR(50),
	password VARCHAR(50),
	email VARCHAR(50),
	estado BOOLEAN,
	CONSTRAINT FK_AGENTE_ROL_ID FOREIGN KEY (ROL_ID)
	REFERENCES ROL (ROL_ID)
);


CREATE TABLE SUPERVISOR_ASIGNA_AGENTE(
	AGENTE_ID INT,
	SUPERVISOR_ID INT,
	PRIMARY KEY (AGENTE_ID, SUPERVISOR_ID),
	CONSTRAINT FK_SUPERVISOR_ASIGNA_AGENTE_AGENTE_ID FOREIGN KEY (AGENTE_ID)
	REFERENCES AGENTE (AGENTE_ID),
	CONSTRAINT FK_SUPERVISOR_ASIGNA_AGENTE_SUPERVISOR_ID FOREIGN KEY (SUPERVISOR_ID)
	REFERENCES SUPERVISOR (SUPERVISOR_ID)
);

CREATE TABLE AREA(
	AREA_ID INT PRIMARY KEY,
	nombre VARCHAR(30)
);


CREATE TABLE EMPRESA(
	NIT INT PRIMARY KEY,
	nombre VARCHAR(30),
	pais VARCHAR(30),
	ciudad VARCHAR(30),
	direccion VARCHAR(50),
	email VARCHAR(50)
);

CREATE TABLE CONTIENE_EMPRESA_AREA (
	NIT INT,
	AREA_ID INT,
	PRIMARY KEY(NIT, AREA_ID),
	CONSTRAINT FK_CONTIENE_EMPRESA_AREA_NIT FOREIGN KEY (NIT) REFERENCES EMPRESA(NIT),
	CONSTRAINT FK_CONTIENE_EMPRESA_AREA_AREA_ID FOREIGN KEY (AREA_ID) REFERENCES AREA (AREA_ID)
);

CREATE TABLE EMPLEADO (
	EMPLEADO_ID INT PRIMARY KEY,
	ROL_ID INT,
	AREA_ID INT,
	nombre VARCHAR(30),
	apellidos VARCHAR(50),
	password VARCHAR(50),
	email VARCHAR(50),
	estado BOOLEAN,
	CONSTRAINT FK_EMPLEADO_ROL_ID FOREIGN KEY (ROL_ID)
	REFERENCES ROL (ROL_ID),
	CONSTRAINT FK_EMPLEADO_AREA_ID FOREIGN KEY (AREA_ID)
	REFERENCES AREA (AREA_ID)
);

CREATE TABLE TICKET(
	TICKET_ID INT PRIMARY KEY,
	EMPLEADO_ID INT,
	AGENTE_ID INT,
	titulo VARCHAR(50),
	descripcion VARCHAR(100),
	imagenURL VARCHAR(256),
	fecha_inicio DATE,
	fecha_final DATE,
	estado BOOLEAN,
	CONSTRAINT FK_TICKET_EMPLEADO_ID FOREIGN KEY (EMPLEADO_ID)
	REFERENCES EMPLEADO (EMPLEADO_ID),
	CONSTRAINT FK_TICKET_AGENTE_ID FOREIGN KEY (AGENTE_ID)
	REFERENCES AGENTE (AGENTE_ID)
);

CREATE TABLE TELEFONO (
	NIT INT,
	telefono VARCHAR(10),
	PRIMARY KEY (NIT, telefono),
	CONSTRAINT FK_TELEFONO_NIT FOREIGN KEY (NIT)
	REFERENCES EMPRESA (NIT)
);

CREATE TABLE ESTADO (
	id VARCHAR(5),
	nombre VARCHAR(50),
	PRIMARY KEY (id)
);


INSERT INTO ESTADO (id,nombre) VALUES ('O','Abierto');
INSERT INTO ESTADO (id,nombre) VALUES ('C','Cerrado');
INSERT INTO ESTADO (id,nombre) VALUES ('A','Aprobado');


ALTER TABLE TICKET
ADD COLUMN estadoDelTicket VARCHAR(5) CONSTRAINT FK_ESTADO_TICKET FOREIGN KEY (estadoDelTicket) REFERENCES ESTADO (id);

ALTER TABLE TICKET ALTER COLUMN estadoDelTicket TYPE VARCHAR(5);
ALTER TABLE TICKET ADD CONSTRAINT FK_TICKET_ESTADODELTICKET FOREIGN KEY (estadoDelTicket) REFERENCES ESTADO (id)

ALTER TABLE TICKET
ADD estadoDelTicket CHAR CONSTRAINT FK_ESTADO_TICKET FOREIGN KEY (estadoDelTicket) REFERENCES ESTADO(id);


ALTER TABLE TICKET ADD estadoDelTicket CHAR(1) FOREIGN KEY (estadoDelTicket) REFERENCES ESTADO(id);







INSERT INTO EMPRESA (NIT,nombre,pais,ciudad,direccion,email) VALUES (6512343, 'Ecopetrol','Colombia','Barrancabermeja','carrera 20 #40 53','centraldereferencia@ecopetrol.com.co');

INSERT INTO AREA (AREA_ID,nombre) VALUES (111,'Marketing');

INSERT INTO ROL (ROL_ID,nombre) VALUES (1,'Empleado');
INSERT INTO ROL (ROL_ID,nombre) VALUES (2,'Supervisor');
INSERT INTO ROL (ROL_ID,nombre) VALUES (3,'Agente');


INSERT INTO SUPERVISOR (SUPERVISOR_ID,ROL_ID,nombre,apellidos,password,email,estado) VALUES (1,2,'Wilson','Montoya','12345','wilsonc@ecopetrol.com.co',true);


INSERT INTO AGENTE (AGENTE_ID,ROL_ID,nombre,apellidos,password,email,estado) VALUES (1,3,'Pablo','Lopez','12345','pablol@ecopetrol.com.co',true);

INSERT INTO SUPERVISOR_ASIGNA_AGENTE (AGENTE_ID,SUPERVISOR_ID) VALUES (1,1);

INSERT INTO CONTIENE_EMPRESA_AREA (NIT,AREA_ID) VALUES (6512343,111);


INSERT INTO EMPLEADO (EMPLEADO_ID,ROL_ID,AREA_ID,nombre,apellidos,password,email,estado) VALUES (1,1,111,'Juan','Hoyos','12345','juanhoyos@ecopetrol.com.co',true);


---Ticket abierto
INSERT INTO TICKET (TICKET_ID,EMPLEADO_ID,titulo,descripcion,imagenURL,fecha_inicio,estadoDelTicket) VALUES (1,1,'I need help','Help me','https://img.freepik.com/foto-gratis/dos-tickets-amarillos_1101-56.jpg?1','2022-11-06','O');


---Ticket Cerrado
INSERT INTO TICKET (TICKET_ID,EMPLEADO_ID,titulo,descripcion,imagenURL,fecha_inicio,estadoDelTicket) VALUES (2,1,'Ticket cerrado','El tcicket es cerrado','https://img.freepik.com/foto-gratis/dos-tickets-amarillos_1101-56.jpg?1','2022-11-07','C');


--Ticket aprobado
INSERT INTO TICKET (TICKET_ID,EMPLEADO_ID,titulo,descripcion,imagenURL,fecha_inicio,estadoDelTicket) VALUES (3,1,'Ticket aprobado','El tcicket es aprobado','https://img.freepik.com/foto-gratis/dos-tickets-amarillos_1101-56.jpg?1','2022-11-07','A');

--Conexion a bd


