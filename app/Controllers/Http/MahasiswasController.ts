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


}
