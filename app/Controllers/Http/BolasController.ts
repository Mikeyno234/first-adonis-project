import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View';
import Bola from 'App/Models/Bola';


export default class BolasController {
  public async index({}: HttpContextContract) {const bola = await Bola.all();

    return View.render("bola.kelas.index", { bola: bola });}

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const { Judul, linkFile, isi, foto, dihapus } = request.all();

    await Bola.create({
      Judul,
      linkFile: linkFile,
      isi,
      foto,
      dihapus,
    });

    return response.redirect("/bola");
  }

   public async show({}: HttpContextContract) {}

   public async edit({}: HttpContextContract) {}

   public async update({}: HttpContextContract) {}

   public async destroy({}: HttpContextContract) {}
  }
