import pkg from "sequelize";
const { Sequelize, DataTypes} = pkg;
const sequelize = new Sequelize({dialect: "sqlite",storage: './data/db.sqlite3'});

const Session = sequelize.define('Session',{
  id: {type: DataTypes.UUIDV4, primaryKey:true},
  user_id: {type: DataTypes.INTEGER, allowNull: false},
  expiry: {type: DataTypes.INTEGER, allowNull: false}

})

export default Session;