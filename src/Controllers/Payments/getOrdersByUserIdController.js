import postVideogamesByIdsController from "../VideoGames/postVideogamesByIdsController.js";
import { PurchaseOrder, PurchaseOrderItems } from "../../database.js";
import { Op } from "sequelize";
import eh from "../../utils/errorHandler.js";
// const getOrdersByUserIdController = async ( userID, page, size, statusfilters, orderFilter, req, res ) => {
const getOrdersByUserIdController = async (userID, page, size, status) => {
  page = Number(page);
  size = Number(size);

  const filters = {
    userId: userID,
  };

  if (status) {
    filters.status = status;
  } else {
    filters.status = {
      [Op.ne]: "waiting",
    };
  }

  try {
    const { count, rows } = await PurchaseOrder.findAndCountAll({
      where: filters,
      // order: orderFilter,
      limit: size,
      offset: page * size,
      distinct: true,
    });
    // return rows;
    const userOrdersData = [];
    if (count) {
      for (let i = 0; i < rows.length; i++) {
        const orderVideogamesResult = await PurchaseOrderItems.findAll({
          where: {
            orderId: rows[i].id,
          },
          attributes: ["itemId", "quantity", "unitPrice", "currencyId"],
          through: {
            attributes: [],
          },
        });
        // return orderVideogamesResult;
        if (orderVideogamesResult) {
          const ids = [];
          let totalCost = 0;
          orderVideogamesResult.forEach((element) => {
            ids.push(element.itemId);
            totalCost += element.quantity * element.unitPrice;
          });
          /* const ids = orderVideogamesResult.map(item => {
                    return item.itemId;
                }); */
          const videogamesByIds = await postVideogamesByIdsController(ids);
          // return videogamesByIds;
          if (videogamesByIds) {
            userOrdersData.push({
              ...rows[i].get(),
              items: videogamesByIds.map((item) => {
                const auxObj = orderVideogamesResult.find(
                  (obj) => obj.itemId === item.id
                );
                return {
                  ...item,
                  quantity: auxObj.quantity,
                  unitPrice: auxObj.unitPrice,
                  currencyId: auxObj.currencyId,
                };
              }),
              totalCost,
            });
          }
        }
      }
    }

    const auxTotalPages = Math.ceil(count / size);
    const auxPrevPage = page - 1 >= 0 ? page - 1 : -1;
    const auxNextPage = page + 1 < auxTotalPages ? page + 1 : -1;
    const auxHasPrevPage = page - 1 >= 0;
    const auxHasNextPage = page + 1 < auxTotalPages;

    return {
      ordersData: userOrdersData,
      PaginationData: {
        totalItems: count,
        limit: size,
        totalPages: auxTotalPages,
        currentPage: page,
        hasPrevPage: auxHasPrevPage,
        hasNextPage: auxHasNextPage,
        prevPage: auxPrevPage,
        nextPage: auxNextPage,
      },
    };
  } catch (error) {
    console.error("ERROR 2:", error);
    eh.throwError("getVideogames not found", 404);
  }
};

export default getOrdersByUserIdController;
