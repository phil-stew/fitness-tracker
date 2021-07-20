const router = require("express").Router();
const { Workout } = require("../model")
const path = require("path");


// router.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../public/index.html"))
//   });

  router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
  });

  router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
  });

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([{
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

    const workouts = await Workout.aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                }
            }
        }])

    const chartWorkOut = workouts.splice(workouts.length - 7,  workouts.length - 1)  
    res.json(chartWorkOut)
    
});

module.exports = router