import postVideogamesByIdsController from "../VideoGames/postVideogamesByIdsController.js";
import { PurchaseOrderItems } from "../../database.js";

const getRatedPendingItemsByUserIdController = async (
  userID,
  page,
  size,
  req,
  res
) => {
  page = +page;
  size = +size;
  console.log("userID: " + typeof userID + ": " + userID);
  console.log("page: " + typeof page + ": " + page);
  console.log("size: " + typeof size + ": " + size);
  // return "OK";
  try {
    const { count, rows } = await PurchaseOrderItems.findAndCountAll({
      where: {
        userId: userID,
        isRated: false,
        status: "approved",
      },
      // order: orderFilter,
      limit: size,
      offset: page * size,
      distinct: true,
    });
    // return rows;
    let userRatedPendingItemsData = [];
    if (count) {
      const ids = rows.map((item) => {
        return item.itemId;
      });
      const videogamesByIds = await postVideogamesByIdsController(ids);
      if (videogamesByIds) {
        userRatedPendingItemsData = videogamesByIds.map((item) => {
          const auxObj = rows.find((obj) => obj.itemId === item.id);
          return {
            ...item,
            quantity: auxObj.quantity,
            unitPrice: auxObj.unitPrice,
            currencyId: auxObj.currencyId,
          };
        });
      }
    }

    const auxTotalPages = Math.ceil(count / size);
    const auxPrevPage = page - 1 >= 0 ? page - 1 : -1;
    const auxNextPage = page + 1 < auxTotalPages ? page + 1 : -1;
    const auxHasPrevPage = page - 1 >= 0;
    const auxHasNextPage = page + 1 < auxTotalPages;

    return {
      ratedPendingItems: userRatedPendingItemsData,
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
    console.log("ERROR 2");
    res.status(500).send("getRatedPending not found");
  }
};

export default getRatedPendingItemsByUserIdController;
