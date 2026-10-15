// const { Pool } = require("pg");

// const pool = new Pool({
//   connectionString: process.env.DATABASE_LOCAL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// pool.on("connect", () => {
//   console.log("PostgreSQL connected");
// });

// pool.on("error", (err) => {
//   console.error("PostgreSQL error:", err.message);
// });

// module.exports = pool;
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_LOCAL,
  ...(process.env.NODE_ENV === "production" && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
});

pool.on("connect", () => {
  console.log("PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("PostgreSQL error:", err.message);
});

module.exports = pool;