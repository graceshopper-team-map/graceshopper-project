"use strict";
//test commit
const {
  db,
  models: { User, Product, Order, OrderProducts },
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
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Minecraft",
      imageUrl:
        "https://w7.pngwing.com/pngs/407/468/png-transparent-minecraft-logo-minecraft-logo-minecraft-ground-angle-video-game-wood-thumbnail.png",
      price: 2099,
      quantity: 10,
      description:
        "Video game with construction, crafting, exploration, and combat mechanics",
      genre: "Survival",
    }),
    Product.create({
      name: "Soccer",
      imageUrl:
        "https://w7.pngwing.com/pngs/730/380/png-transparent-football-ball-game-football-white-sport-sports-equipment-thumbnail.png",
      price: 1599,
      quantity: 30,
      description:
        "Neverending soccer action — see how long you can keep the ball going! ",
      genre: "Sport",
    }),
    Product.create({
      name: "Dice",
      imageUrl:
        "https://w7.pngwing.com/pngs/949/268/png-transparent-dice-game-dice-game-graphy-playing-card-dice-thumbnail.png",
      price: 999,
      quantity: 25,
      description:
        "EA Digital Illusions CE AB is a Swedish video game developer based in Stockholm. The company was founded in 1992 and has been a subsidiary of Electronic Arts since 2006. Its releases include the Battlefield, Mirror's Edge and Star Wars: Battlefront series.",
      genre: "Party",
    }),
    Product.create({
      name: "Tetris",
      imageUrl:
        "https://e7.pngegg.com/pngimages/220/110/png-clipart-tetris-block-illustration-tetris-blocks-green-games-tetris-thumbnail.png",
      price: 599,
      quantity: 52,
      description:
        "Tetris is a puzzle video game created by Soviet software engineer Alexey Pajitnov in 1984. It has been published by several companies for multiple platforms, most prominently during a dispute over the appropriation of the rights in the late 1980s.",
      genre: "Puzzle",
    }),
    Product.create({
      name: "Zelda",
      imageUrl:
        "https://freepngimg.com/thumb/the_legend_of_zelda/21552-3-zelda-link-thumb.png",
      price: 5199,
      quantity: 8,
      description:
        "The Legend of Zelda: Breath of the Wild is a 2017 action-adventure game developed and published by Nintendo for the Nintendo Switch and Wii U consoles. The game is an installment of The Legend of Zelda series and is set at the end of its timeline.",
      genre: "Action",
    }),
    Product.create({
      name: "Fortnite",
      imageUrl:
        "https://www.freepnglogos.com/uploads/fortnite-png/fortnite-png-logo-download-clip-art-clip-art-0.jpg",
      price: 2599,
      quantity: 13,
      description:
        "Fortnite is an online video game developed by Epic Games and released in 2017. It is available in three distinct game mode versions that otherwise share the same general gameplay and game engine.",
      genre: "Survival",
    }),
    Product.create({
      name: "Game1",
      imageUrl:
        "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-gamepad-for-playing-video-games-image_1132236.jpg",
      price: 2199,
      quantity: 8,
      description: "Game1 is a random game that's just created.",
      genre: "Multiplayer",
    }),
    Product.create({
      name: "Game2",
      imageUrl:
        "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-gamepad-for-playing-video-games-image_1132236.jpg",
      price: 2000,
      quantity: 21,
      description: "Game2 is a random game that's just created.",
      genre: "Puzzle",
    }),
    Product.create({
      name: "Game3",
      imageUrl:
        "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-gamepad-for-playing-video-games-image_1132236.jpg",
      price: 1400,
      quantity: 3,
      description: "Game3 is a random game that's just created.",
      genre: "Sandbox",
    }),
    Product.create({
      name: "Game4",
      imageUrl:
        "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-gamepad-for-playing-video-games-image_1132236.jpg",
      price: 1575,
      quantity: 11,
      description: "Game4 is a random game that's just created.",
      genre: "Role-Playing",
    }),
    Product.create({
      name: "Game5",
      imageUrl:
        "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-gamepad-for-playing-video-games-image_1132236.jpg",
      price: 999,
      quantity: 90,
      description: "Game5 is a random game that's just created.",
      genre: "Shooters",
    }),
    Product.create({
      name: "Game6",
      imageUrl:
        "https://png.pngtree.com/element_our/20190528/ourmid/pngtree-gamepad-for-playing-video-games-image_1132236.jpg",
      price: 1850,
      quantity: 1,
      description: "Game6 is a random game that's just created.",
      genre: "Adventure",
    }),
  ]);

  const orders = await Promise.all([
    Order.create({
      status: "unfullfilled",
    }),
    Order.create({
      status: "fullfilled",
    }),
    Order.create({
    })
  ]);

  const orderproducts = await Promise.all([
    OrderProducts.create({
      productId: 1,
      orderId: 1,
    }),
    OrderProducts.create({
      productId: 5,
      orderId: 1,
    }),
    OrderProducts.create({
      productId: 8,
      orderId: 1,
    }),
    OrderProducts.create({
      productId: 2,
      orderId: 1,
    }),
    OrderProducts.create({
      productId: 3,
      orderId: 1,
    }),
    OrderProducts.create({
      productId: 1,
      orderId: 2,
    }),
    OrderProducts.create({
      productId: 2,
      orderId: 3,
    }),
  ]);

  await orders[0].setUser(users[1].id);
  await orders[1].setUser(users[0].id);
  await orders[2].setUser(users[1].id);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
    products: {
      Minecraft: products[0],
      Soccer: products[1],
      Dice: products[2],
      Tetris: products[3],
      Zelda: products[4],
      Fortnite: products[5],
      Game1: products[6],
      Game2: products[7],
      Game3: products[8],
      Game4: products[9],
      Game5: products[10],
      Game6: products[11],
    },
    orders: {
      order1: orders[0],
      order2: orders[1],
      order3: orders[2],
    },
    orderproducts: {
      orderproducts1: orderproducts[0],
      orderproducts2: orderproducts[1],
      orderproducts3: orderproducts[2],
      orderproducts4: orderproducts[3],
      orderproducts5: orderproducts[4],
      orderproducts6: orderproducts[5],
      orderproducts7: orderproducts[6],
    },
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
