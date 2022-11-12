CREATE TABLE USUARIO (
	ID INT PRIMARY KEY,
	nombre VARCHAR(30),
	apellidos VARCHAR(50),
	password VARCHAR(50),
	email VARCHAR(50),
	rol VARCHAR(20),
	estado BOOLEAN
);

CREATE TABLE SUPERVISOR (
	ID INT PRIMARY KEY,
	CONSTRAINT FK_SUPERVISOR_ID FOREIGN KEY (ID)
	REFERENCES USUARIO (ID)
);


CREATE TABLE AGENTE (
	ID INT PRIMARY KEY,
	CONSTRAINT FK_AGENTE_ID FOREIGN KEY (ID)
	REFERENCES USUARIO (ID)
);


CREATE TABLE SUPERVISOR_ASIGNA_AGENTE(
	AGENTE_ID INT,
	SUPERVISOR_ID INT,
	PRIMARY KEY (AGENTE_ID, SUPERVISOR_ID),
	CONSTRAINT FK_SUPERVISOR_ASIGNA_AGENTE_AGENTE_ID FOREIGN KEY (AGENTE_ID)
	REFERENCES AGENTE (ID),
	CONSTRAINT FK_SUPERVISOR_ASIGNA_AGENTE_SUPERVISOR_ID FOREIGN KEY (SUPERVISOR_ID)
	REFERENCES SUPERVISOR (ID)
);

CREATE TABLE EMPRESA(
	NIT INT PRIMARY KEY,
	nombre VARCHAR(30),
	pais VARCHAR(30),
	ciudad VARCHAR(30),
	direccion VARCHAR(50),
	email VARCHAR(50)
);

CREATE TABLE AREA(
	AREA_ID INT PRIMARY KEY,
	NIT INT,
	nombre VARCHAR(30),
	CONSTRAINT FK_AREA_NIT FOREIGN KEY (NIT)
	REFERENCES EMPRESA (NIT)
);


CREATE TABLE EMPLEADO (
	ID INT PRIMARY KEY,
	AREA_ID INT,
	CONSTRAINT FK_EMPLEADO_ID FOREIGN KEY (ID)
	REFERENCES USUARIO (ID),
	CONSTRAINT FK_EMPLEADO_AREA_ID FOREIGN KEY (AREA_ID)
	REFERENCES AREA (AREA_ID)
);

CREATE TABLE ESTADO_TICKET (
	ESTADO_ID VARCHAR(2) PRIMARY KEY,
	nombre VARCHAR(20)
);

CREATE TABLE TICKET(
	TICKET_ID INT PRIMARY KEY,
	EMPLEADO_ID INT,
	AGENTE_ID INT,
	ESTADO_ID VARCHAR(2),
	titulo VARCHAR(50),
	descripcion VARCHAR(100),
	imagenURL VARCHAR(256),
	fecha_inicio DATE,
	fecha_final DATE,
	estado BOOLEAN,
	CONSTRAINT FK_TICKET_EMPLEADO_ID FOREIGN KEY (EMPLEADO_ID)
	REFERENCES EMPLEADO (ID),
	CONSTRAINT FK_TICKET_AGENTE_ID FOREIGN KEY (AGENTE_ID)
	REFERENCES AGENTE (ID),
	CONSTRAINT FK_TICKET_ESTADO_ID FOREIGN KEY (ESTADO_ID)
	REFERENCES ESTADO_TICKET (ESTADO_ID)
);

CREATE TABLE TELEFONO (
	NIT INT,
	telefono VARCHAR(10),
	PRIMARY KEY (NIT, telefono),
	CONSTRAINT FK_TELEFONO_NIT FOREIGN KEY (NIT)
	REFERENCES EMPRESA (NIT)
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