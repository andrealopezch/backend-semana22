import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

const data = [
  { id: 1, name: "Bryan", age: 20 },
  { id: 2, name: "Andrea", age: 23 },
  { id: 3, name: "Antonio", age: 21 },
  { id: 4, name: "Baltazar", age: 22 },
];

app.get("/students", (req, res) => {
  res.send(data);
});

app.post("/students", (req, res) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).send({ message: "Nombre y edad son requeridos" });
  }

  const id = data.length + 1;
  const newStudent = { id, name, age };

  data.push(newStudent);

  res
    .status(201)
    .send({ message: "Estudiante añadido correctamente", data: newStudent });
});

app.delete("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = data.findIndex((student) => student.id == studentId);

  console.log(index);
  if (index >= 0) {
    data.splice(index, 1);
    console.log(data);
    return res.send({
      message: "El estudiante de id: " + req.params.id + " ha sido eliminado",
    });
  }
  console.log(data);
  return res.status(200).send({
    message: "El Id " + req.params.id + " de Estudiante no ha sido encontrado",
  });
});

app.patch("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const { age } = req.body;

  const student = data.find((item) => item.id === id);
  if (student) {
    student.name = name;
    student.age = age;
    return res.send({ message: "Proceso realizado", data: student });
  } else {
    return res.status(404).send({
      data: "El Id " + req.params.id + " de Estudiante no ha sido encontrado",
    });
  }
});

app.listen(port, () => {
  console.log("Servidor escuchando al puerto: " + port);
});
