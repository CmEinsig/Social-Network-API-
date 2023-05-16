const { Schema, model } = require("mongoose")
const reactionSchema = require("./reaction")

const thoughtsSchema = new Schema(
    {
        thoughtsText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                return new Date(date).toLocaleDateString()
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

thoughtsSchema.virtual("reactionCount").get(function () {
    return this.reactions.length
})

const Thoughts = model("thoughts", thoughtsSchema)

module.exports = Thoughts