const { Schema } = require('mongoose');

const grocerySchema = new Schema({
    groceryLines: [
        {
            type: String,
        },
    ]
});

module.exports = grocerySchema;