// A simple mock pricing engine for AWS, Azure, GCP
const PRICES = {
  aws: {
    compute: { 't2.micro': 0.0116, 't2.medium': 0.0464, 'c5.large': 0.085 },
    storage: { 'standard': 0.023, 'premium': 0.08 },
    database: { 'mysql.micro': 0.017, 'postgres.large': 0.115 },
    bandwidth: 0.09
  },
  azure: {
    compute: { 'B1s': 0.0104, 'B2s': 0.0416, 'F2s': 0.084 },
    storage: { 'standard': 0.018, 'premium': 0.075 },
    database: { 'mysql.micro': 0.015, 'postgres.large': 0.11 },
    bandwidth: 0.087
  },
  gcp: {
    compute: { 'e2-micro': 0.0084, 'e2-medium': 0.0336, 'n2-standard-2': 0.08 },
    storage: { 'standard': 0.02, 'premium': 0.06 },
    database: { 'mysql.micro': 0.014, 'postgres.large': 0.10 },
    bandwidth: 0.085
  }
};

const getProvider = (provider) => PRICES[provider?.toLowerCase()] || PRICES.aws;

const calculateCompute = (provider, config) => {
  if (!config || !config.instanceType || !config.hours) return 0;
  const rates = getProvider(provider).compute;
  const rate = rates[config.instanceType] || Object.values(rates)[0];
  return rate * config.hours;
};

const calculateStorage = (provider, config) => {
  if (!config || !config.sizeGB) return 0;
  const rates = getProvider(provider).storage;
  const rate = rates[config.storageType || 'standard'];
  return rate * config.sizeGB;
};

const calculateDatabase = (provider, config) => {
  if (!config || !config.engine || !config.instanceSize) return 0;
  const rates = getProvider(provider).database;
  const key = `${config.engine}.${config.instanceSize}`;
  const rate = rates[key] || Object.values(rates)[0];
  return rate * 730; // 730 hours/month roughly
};

const calculateBandwidth = (provider, config) => {
  if (!config || !config.dataTransferGB) return 0;
  const rate = getProvider(provider).bandwidth;
  return rate * config.dataTransferGB;
};

module.exports = {
  calculateCompute,
  calculateStorage,
  calculateDatabase,
  calculateBandwidth,
  PRICES
};
