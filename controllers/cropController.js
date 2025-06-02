const Crop = require('../models/Crop');

// Controller to add a new crop
exports.addCrop = async (req, res) => {
  try {
    // Extract crop details from the request body
    const { name, floweringStart, floweringEnd, latitude, longitude, recommendedHiveDensity } = req.body;

    // Basic validation to check if all required fields are present
    if (!name || !floweringStart || !floweringEnd || latitude == null || longitude == null || recommendedHiveDensity == null) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate latitude and longitude ranges (General)
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ message: "Invalid latitude or longitude." });
    }

    // Ensure flowering start date is before flowering end date
    if (new Date(floweringStart) > new Date(floweringEnd)) {
      return res.status(400).json({ message: "Flowering start date must be before end date." });
    }

   
 // Create a new crop document in the database
    const crop = await Crop.create({
      name,
      floweringStart,
      floweringEnd,
      latitude,
      longitude,
      recommendedHiveDensity,
    });
    -
    // Return the created crop as a response
    res.status(201).json(crop);
  } catch (error) {
    console.error("Add Crop Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Controller to get crops near a specific location and in season
exports.getNearbyCrops = async (req, res) => {
  // Extract latitude, longitude, radius, and date from query params
  const { latitude, longitude, radius = 100, date = new Date().toISOString().slice(0, 10) } = req.query;

  // Convert date string to Date object
  const target = new Date(date);

  // Find crops whose flowering period includes the target date
  const crops = await Crop.find({
    floweringStart: { $lte: target },
    floweringEnd: { $gte: target }
  });

  // Filter crops based on distance from the given location
  const filtered = crops.filter(crop => {
    // Calculate distance using a simple 2D Euclidean formula (approximate dist)
    const dist = Math.sqrt(
      Math.pow(latitude - crop.latitude, 2) + Math.pow(longitude - crop.longitude, 2)
    );
    // Check if the crop is within the specified radius (converted from km to degrees)
    return dist <= radius / 111;
  });
  
  // Return the filtered crops as a response
  res.json(filtered);
};
