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
    User.create({ username: "lucy", password: "123", isAdmin: true }),
    User.create({ username: "joey", password: "123" }),
    User.create({ username: "tony", password: "123", isAdmin: true }),
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
        "https://assets1.ignimgs.com/2018/03/06/fortnite---button-1520296499714.jpg?width=300&crop=1%3A1%2Csmart",
      price: 25.99,
      quantity: 13,
      description:
        "Fortnite is an online video game developed by Epic Games and released in 2017. It is available in three distinct game mode versions that otherwise share the same general gameplay and game engine.",
      genre: "Survival",
    }),
    Product.create({
      name: "Doom",
      imageUrl:
        "https://assets-prd.ignimgs.com/2021/12/06/doom-1993-id-1638823790037.png?width=300&crop=1%3A1%2Csmart",
      price: 4.99,
      quantity: 50,
      description: "A Classic Shooter.",
      genre: "First-person Shooter",
    }),
    Product.create({
      name: "Animal Crossing",
      imageUrl:
        "https://assets-prd.ignimgs.com/2021/12/14/acnewleaf-1639515817356.jpg?width=300&crop=1%3A1%2Csmart",
      price: 49.99,
      quantity: 100,
      description: "Animal Crossing is a social simulation video game.",
      genre: "Simulation",
    }),
    Product.create({
      name: "Grand Theft Auto V",
      imageUrl:
        "https://assets-prd.ignimgs.com/2021/12/17/gta-5-button-2021-1639777058682.jpg?width=300&crop=1%3A1%2Csmart",
      price: 29.99,
      quantity: 100,
      description: "Third-Person Shooter.",
      genre: "Shooter",
    }),
    Product.create({
      name: "Call of Duty: Modern Warfare 2",
      imageUrl:
        "https://assets-prd.ignimgs.com/2022/05/24/call-of-duty-modern-warfare-2-button-02-1653417394041.jpg?width=300&crop=1%3A1%2Csmart",
      price: 69.99,
      quantity: 50,
      description: "First-person shooter.",
      genre: "Shooter Multiplayer",
    }),
    Product.create({
      name: "FIFA 23",
      imageUrl:
        "https://assets-prd.ignimgs.com/2022/07/19/fifa-23-button-02-1658265594101.jpg?width=300&crop=1%3A1%2Csmart",
      price: 59.99,
      quantity: 50,
      description: "Soccer Simulation.",
      genre: "Sports Simulation",
    }),
    Product.create({
      name: "Red Dead Redemption 2",
      imageUrl:
        "https://assets1.ignimgs.com/2016/10/18/red-dead-redemption-2-buttonjpg-f9ad35.jpg?width=300&crop=1%3A1%2Csmart",
      price: 39.99,
      quantity: 100,
      description: "Western-themed Third-person Shooter.",
      genre: "Shooter",
    }),
    Product.create({
      name: "Assassin's Creed Valhalla",
      imageUrl:
        "https://assets1.ignimgs.com/2020/04/30/assassins-creed-valhalla---button-fin-1588268099443.jpg?width=300&crop=1%3A1%2Csmart",
      price: 29.99,
      quantity: 100,
      description: "Open-world Viking Action-adventure game.",
      genre: "Adventure",
    }),
    Product.create({
      name: "Battlefield: 2042",
      imageUrl:
        "https://assets-prd.ignimgs.com/2021/06/09/battlefield-2042-button-fin-1623262719242.jpg?width=300&crop=1%3A1%2Csmart",
      price: 24.99,
      quantity: 100,
      description: "Futuristic First-person shooter.",
      genre: "First-person shooter",
    }),
    Product.create({
      name: "Elden Ring",
      imageUrl:
        "https://assets-prd.ignimgs.com/2021/06/12/elden-ring-button-03-1623460560664.jpg?width=300&crop=1%3A1%2Csmart",
      price: 39.99,
      quantity: 100,
      description: "Open-world third person action game.",
      genre: "Adventure",
    }),
    Product.create({
      name: "God of War: Ragnarok",
      imageUrl:
        "https://assets-prd.ignimgs.com/2021/09/09/god-of-war-ragnarok-button-1631231879154.jpg?width=300&crop=1%3A1%2Csmart",
      price: 59.99,
      quantity: 50,
      description: "Third-person action game themed around norse mythology.",
      genre: "Action-Adventure",
    }),
    Product.create({
      name: "Cyberpunk 2077",
      imageUrl:
        "https://assets-prd.ignimgs.com/2020/07/16/cyberpunk-2077-button-fin-1594877291453.jpg?width=300&crop=1%3A1%2Csmart",
      price: 19.99,
      quantity: 150,
      description: "Cyberpunk-themed RPG",
      genre: "Role-playing Game",
    }),
    Product.create({
      name: "Sonic Frontiers",
      imageUrl:
        "https://assets-prd.ignimgs.com/2022/10/12/sonic-frontiers-button-fin-1665602954137.jpg?width=300&crop=1%3A1%2Csmart",
      price: 49.99,
      quantity: 50,
      description: "3D Platformer",
      genre: "Platformer",
    }),
    Product.create({
      name: "Gotham Knights",
      imageUrl:
        "https://assets-prd.ignimgs.com/2022/01/28/gothamknights-png-1643333007694.jpeg?width=300&crop=1%3A1%2Csmart",
      price: 59.99,
      quantity: 50,
      description: "Third-person action game set in the Batman universe.",
      genre: "Action",
    }),
    Product.create({
      name: "Splatoon 3",
      imageUrl:
        "https://sm.ign.com/t/ign_ap/cover/s/splatoon-3/splatoon-3_spu1.300.jpg",
      price: 49.99,
      quantity: 75,
      description: "Shooter Platformer hybrid from Nintendo.",
      genre: "Shooter Multiplayer",
    }),
    Product.create({
      name: "Resident Evil: Village",
      imageUrl:
        "https://assets-prd.ignimgs.com/2021/01/22/re-village-button-fin-1611277715193.jpg?width=300&crop=1%3A1%2Csmart",
      price: 39.99,
      quantity: 100,
      description: "First-person horror game.",
      genre: "Shooter Horror",
    }),
    Product.create({
      name: "Halo: Infinite",
      imageUrl:
        "https://assets-prd.ignimgs.com/2020/07/24/halo-infinite-button-2020-1595617876660.jpg?width=300&crop=1%3A1%2Csmart",
      price: 24.99,
      quantity: 75,
      description:
        "First Person shooter where you play the iconic Master Chief.",
      genre: "FPS Multiplayer",
    }),
    Product.create({
      name: "Forza Horizon 5",
      imageUrl:
        "https://assets-prd.ignimgs.com/2021/08/24/forza-horizon-5-button-fin-1629830068379.jpg?width=300&crop=1%3A1%2Csmart",
      price: 29.99,
      quantity: 50,
      description: "Driving simulation game.",
      genre: "Racing Simulation",
    }),
    Product.create({
      name: "Metroid: Dread",
      imageUrl:
        "https://assets-prd.ignimgs.com/2021/06/16/metroid-dread-button-1623828978724.jpg?width=300&crop=1%3A1%2Csmart",
      price: 49.99,
      quantity: 75,
      description:
        "2D side-scrolling adventure where you play as Samus Aran in a dangerous world.",
      genre: "2D Side-scroller",
    }),
    Product.create({
      name: "Ratchet & Clank: Rift Apart",
      imageUrl:
        "https://assets-prd.ignimgs.com/2021/04/15/ratchet-and-clank-rift-apart-button-2021-1618517968604.jpg?width=300&crop=1%3A1%2Csmart",
      price: 39.99,
      quantity: 50,
      description: "Sci-fi action adventure platformer.",
      genre: "Adventure Platformer",
    }),
    Product.create({
      name: "Duck Hunt",
      imageUrl:
        "https://assets-prd.ignimgs.com/2022/02/03/duckhunt-sq-1643929325298.jpg?width=300&crop=1%3A1%2Csmart",
      price: 9.99,
      quantity: 25,
      description: "Light-gun shooter for the NES.",
      genre: "Shooter",
    }),
    Product.create({
      name: "Super Smash Bros. Ultimate",
      imageUrl:
        "https://assets1.ignimgs.com/2018/06/13/super-smash-btros-ultimate---button-0001-1528851298611.jpg?width=300&crop=1%3A1%2Csmart",
      price: 39.99,
      quantity: 75,
      description: "Nintendo-themed fighting game.",
      genre: "Fighting",
    }),
    Product.create({
      name: "Bayonetta 3",
      imageUrl:
        "https://assets-prd.ignimgs.com/2022/07/13/bayonetta-3-button-fin-1657727125568.jpg?width=300&crop=1%3A1%2Csmart",
      price: 59.99,
      quantity: 50,
      description: "Action-adventure game.",
      genre: "Adventure Action",
    }),
    Product.create({
      name: "NBA 2K23",
      imageUrl:
        "https://assets-prd.ignimgs.com/2022/08/25/nba-2k23-button-v2-1661451145664.jpg?width=300&crop=1%3A1%2Csmart",
      price: 69.99,
      quantity: 50,
      description: "Basketball simulation sports game.",
      genre: "Sports Simulation",
    }),
    Product.create({
      name: "JUMANJI: The Video Game",
      imageUrl:
        "https://assets1.ignimgs.com/2019/11/09/jumanji-the-video-game---button-fin-1573262896460.jpg?width=300&crop=1%3A1%2Csmart",
      price: 19.99,
      quantity: 150,
      description:
        "Unite in adventure and laughter in the action-packed game of Jumanji, the ultimate team challenge for those seeking to leave their world behind.",
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
    Order.create({
      status: "fullfilled",
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
    GameOrder.create({
      productId: 7,
      orderId: 4,
      quantity: 1,
    }),
  ]);

  await orders[0].setUser(users[0].id);
  await orders[1].setUser(users[0].id);
  await orders[2].setUser(users[1].id);
  await orders[3].setUser(users[0].id);
  await orders[4].setUser(users[2].id);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      lucy: users[2],
      joey: users[3],
      tony: users[4],
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
