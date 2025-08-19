const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
  { id: 1, name: "Kunal", email: "kunal@example.com" },
  { id: 2, name: "Vibhute", email: "vibhute@example.com" },
];

app.get("/get-data", (req, res) => {
  res.status(200).json({ message: "All data", data: users });
});

app.post("/add", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(200).json({ message: "Data Added", data: newUser });
});

app.delete("/delete/:id", (req, res) => {
  users = users.filter((item) => item.id != req.params.id);
  res.status(200).json({ message: "User Deleted" });
});

app.put("/update/:id", (req, res) => {
  const user = users.find((item) => item.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({message : "User not found"})
  }
  const {name, email} = req.body || {}
  user.name = name || user.name
  user.email = email || user.email
  res.status(200).json({ message: "User Updated" });
});

app.listen(PORT, () => {
  console.log(`Server Running or port : ${PORT}`);
});
