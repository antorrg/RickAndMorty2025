import { Sequelize } from 'sequelize'
import models from './Models/index.js'
import env from './envConfig.js'

// const sequelize = new Sequelize(env.ConnectDb,
//   {
//     logging: false,
//     native: false,
//     dialectOptions: env.optionRender
//       ? {
//           ssl: {
//             require: true
//           }
//         }
//       : {}
//   })
const sequelize = new Sequelize(env.RaillwayDb,
  {
    logging:false,
    native:false
  })


Object.values(models).forEach((model) => model(sequelize))

const { Videogame, Genre, Platform, User, PurchaseOrder, PurchaseOrderItems, Rating, Cart, Favorite } = sequelize.models

Videogame.belongsToMany(Genre, { through: 'videogame_genre' })
Genre.belongsToMany(Videogame, { through: 'videogame_genre' })

Videogame.belongsToMany(Platform, { through: 'videogame_platform' })
Platform.belongsToMany(Videogame, { through: 'videogame_platform' })

User.belongsToMany(Favorite, { through: 'user_fav' })
Favorite.belongsToMany(User, { through: 'user_fav' })

/* User.hasMany(Rating);
Rating.belongsTo(User);

Videogame.hasMany(Rating);
Rating.belongsTo(Videogame); */
const startUp = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database authenticated successfully 🆗')
  } catch (error) {
    console.error('Error in conection DB ❌')
  }
}

export {
  Videogame,
  Genre,
  Platform,
  User,
  PurchaseOrder,
  PurchaseOrderItems,
  Rating,
  Cart,
  Favorite,
  startUp,
  sequelize
}
