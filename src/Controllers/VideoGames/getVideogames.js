import { Videogame, Genre, Platform } from '../../database.js'
import { Op } from 'sequelize'

const getVideogames = async (page = 0, size = 5, platforms, genres, minPrice, maxPrice, order, name) => {
  // page,
  // size,
  // filters,
  // platformsFilters,
  // genresFilters,
  // orderFilter,
  // req,
  // res

  console.log('order: ' + order)

  const filters = { enable: true, deleteAt: false }
  const platformsFilters = {}
  const genresFilters = {}
  const orderFilter = []

  // Verificar si se solicita algun ordenamiento
  if (order && order !== 'none') {
    const auxArray = order.split('_')
    console.log('auxArray: ' + auxArray)
    switch (auxArray[1]) {
      case 'N':
        orderFilter.push(['name', auxArray[0]])
        break
      case 'P':
        orderFilter.push(['price', auxArray[0]])
        break
    }
  }

  // Verifica si se proporciona el parámetro de filtro 'platform'
  if (platforms) {
    const arrayPlatforms = platforms.split(',')
    platformsFilters.name = { [Op.in]: arrayPlatforms }
  }

  // Verifica si se proporciona el parámetro de filtro 'genre'
  if (genres) {
    const arrayGenres = genres.split(',')
    genresFilters.name = { [Op.in]: arrayGenres }
  }

  // Verifica si se proporciona el parámetro de filtro 'precio'
  if (minPrice && maxPrice) {
    filters.price = { [Op.between]: [+minPrice, +maxPrice] }
  } else if (minPrice) {
    filters.price = { [Op.gte]: +minPrice }
  } else if (maxPrice) {
    filters.price = { [Op.lte]: +maxPrice }
  }

  // Verificar si se esta buscando algun nombre en particular
  if (name) {
    filters.name = { [Op.iLike]: `%${name}%` }
  }

  page = +page
  size = +size

  try {
    const { count, rows } = await Videogame.findAndCountAll({
      where: filters,
      order: orderFilter,
      include: [
        {
          model: Genre,
          attributes: ['name'],
          where: {
            ...genresFilters,
            deleteAt: false // Agrega la condición deleteAt: false para Genre
          },
          // where: genresFilters,
          /* where: {
                        //name: ["Actions", "Puzzle", "Indie"]
                        name: { [Op.in]: ["Actions", "Puzzle", "Indie"] }
                    }, */
          through: {
            attributes: []
          }
        },
        {
          model: Platform,
          attributes: ['name'],
          where: {
            ...platformsFilters,
            deleteAt: false // Agrega la condición deleteAt: false para Platform
          },
          // where: platformsFilters,
          through: {
            attributes: []
          }
        }
      ],
      limit: size,
      offset: page * size,
      distinct: true
    })

    let videogamesData = []
    if (count) {
      videogamesData = rows.map((game) => {
        const auxGame = { ...game.get() } // En el contexto de Sequelize, el método .get() se utiliza para obtener una representación simple del modelo, excluyendo las propiedades y métodos internos de Sequelize. Cuando se realiza una consulta con Sequelize, el resultado incluye instancias del modelo, y el método .get() se utiliza para obtener un objeto plano que representa los datos del modelo sin las propiedades y métodos internos de Sequelize.

        auxGame.Genres = game.Genres.map((auxGenre) => {
          return auxGenre.name
        })
        auxGame.Platforms = game.Platforms.map((auxGenre) => {
          return auxGenre.name
        })

        auxGame.genresText = auxGame.Genres.join(', ')
        auxGame.platformsText = auxGame.Platforms.join(', ')

        return auxGame
        /* return {
                    ...game.get(),
                    genresText: game.Genres.map((auxGenre) => {
                        return auxGenre.name;
                    }).join(", "),
                    platformsText: game.Platforms.map((auxPlatf) => {
                        return auxPlatf.name;
                    }).join(", "),
                    Genres: game.Genres.map((auxGenre) => {
                        return auxGenre.name;
                    }),
                    Platforms: game.Platforms.map((auxGenre) => {
                        return auxGenre.name;
                    })
                }; */
      })
    }

    const auxTotalPages = Math.ceil(count / size)
    const auxPrevPage = page - 1 >= 0 ? page - 1 : -1
    const auxNextPage = page + 1 < auxTotalPages ? page + 1 : -1
    const auxHasPrevPage = page - 1 >= 0
    const auxHasNextPage = page + 1 < auxTotalPages

    return {
      videogames: videogamesData,
      PaginationData: {
        totalItems: count,
        limit: size,
        totalPages: auxTotalPages,
        currentPage: page,
        hasPrevPage: auxHasPrevPage,
        hasNextPage: auxHasNextPage,
        prevPage: auxPrevPage,
        nextPage: auxNextPage
      }
    }
  } catch (error) {
    res.status(500).send('getVideogames not found')
  }
}

export default getVideogames
