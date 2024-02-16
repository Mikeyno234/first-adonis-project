import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class MahasiswasController {
  public async index({ view, params,auth }: HttpContextContract) {
    //const User = await User.query().where({ dihapus: 0 });
    const id = params.id
    const user = auth?.user?.toJSON();
    console.log(user,'sssss')
    return view.render("mahasiswa.mahasiswa",{user})
  }

  public async dataview({ view, auth }: HttpContextContract) {
    const user = await User.query().where({ dihapus: 0 });

    const nama = user.map((d, idx) => {
      return { ...d.toJSON(), idx: idx + 1 };
    });
    

    return view.render("mahasiswa.datamahasiswa", {
      Admin: nama,
      nama_Mahasiswa: "Mahasiswa",
    });
  }


}
