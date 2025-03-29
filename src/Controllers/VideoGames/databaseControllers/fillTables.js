// En un archivo donde manejas las operaciones relacionadas con el llenado de datos (por ejemplo, fillData.js)
import dataBulk from './dataBulk.js'
import { Genre, Platform, Videogame, User } from '../../../database.js' // Importa tus modelos de tablas
import { genresData, platformsData } from '../../../../Data/indexData.js' // Ruta relativa al archivo indexData (reune la informacion y la exporta en un objeto)
import vgBulk from './vgBulk.js'

// Usa la función dataBulk para diferentes tablas y conjuntos de datos
const fillTables = async (table, data) => {
  await dataBulk(Genre, genresData)
  await dataBulk(Platform, platformsData)
  const existdatas = await Videogame.findAll()
  if (existdatas.length === 0) {
    // Hacer una lectura de la data.json para llenar la tabla
    await vgBulk()
    console.log('Videogame table filled successfully!')
  } else {
    console.log('The Videogame table already contains data.')//
  }
}
export default fillTables
