const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const BlogSchema = new mongoose.Schema({
    id: Number,
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: String,
    time: { type: Number, default: () => new Date().getTime() }
});

BlogSchema.plugin(AutoIncrement, { inc_field: 'id', start_seq: 100 });

module.exports = mongoose.model('Blog', BlogSchema);