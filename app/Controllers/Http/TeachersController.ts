import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Teacher from "App/Models/Teacher";

export default class TeachersController {
  public async index({ view, auth }: HttpContextContract) {
    const teacher = await Teacher.query().where({ dihapus: 0 });

    const user = await auth?.user?.toJSON();
    console.log(user);

    const nama = teacher.map((d, idx) => {
      return { ...d.toJSON(), idx: idx + 1 };
    });

    return view.render("teachers.index", {
      Guru: nama,
      nama_Pelajaran: "pelajaran",
    });
  }
  public async store({ request, response }: HttpContextContract) {
    const { nama, MataPelajaran, deskripsi } = request.all();

    await Teacher.create({
      nama,
      mataPelajaran: MataPelajaran,
      deskripsi,
      dihapus: 0,
    });

    return response.redirect("/Teacher");
  }
  public async show({ view, params }: HttpContextContract) {
    const id = params.id;
    const teacher = await Teacher.query()
      .where({ dihapus: 0 })
      .andWhere({ id })
      .firstOrFail();

    return view.render("teachers.show", { teacher });
  }
  public async update({
    request,
    response,
    params,
    session,
  }: HttpContextContract) {
    const { nama, MataPelajaran, deskripsi } = request.all();
    const id = params.id;

    await Teacher.query().where({ id }).update({
      nama,
      mataPelajaran: MataPelajaran,
      deskripsi,
      dihapus: 0,
    });
    session.flash({ notifivation: "Data Berhasil Diupdate!" });

    return response.redirect(`/Teacher/${id}`);
  }

  public async delete({ response, params, session }: HttpContextContract) {
    const id = params.id;

    await Teacher.query().where({ id }).update({
      dihapus: 1,
    });
    session.flash({ notifivation: "Data Berhasil Diupdate!" });

    return response.redirect(`/Teacher`);
  }
}
