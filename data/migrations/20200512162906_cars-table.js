exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    // Creates a primary key called id
    tbl.increments();
    // Creates a text field called VIN which is both required and unique
    tbl.text("VIN", 255).unique().notNullable();
    // Creates a text field called make which is required
    tbl.text("make", 255).notNullable();
    // Creates a text field called model which is required
    tbl.text("model", 255).notNullable();
    // Creates an integer field called mileage which is required
    tbl.integer("milage").notNullable();
    // Creates a text field called trans_type that is not required
    tbl.text("trans_type", 255);
    // Creates a text field called title that is not required
    tbl.text("title", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
