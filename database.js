const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cargaUsuarios",
  password: "pOsT4042",
  port: 5432,
});

pool
  .connect()
  .then(() => {
    console.log("Conectado a PostgreSQL");

    const insertQuery = `
      INSERT INTO usuarios 
      (correo, nombre, genero, fecha_nacimiento, cargo, fecha_ingreso, area_id, subarea_id, criticidad, monitor, administrador, adminglobal) 
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;

    const values = [
      "example@email.com",
      "John Doe",
      "Male",
      "1990-01-01",
      "Developer",
      "2023-09-05",
      1,
      1,
      1,
      "s",
      "s",
      "s",
    ];

    // Execute the INSERT query
    return pool.query(insertQuery, values);

    /*
    const insertQuery = `INSERT INTO usuarios (correo, nombre, genero, fecha_nacimiento, cargo, fecha_ingreso, area_id, subarea_id, criticidad, monitor, administrador, adminglobal) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

    for (let i = 1; i < contentExcel.length; i++) {
      const values = contentExcel[i];
      try {
        await pool.query(insertQuery, values);
        console.log("Registro insertado con éxito:", values);
      } catch (error) {
        console.error("Error al insertar el registro:", error);
      }
    }
    */
  })
  .catch((err) => console.error("Error de conexión:", err))
  .finally(() => pool.end());
