module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    }
  });
  return Order;
};
