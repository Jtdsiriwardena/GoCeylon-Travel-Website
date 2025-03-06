const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const hotelRoutes = require('./routes/hotel.routes');
const restaurantRoutes = require('./routes/restaurent.routes');
const guidesRoutes = require('./routes/guide.routes');
const activitiesRoutes = require('./routes/activity.route');



const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors()); 

app.use(bodyParser.json());
app.use('/api', hotelRoutes);
app.use('/api', restaurantRoutes);
app.use('/api', guidesRoutes);
app.use('/api', activitiesRoutes);




app.use('/uploads', express.static('uploads'));  


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travelApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.log('MongoDB connection error:', error);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
