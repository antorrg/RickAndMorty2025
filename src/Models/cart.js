import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gameId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })
}
