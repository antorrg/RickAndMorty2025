import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('Platform', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    deleteAt: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  { timestamps: true }
  )
}
