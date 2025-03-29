import { User } from '../../database.js'
import { Op } from 'sequelize'
import { getEmails } from '../../utils/index.js'

const getUser = async (page, size, req, res) => {
  const { email1, email2 } = getEmails()
  page = +page
  size = +size
  // console.log("page :: " + page);
  // console.log("size :: " + size);
  try {
    const { count, rows } = await User.findAndCountAll({
      where: {
        deleteAt: false,
        email: {
          [Op.notIn]: [email1, email2] // Lista de correos electrónicos a excluir
        }
      },
      limit: size,
      offset: page * size
    })

    const auxTotalPages = Math.ceil(count / size)
    const auxPrevPage = page - 1 >= 0 ? page - 1 : -1
    const auxNextPage = page + 1 < auxTotalPages ? page + 1 : -1
    const auxHasPrevPage = page - 1 >= 0
    const auxHasNextPage = page + 1 < auxTotalPages

    return {
      PaginationData: {
        totalItems: count,
        limit: size,
        totalPages: auxTotalPages,
        currentPage: page,
        hasPrevPage: auxHasPrevPage,
        hasNextPage: auxHasNextPage,
        prevPage: auxPrevPage,
        nextPage: auxNextPage
      },
      users: rows
    }

    // return users;
  } catch (error) {
    res.status(500).send('getUser not found')
  }
}
export default getUser
