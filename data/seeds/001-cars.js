exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("cars").insert([
        {
          // id: 1,
          VIN: "JM1BM1L39E1201857",
          make: "Ford",
          model: "Escort",
          mileage: 157283,
          trans_type: "manual",
          title: "clear",
        },
        {
          // id: 2,
          VIN: "JT4RN93P0K5035083",
          make: "Saturn",
          model: "Ion",
          mileage: 185678,
          trans_type: "manual",
          title: "clear",
        },
        {
          // id: 3,
          VIN: "1FADP5AU5FL131496",
          make: "Dodge",
          model: "Durango",
          mileage: 98574,
          trans_type: "automatic",
          title: "clear",
        },
      ]);
    });
};
