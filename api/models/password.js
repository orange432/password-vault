import pkg from "sequelize";
const { Sequelize, DataTypes} = pkg;
const sequelize = new Sequelize({dialect: "sqlite",storage: './data/db.sqlite3'});

const Password = sequelize.define('Password',{
  id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  owner: {type: DataTypes.INTEGER, allowNull: false},
  password: {type: DataTypes.STRING, allowNull: false},
  label: {type: DataTypes.STRING, allowNull: false}
})

export default Password;