const { Schema } = require('mongoose');

const inventorySchema = new Schema({
    inventoryLines: [
        {
            type: String,
        },
    ]
});

module.exports = inventorySchema;