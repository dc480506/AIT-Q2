var mongoose=require('mongoose'); 
  
var EmployeeSchema = new mongoose.Schema({ 
    empName:String, 
    empSalary:Number, 
    empDepartment:String, 
    empMobno: String, 
    empAddress:String 
}); 
  
module.exports = mongoose.model( 
    'employee', EmployeeSchema, 'Employees');