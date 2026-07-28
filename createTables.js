const db = require("./config/db");

const createTables = async () => {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const tasksTable = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      task VARCHAR(255) NOT NULL,
      completed BOOLEAN DEFAULT FALSE,
      user_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  db.query(usersTable, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
      return;
    }

    console.log("✅ users table created");

    db.query(tasksTable, (err) => {
      if (err) {
        console.error("Error creating tasks table:", err);
        return;
      }

      console.log("✅ tasks table created");
      process.exit();
    });
  });
};

createTables();