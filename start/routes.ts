/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async ({ view }) => {
  return view.render("welcome");
});

Route.get("/login", async ({ view }) => {
  return view.render("login");
});

Route.get("/register", async ({ view }) => {
  return view.render("register");
});

Route.post("/login", "UsersController.login").as("login");
Route.post("/register", "UsersController.register").as("register");

Route.get("/kelas", "KelasController.index");
Route.get("/kelas/:id", "KelasController.show").as("kelas.detail");

Route.post("/kelas/create", "KelasController.store").as("kelas.store");
Route.post("/kelas/update/:id", "KelasController.update").as("kelas.update");
Route.get("/kelas/delete/:id", "KelasController.delete").as("kelas.delete");

Route.post("/siswa/create", "KelasController.store").as("siswa.store");
Route.post("/siswa/update/:id", "KelasController.update").as("siswa.update");
Route.get("/siswa/delete/:id", "KelasController.delete").as("siswa.delete");

Route.get("/bola", "BolasController.index");

Route.get("/Teacher", "TeachersController.index");
Route.get("/Teacher/:id", "TeachersController.show").as("Teachers.detail");

Route.post("/Teacher/create", "TeachersController.store").as("Teachers.store");
Route.post("/Teacher/update/:id", "TeachersController.update").as(
  "Teachers.update"
);
Route.get("/Teacher/delete/:id", "TeachersController.delete").as(
  "Teachers.delete"
);

Route.get("/user", "UsersController.index");
Route.get("/user/:id", "UsersController.show").as("user.detail");

Route.post("/user/create", "UsersController.store").as("user.store");
Route.get("/user/update/:id", "UsersController.editview").as("user.updateview");
Route.post("/user/update/:id", "UsersController.update").as("user.update");
Route.get("/user/delete/:id", "UsersController.delete").as("user.delete");

Route.get("/mahasiswa/dashboard", "MahasiswasController.index");
