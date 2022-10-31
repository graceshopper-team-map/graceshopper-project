"use strict";
//test commit
const {
  db,
  models: { User, Product, Order, GameOrder },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
    User.create({username: "lucy", password: "123", isAdmin: true})
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Minecraft",
      imageUrl:
        "https://w7.pngwing.com/pngs/407/468/png-transparent-minecraft-logo-minecraft-logo-minecraft-ground-angle-video-game-wood-thumbnail.png",
      price: 20.99,
      quantity: 10,
      description:
        "Video game with construction, crafting, exploration, and combat mechanics",
      genre: "Survival",
    }),
    Product.create({
      name: "Soccer",
      imageUrl:
        "https://w7.pngwing.com/pngs/730/380/png-transparent-football-ball-game-football-white-sport-sports-equipment-thumbnail.png",
      price: 15.99,
      quantity: 30,
      description:
        "Neverending soccer action — see how long you can keep the ball going! ",
      genre: "Sport",
    }),
    Product.create({
      name: "Dice",
      imageUrl:
        "https://w7.pngwing.com/pngs/949/268/png-transparent-dice-game-dice-game-graphy-playing-card-dice-thumbnail.png",
      price: 9.99,
      quantity: 25,
      description:
        "EA Digital Illusions CE AB is a Swedish video game developer based in Stockholm. The company was founded in 1992 and has been a subsidiary of Electronic Arts since 2006. Its releases include the Battlefield, Mirror's Edge and Star Wars: Battlefront series.",
      genre: "Party",
    }),
    Product.create({
      name: "Tetris",
      imageUrl:
        "https://e7.pngegg.com/pngimages/220/110/png-clipart-tetris-block-illustration-tetris-blocks-green-games-tetris-thumbnail.png",
      price: 5.99,
      quantity: 52,
      description:
        "Tetris is a puzzle video game created by Soviet software engineer Alexey Pajitnov in 1984. It has been published by several companies for multiple platforms, most prominently during a dispute over the appropriation of the rights in the late 1980s.",
      genre: "Puzzle",
    }),
    Product.create({
      name: "Zelda",
      imageUrl:
        "https://freepngimg.com/thumb/the_legend_of_zelda/21552-3-zelda-link-thumb.png",
      price: 51.99,
      quantity: 8,
      description:
        "The Legend of Zelda: Breath of the Wild is a 2017 action-adventure game developed and published by Nintendo for the Nintendo Switch and Wii U consoles. The game is an installment of The Legend of Zelda series and is set at the end of its timeline.",
      genre: "Action",
    }),
    Product.create({
      name: "Fortnite",
      imageUrl:
        "https://www.freepnglogos.com/uploads/fortnite-png/fortnite-png-logo-download-clip-art-clip-art-0.jpg",
      price: 25.99,
      quantity: 13,
      description:
        "Fortnite is an online video game developed by Epic Games and released in 2017. It is available in three distinct game mode versions that otherwise share the same general gameplay and game engine.",
      genre: "Survival",
    }),
    Product.create({
      name: "Game1",
      imageUrl:
        "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-gamepad-for-playing-video-games-image_1132236.jpg",
      price: 21.99,
      quantity: 8,
      description: "Game1 is a random game that's just created.",
      genre: "Multiplayer",
    }),
    Product.create({
      name: "Game2",
      imageUrl:
        "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-gamepad-for-playing-video-games-image_1132236.jpg",
      price: 20.0,
      quantity: 21,
      description: "Game2 is a random game that's just created.",
      genre: "Puzzle",
    }),
    Product.create({
      name: "Game3",
      imageUrl:
        "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-gamepad-for-playing-video-games-image_1132236.jpg",
      price: 14.0,
      quantity: 3,
      description: "Game3 is a random game that's just created.",
      genre: "Sandbox",
    }),
    Product.create({
      name: "Game4",
      imageUrl:
        "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-gamepad-for-playing-video-games-image_1132236.jpg",
      price: 15.75,
      quantity: 11,
      description: "Game4 is a random game that's just created.",
      genre: "Role-Playing",
    }),
    Product.create({
      name: "Game5",
      imageUrl:
        "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-gamepad-for-playing-video-games-image_1132236.jpg",
      price: 9.99,
      quantity: 90,
      description: "Game5 is a random game that's just created.",
      genre: "Shooters",
    }),
    Product.create({
      name: "Game6",
      imageUrl:
        "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-gamepad-for-playing-video-games-image_1132236.jpg",
      price: 18.99,
      quantity: 1,
      description: "Game6 is a random game that's just created.",
      genre: "Adventure",
    }),
  ]);

  const orders = await Promise.all([
    Order.create({
      status: "fullfilled",
    }),
    Order.create({
      status: "unfullfilled",
    }),
    Order.create({}),
  ]);

  const gameOrder = await Promise.all([
    GameOrder.create({
      productId: 1,
      orderId: 1,
      quantity: 2,
    }),
    GameOrder.create({
      productId: 5,
      orderId: 1,
      quantity: 4,
    }),
    GameOrder.create({
      productId: 8,
      orderId: 1,
      quantity: 2,
    }),
    GameOrder.create({
      productId: 2,
      orderId: 1,
      quantity: 6,
    }),
    GameOrder.create({
      productId: 3,
      orderId: 1,
      quantity: 5,
    }),
    GameOrder.create({
      productId: 1,
      orderId: 2,
      quantity: 1,
    }),
    GameOrder.create({
      productId: 2,
      orderId: 3,
      quantity: 8,
    }),
    GameOrder.create({
      productId: 3,
      orderId: 3,
      quantity: 4,
    }),
    GameOrder.create({
      productId: 4,
      orderId: 3,
      quantity: 1,
    }),
    GameOrder.create({
      productId: 5,
      orderId: 2,
      quantity: 6,
    }),
    GameOrder.create({
      productId: 10,
      orderId: 2,
      quantity: 4,
    }),
  ]);

  await orders[0].setUser(users[0].id);
  await orders[1].setUser(users[0].id);
  await orders[2].setUser(users[1].id);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      lucy: users[2]
    },
    products,
    orders,
    gameOrder,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
