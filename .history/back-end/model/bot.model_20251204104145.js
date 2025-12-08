const botSchema = new mongoose.Schema({
  UniqueCode: String,
  name: String,
  data: [
    {
      Battery: Number,
      DistanceCovered: Number,
      Robotuptime: Number,
      Status: String,
      Wastetraystatus: String,
      date: Date,
      tide: String,
      humidity: Number,
      temp: Number,
      operator: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      position: {
        city: String,
        lat: String,
        lng: String,
      },
    },
  ],
  operators: [
    {
      date: Date,
      runtime: Number,
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    },
  ],
});
