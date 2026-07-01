const express = require('express');
const router = express.Router();
const pricingService = require('../services/pricing');

router.post('/', (req, res) => {
  try {
    const { computeConfig, storageConfig, databaseConfig, bandwidthConfig, provider = 'aws' } = req.body;
    
    const computeCost = pricingService.calculateCompute(provider, computeConfig);
    const storageCost = pricingService.calculateStorage(provider, storageConfig);
    const databaseCost = pricingService.calculateDatabase(provider, databaseConfig);
    const networkCost = pricingService.calculateBandwidth(provider, bandwidthConfig);

    const totalCost = computeCost + storageCost + databaseCost + networkCost;

    res.json({
      breakdown: {
        computeCost,
        storageCost,
        databaseCost,
        networkCost
      },
      totalCost
    });
  } catch (error) {
    console.error('Error calculating cost:', error);
    res.status(500).json({ error: 'Failed to calculate cost' });
  }
});

module.exports = router;
