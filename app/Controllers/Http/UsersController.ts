import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Hash from "@ioc:Adonis/Core/Hash";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";

export default class UsersController {
  public async index({ view, auth }: HttpContextContract) {
    const user = await User.query().where({ dihapus: 0 });

    const nama = user.map((d, idx) => {
      return { ...d.toJSON(), idx: idx + 1 };
    });

    return view.render("user.index", {
      Admin: nama,
      nama_Mahasiswa: "Mahasiswa",
    });
  }

  public async editview({ view, params }) {
    const id = params.id;
    const user = await User.query()
      .where({ dihapus: 0 })
      .andWhere({ id })
      .firstOrFail();
    return view.render("user.edit", { user });
  }

  public async login({
    auth,
    request,
    response,
    session,
  }: HttpContextContract) {
    const { email, password } = request.all();

    try {
      const cek = (await auth.attempt(email, password)).toJSON();
      console.log(cek);
      session.flash("notification", "email/password yang anda masukkan salah");
      session.flash(
        "notification_login",
        "email/password yang anda masukkan salah"
      );
      session.put("authenticated", true);
      if (cek.role == "admin") {
        console.log("admin");
        return response.redirect("/user");
      } else {
        console.log("mahasiswa");
        return response.redirect("/mahasiswa/dashboard");
      }
    } catch (error) {
      console.log(error);
      return response.redirect("/login");
    }
  }

  public async store({ request, response }: HttpContextContract) {
    const { nama, umur, email, nim, password } = request.all();

    await User.create({
      nama,
      umur,
      email,
      nim,
      password,
      dihapus: 0,
    });

    return response.redirect("/user");
  }

  public async show({ view, params }: HttpContextContract) {
    const id = params.id;
    const user = await User.query()
      .where({ dihapus: 0 })
      .andWhere({ id })
      .firstOrFail();

    return view.render("user.show", { user });
  }

  public async edit({}: HttpContextContract) {}

  public async update({
    request,
    response,
    params,
    session,
  }: HttpContextContract) {
    const { nama, nim, daftarUlang, status } = request.all();
    const id = params.id;

    await User.query().where({ id }).update({
      nama,
      nim,
      status,
      daftarUlang,
      dihapus: 0,
    });
    session.flash({ notifivation: "Data Berhasil Diupdate!" });

    return response.redirect(`/user/`);
  }

  public async destroy({}: HttpContextContract) {}

  public async register({ request, response }: HttpContextContract) {
    const { nama, umur, email, password, nim } = request.all();

    await User.create({
      nama,
      umur,
      email,
      password,
      role: "Mahasiswa",
      nim,
      dihapus: 0,
    });
    return response.redirect("/login");
  }

  public async delete({ response, params, session }: HttpContextContract) {
    const id = params.id;

    await User.query().where({ id }).update({
      dihapus: 1,
    });
    session.flash({ notifivation: "Data Berhasil Diupdate!" });

    return response.redirect(`/user`);
  }
}
