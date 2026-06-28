// const express = require('express')
// const cors = require('cors')
// require('dotenv').config()

// const app = express()
// app.use(cors())
// app.use(express.json())

// app.get('/api/health', (req, res) => {
//   res.json({ status: 'Planet Atlas is alive' })
// })

// app.listen(5000, () => console.log('Server running on port 5000'))



// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Health Check Route
// app.get("/api/health", (req, res) => {
//   res.json({
//     status: "Planet Atlas is alive",
//   });
// });

// // Ask Route
// app.post("/api/ask", (req, res) => {
//   console.log("BODY:", req.body);

//   const { question } = req.body;

//   // Handle empty questions
//   if (!question) {
//     return res.status(400).json({
//       error: "Question is required",
//     });
//   }

//   res.json({
//     answer: `You asked: "${question}"`,
//     sources: ["Demo Source"],
//     timeline: [
//       {
//         year: "322 BCE",
//         event: "Mauryan Empire established",
//       },
//     ],
//   });
// });

// // Start Server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });