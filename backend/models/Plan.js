const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  computeConfig: {
    instanceType: String,
    hours: Number,
    provider: String
  },
  storageConfig: {
    storageType: String,
    sizeGB: Number,
    provider: String
  },
  databaseConfig: {
    engine: String,
    instanceSize: String,
    provider: String
  },
  bandwidthConfig: {
    dataTransferGB: Number,
    provider: String
  },
  totalCost: { type: Number, required: true },
  breakdown: {
    computeCost: Number,
    storageCost: Number,
    databaseCost: Number,
    networkCost: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plan', PlanSchema);
