const router = require("express").Router()

const {
    getThoughts, 
    getSingleThoughts, 
    createThoughts, 
    updateThoughts,
    deleteThoughts, 
    newThoughtReaction,
    deleteThoughtReaction
} = require("../../controllers/thoughtController")

router.route("/")
    .get(getThoughts)
    .post(createThoughts)
    .put(updateThoughts)
    .delete(deleteThoughts)

router.route("/:thoughtId")
    .get(getSingleThoughts)

router.route("/:thoughtId/reactions")
    .post(newThoughtReaction)
    .delete(deleteThoughtReaction)
