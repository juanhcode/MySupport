const pool = require("../db.js");
const {v4:uuidv4} = require('uuid');

const createEmpresa = async (Empresa) => {
  const { NIT, nombre, pais, ciudad, direccion, email } = Empresa;
  try {
    //Fetch all three queries in sequence
    const query = await pool.query("INSERT INTO EMPRESA (ID, NIT, nombre, pais, ciudad, direccion, email) VALUES ($1,$2,$3,$4,$5,$6,$7);",
    [uuidv4(), NIT, nombre, pais, ciudad, direccion, email]);

    //Return the responses from the function
    return query;
  } catch (error) {
    console.log(error);
  }
};

const updatingEmpresa = async (Empresa) => {
    const { NIT, nombre, pais, ciudad, direccion, email, ID } = Empresa;
    try {
      const empresaUpdated = await pool.query(
        `UPDATE EMPRESA
               SET NIT = $1,
               nombre = $2,
               pais = $3,
               ciudad = $4,
               direccion = $5,
               email = $6
               WHERE ID = $7`,
        [NIT, nombre, pais, ciudad, direccion, email, ID]
      );
      return empresaUpdated;
    } catch (error) {
      console.log(error);
    }
  };

  const createArea = async (Area) => {
    const { AREA_ID, NIT, nombre } = Area;
    try {
      //Fetch all three queries in sequence
      const query = await pool.query("INSERT INTO AREA (AREA_ID, NIT, nombre) VALUES ($1,$2,$3);",
      [AREA_ID, NIT, nombre]);
  
      //Return the responses from the function
      return query;
    } catch (error) {
      console.log(error);
    }
  };

  const readArea = async (limite, desde) => {
    try {
      const response = await pool.query(
        "SELECT * FROM AREA ORDER BY area_id OFFSET $1 ROWS FETCH FIRST $2 ROW ONLY",
        [desde, limite]
      );
      return response.rows;
    } catch (error) {
      console.log(error);
    }
  };

  const updatingArea = async (Area) => {
    const { AREA_ID, nombre } = Area;
    try {
      const areaUpdated = await pool.query(
        `UPDATE AREA SET
               nombre = $2
               WHERE AREA_ID = $1`,
        [AREA_ID, nombre]
      );
      return areaUpdated;
    } catch (error) {
      console.log(error);
    }
  };

  const deletingArea = async (area_id) => {
    try {
      const areaDeleted = await pool.query(
        `DELETE FROM AREA WHERE AREA_ID = $1`,
        [area_id]
      );
      return areaDeleted;
    } catch (error) {
      console.log(error);
    }
  };


module.exports = {
    createEmpresa,
    updatingEmpresa,
    createArea,
    readArea,
    updatingArea,
    deletingArea
}