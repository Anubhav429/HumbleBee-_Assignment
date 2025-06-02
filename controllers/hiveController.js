const Hive = require('../models/Hive');
const { format } = require('@fast-csv/format');

// Controller to add a new hive entry
exports.addHive = async (req, res) => {
  const { hiveId, datePlaced, latitude, longitude, numColonies } = req.body;

  // Validate coordinate ranges
  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180)
    return res.status(400).json({ message: 'Invalid coordinates' });

  // Check if hive with the same ID already exists
  const exists = await Hive.findOne({ hiveId });
  if (exists) return res.status(409).json({ message: 'Hive ID must be unique' });

  // Create and store the new hive in the database
  const hive = await Hive.create({ hiveId, datePlaced, latitude, longitude, numColonies });
  res.status(201).json(hive); // Return the created hive with 201 status
};
// Controller to get hives with optional date range filtering and pagination
exports.getHives = async (req, res) => {
  const { startDate, endDate, page = 1, limit = 10 } = req.query;
  const filter = {};

  // Add startDate to filter if provided
  if (startDate) filter.datePlaced = { $gte: new Date(startDate) };

  // Add endDate to filter, preserving startDate if already added
  if (endDate) filter.datePlaced = { ...(filter.datePlaced || {}), $lte: new Date(endDate) };

  // Fetch hives based on filter, skip and limit for pagination
  const hives = await Hive.find(filter).skip((page - 1) * limit).limit(Number(limit));

  res.json(hives); // Return the result as JSON
};

// Controller to export all hive logs as a CSV file
exports.exportCSV = async (req, res) => {
  // Fetch all hives and convert Mongoose documents to plain objects
  const hives = await Hive.find().lean();

  // Set response headers for file download as CSV
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=hive_logs.csv');

  // Initialize CSV stream with headers
  const csvStream = format({ headers: true });

  // Pipe CSV stream to the response
  csvStream.pipe(res);

  // Write each hive record to the CSV
  hives.forEach(h => csvStream.write(h));

  // End the stream
  csvStream.end();
};
