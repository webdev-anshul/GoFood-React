const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://ans123456:ans0522@cluster0.1jgqprz.mongodb.net/gofoodmern?retryWrites=true&w=majority";

var db_fetch;

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected");

    const fetched_data = await mongoose.connection.db.collection("food_items");

    global.food_items = await fetched_data.find().toArray();
    const foodCategory = await mongoose.connection.db.collection(
      "foodCategory"
    );

    //console.log(data);

    //console.log(global.food_items);
    global.food_category = await foodCategory.find().toArray();

    //console.log(global.food_category);
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoDB;
