const { User, Thought } = require("../models")

module.exports = {
    //get all thoughts 
    async getThoughts(req, res) {
        try {
            const response = await Thought.find({})
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json({ message: err })
        }
    },
    //get one thought 
    async getSingleThoughts(req, res) {
        try {
            const response = await Thought.findOne({ _id: req.params.thoughtId })
                .select("-__v")

            !response ? res.status(404).json({ message: 'No thoughts found' }) : res.json(response)
        } catch (err) {
            res.status(500).json({ message: err })
        }
    },
    //create thoughts
    async createThoughts(req, res) {
        try {
            const thought = await Thought.create(req.body)
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            )

            !user 
            ? res.status(404).json({ message: "Thought created, but no users found" })
            : res.json("Thought created successfully!")
        } catch (err) {
            res.status(500).json({ message: err })
        }
    },
    //update thoughts
    async updateThoughts(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.body.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            !thought 
            ? res.status(404).json({ message: "No thoughts found" })
            : res.json(thought)
        } catch (err) {
            res.status(500).json({ message: err })
        }
    },
    //delete thought
    async deleteThoughts(req, res) {
        try {
            const thought = await Thought.findOneAndRemove(
                { _id: req.body.thoughtId}
            )

            if (!thought) {
                return res.status(404).json({ message: "No thoughts found"})
            }
            const user = await User.findOneAndUpdate(
                { thoughts: req.body.thoughtId },
                { $pull: { thoughts: req.body.thoughtId } },
                { new: true }
            )

            !user
            ? res.status(404).json({ message: "Thoughts deleted, but no user found" })
            : res.json("Thought successfully deleted")
        
        } catch (err) {
            res.status(500).json({ message: err })
        }
    },
    //Thought reaction
    async newThoughtReaction(req, res) {
        try {
            const response = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )
            !response ? res.status(404)({ message: "No thoughts found" }) : res.json(response)
        } catch (err) {
            res.status(500).json({ message: err })
        }
    },
    //delete thought reaction
    async deleteThoughtReaction(req, res) {
        try {
            const response = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.body.reactionId } } },
                { runValidators: true, new: true }
            )
            !response ? res.status(404)({ message: "No thought with this ID" }) : res.json(response)
        } catch (err) {
            res.status(500).json({ message: err })
        }
    }
}