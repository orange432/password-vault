import pkg from "sequelize";
const { Sequelize, DataTypes} = pkg;
const sequelize = new Sequelize({dialect: "sqlite",storage: './data/db.sqlite3'});

const User = sequelize.define('User',{
  id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  username: {type: DataTypes.STRING, allowNull: false},
  password: {type: DataTypes.STRING, allowNull: false},
  salt: {type: DataTypes.STRING, allowNull: false},
})

export default User;