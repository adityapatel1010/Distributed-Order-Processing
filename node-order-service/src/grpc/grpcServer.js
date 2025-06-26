const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const db = require('../models');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../../proto/order.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const proto = grpc.loadPackageDefinition(packageDefinition);

function updateOrderStatus(call, callback) {
  const { id, status } = call.request;
  db.Order.update({ status }, { where: { id: id } })
    .then(([affectedRows]) => {
      if (affectedRows === 0) {
        return callback(null, { success: false, message: 'Order not found' });
      }
      callback(null, { success: true, message: 'Order updated' });
    })
    .catch(error => {
      console.error('Error updating order:', error);
      callback(error);
    });
}

module.exports = function startGrpcServer() {
  const server = new grpc.Server();
  server.addService(proto.OrderService.service, { UpdateOrderStatus: updateOrderStatus });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running on port 50051');
    server.start();
  });
};
