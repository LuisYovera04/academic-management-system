const db = require('./db-config');

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    major VARCHAR(100) NOT NULL,
    semester INTEGER NOT NULL,
    gpa DECIMAL(3,2),
    enrollment_date DATE NOT NULL,
    phone_number VARCHAR(20),
    is_active BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Datos de prueba (15 estudiantes variados)
const seedData = [
  ['Ana', 'Perez', 'ana.perez@uni.edu', 'Ingeniería', 3, 3.8, '2023-01-15', '+584121234567'],
  ['Luis', 'Yovera', 'luis.yovera@uni.edu', 'Sistemas', 5, 4.0, '2022-09-10', '+584149876543'],
  ['Maria', 'Gonzalez', 'maria.gonz@uni.edu', 'Medicina', 2, 3.5, '2023-05-20', '+584241112233'],
  ['Carlos', 'Ramirez', 'carlos.r@uni.edu', 'Derecho', 8, 3.2, '2020-03-12', '+584165556677'],
  ['Sofia', 'Lopez', 'sofia.lopez@uni.edu', 'Arquitectura', 6, 3.9, '2021-11-05', '+584123334455'],
  ['Jesus', 'Fernandez', 'jesus.fer@uni.edu', 'Sistemas', 4, 3.1, '2022-02-28', '+584148889900'],
  ['Elena', 'Torres', 'elena.t@uni.edu', 'Ingeniería', 1, 3.6, '2024-01-10', '+584267778899'],
  ['Pedro', 'Castillo', 'pedro.c@uni.edu', 'Economía', 7, 2.9, '2020-08-15', '+584120001122'],
  ['Lucia', 'Mendez', 'lucia.m@uni.edu', 'Artes', 3, 4.0, '2023-03-01', '+584243332211'],
  ['Miguel', 'Silva', 'miguel.s@uni.edu', 'Sistemas', 9, 3.7, '2019-09-18', '+584169998877'],
  ['Valeria', 'Rojas', 'valeria.r@uni.edu', 'Medicina', 5, 3.4, '2022-01-25', '+584142223344'],
  ['Andres', 'Vargas', 'andres.v@uni.edu', 'Derecho', 2, 3.0, '2023-08-30', '+584126665544'],
  ['Camila', 'Gomez', 'camila.g@uni.edu', 'Ingeniería', 6, 3.8, '2021-04-14', '+584261110099'],
  ['Diego', 'Hernandez', 'diego.h@uni.edu', 'Arquitectura', 4, 3.3, '2022-10-10', '+584147776655'],
  ['Gabriela', 'Diaz', 'gabriela.d@uni.edu', 'Sistemas', 10, 3.9, '2019-01-20', '+584245554433']
];

db.serialize(() => {

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error("Error creando tabla:", err.message);
      return;
    }
    console.log("Verificación de tabla 'students' completada.");

    // how many students are
    db.get("SELECT count(*) as count FROM students", (err, row) => {
      if (err) {
        console.error(err.message);
        return;
      }

      // only insert studends if the table is empty
      if (row.count === 0) {
        console.log("La tabla está vacía. Insertando 15 datos de prueba obligatorios...");
        
        const insertQuery = `
          INSERT INTO students (first_name, last_name, email, major, semester, gpa, enrollment_date, phone_number)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const stmt = db.prepare(insertQuery);
        seedData.forEach((student) => {
          stmt.run(student, (err) => {
            if (err) console.error("Error insertando:", err.message);
          });
        });
        stmt.finalize();
        console.log("¡Datos de prueba insertados!");
        
      } else {
        console.log(`Ya existen ${row.count} estudiantes en la base de datos. No se sobrescribieron los datos.`);
      }
    });
  });
});