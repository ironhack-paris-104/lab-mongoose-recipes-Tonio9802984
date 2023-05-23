const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(async (x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Insert the entire array of recipes into the database
    await Recipe.insertMany(data);

    console.log("Inserted recipes:");
    data.forEach((recipe) => {
      console.log(recipe.title);
    });

    // Update the "Rigatoni alla Genovese" recipe
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    console.log("Successfully updated the recipe!");

    // delete the carrot cake
    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Successfully delete the recipe!");

    // Close the database connection
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
