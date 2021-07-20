const router = require("express").Router();
const { Workout } = require("../model")

router.get("/api/workouts", (req, res) => {
    Workout.summary([{
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"

            }
        }
    }]).then(data => {
        console.log(data)
        res.json(data)
    })
});

router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then(data => {
            console.log(data)
            res.json(data)
        })
});

router.put("/api/workouts/:id", (req, res) => {
    Workout.updateOne({
        _id: req.params.id
    }, { $push: { exercises: req.body } })
        .then(data => {
            console.log(data)
            res.json(data)
        })
});

router.get("/api/workouts/range", async (req, res) => {

    const workouts = await Workout.summary([{
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                }
            }
        }])

    const last7Workouts = workouts.splice(workouts.length - 7,  workouts.length - 1)  
    res.json(last7Workouts)
    
});

module.exports = router