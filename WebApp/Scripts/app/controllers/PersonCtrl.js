var per = angular.module("personInfoApp", ["kendo.directives"]);

per.controller("MyCtrl", ['$scope', '$http', function ($scope, $http) {

    $scope.mainGridOptions = function () {
        angular.element("#grid").kendoGrid({
            dataSource: {
                transport: {
                    read: "/api/HomeApi/Get",
                    dataType: "json"
                },
                schema: {
                    model: {
                        fields: {
                            Id: { type: "number" },
                            Name: { type: "string" },
                            Surname: { type: "string" },
                            Mobile_Number: { type: "number" },
                            Email: { type: "string" },
                            Skype: { type: "string" },
                            University: { type: "string" }
                        }
                    }
                },
                pageSize: 3,
                scrollable: false
            },
            filterable: true,
            sortable: true,
            pageable: true,
            columns: [{
                field: "Id",
                filterable: false
            },
                "Name",
                "Surname",
                {
                    field: "Mobile_Number",
                    title: "Mobile Number",
                },
                "Email",
                "Skype",
                "University"
            ]
        });
    }

    $scope.validate = function (event) {
        event.preventDefault();
        if ($scope.validator.validate()) {
            var Data = new Object();
            Data.Num = $scope.number;
            Data.Str = $scope.string;            
            $http({
                url: '/api/HomeApi/Post',
                dataType: 'json',
                method: 'POST',
                data: Data,
                headers: {
                    "Content-Type": "application/json"
                }
            }).success(function (response) {
                console.log(response);
                angular.element("#confirmButton").addClass("btn-success");
            }).error(function (error) {
                alert("error " + error);
            });
        }
    }
   

    angular.element("#myForm").kendoValidator({
        rules: {            
            customRule: function (input) {
                if (input.is("[name=number]")) {
                    return /^\d+$/.test(input.val());
                }
                return true;
            } 
        },
        messages: {
            customRule: "Must be number!"                        
        }
    })

}]);