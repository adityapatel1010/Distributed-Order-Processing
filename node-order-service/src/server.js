const express = require('express');
const app = express();
const db = require('./models');
const orderRoutes = require('./routes/orderRoutes');
const startGrpcServer = require('./grpc/grpcServer');

app.use(express.json());
app.use('/', orderRoutes);

db.sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log(' Node API running on http://localhost:3000');
  });
  startGrpcServer();
});