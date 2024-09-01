const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const student = require("./Models/student"); // Model name is 'student'
const cors = require("cors");

const uri =
  "mongodb+srv://DarshBhoraniya:Darsh8160@master.midqv.mongodb.net/StudentData?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    // GET route to fetch all students
    app.get("/Student/Getall", async (req, res) => {
      try {
        const data = await student.find();
        res.send(data);
      } catch (error) {
        res.status(500).send({ error: "Error fetching students." });
      }
    });
    app.get("/Student/Getall/:id", async (req, res) => {
      const data = await student.findOne({ Studentid: req.params.id });
      res.send(data);
    });

    // POST route to add a new student
    app.post("/Student/Post/", async (req, res) => {
      const st = new student({
        Studentid: req.body.Studentid,
        StudentName: req.body.StudentName,
        StudentAge: req.body.StudentAge,
        Email: req.body.Email,
        MobileNumber: req.body.MobileNumber,
      });

      const data = await st.save();
      res.send(data);
    });

    app.put("/Student/Put/:id", async (req, res) => {
      const data = await student.findOne({ Studentid: req.params.id });
      data.StudentName = req.body.StudentName;
      data.StudentAge = req.body.StudentAge;
      data.Email = req.body.Email;
      data.MobileNumber = req.body.MobileNumber;
      const response = await data.save();
      res.send(response);
    });

    app.delete("/Student/Delete/:id", async (req, res) => {
      const data = await student.deleteOne({ Studentid: req.params.id });
      res.send(data);
    });

    // Start the server
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
