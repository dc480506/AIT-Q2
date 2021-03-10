let app = angular.module("EmpAPP", [])
const apiURL = "http://localhost:3000/api";
app.controller("Controller", ($scope, $http) => {
    $scope.showData=false;
    $scope.msg="Select an operation"
    $scope.addData = () => {
        $scope.showData=false;
        let data = JSON.stringify({
            "empName": $scope.empName,
            "empSalary": $scope.empSalary,
            "empDepartment":  $scope.empDepartment,
            "empMobno": $scope.empMobno,
            "empAddress": $scope.empAddress,
        })

        $http.post(`${apiURL}/addEmployee`,
                data
            )
            .then((response) => {
                console.log(response.data);
                $scope.msg=response.data
            }, (error) => {
                console.log(error.data.error);
                $scope.msg=response.data
            });
    }
    $scope.fetchData=()=>{
        $scope.msg=""
        $http.get(`${apiURL}/fetchAllEmployees`)
        .then((response)=>{
            $scope.table_data=response.data
            $scope.showData=true;
        }, (error) => {
            console.log(error.data.error);

        })
    }
    $scope.deleteData=()=>{
        let data = JSON.stringify({
            "empName": $scope.empName,
        })
        $http.post(`${apiURL}/deleteEmployee`,
                data
            )
            .then((response) => {
                console.log(response.data);
                $scope.msg=response.data
            }, (error) => {
                console.log(error.data.error);
                $scope.msg=response.data
            });
    }
});