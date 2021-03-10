var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var EmployeeModel = require('../models/employeeSchema');

// Connecting to database 
var query = 'mongodb://localhost/employee'

const db = (query);
mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    }
});

router.post('/addEmployee', async function (req, res) {
    var newEmployee = new EmployeeModel();
    newEmployee.empName = req.body.empName;
    newEmployee.empSalary = req.body.empSalary;
    newEmployee.empDepartment = req.body.empDepartment;
    newEmployee.empMobno = req.body.empMobno;
    newEmployee.empAddress= req.body.empAddress;

    try{
        const data = await newEmployee.save();
        res.send("Insertion Successful "+data);
    }catch(error){
        res.status(500).send(error.message);
    }
});

router.get('/fetchAllEmployees', async function(req,res){
    try {
        const data = await EmployeeModel.find({})
        res.send(data);
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
})
router.get('/findfirst/:id', function (req, res) {
    EmployeeModel.findOne({
            StudentId: req.params.id
        },
        function (err, data) {
            if (err) {
                console.log(err);
                res.status(500).send("Something went wrong");
            } else {
                res.send(data);
            }
        });
});

router.post('/deleteEmployee', async function (req, res) {

    try {
        const data = await EmployeeModel.findOneAndDelete({
            empName: req.body.empName
        })
        res.send("Successfully Deleted: "+data)
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});


router.post('/update', async function (req, res) {

    try {
        const data = await EmployeeModel.findOneAndUpdate({
            StudentId: req.body.id
        }, {
            Name: req.body.Name
        }, {
            new: true
        })
        res.send(data)
    } catch (error) {
        res.status(500).send("Something went wrong");
    }
});
module.exports = router;