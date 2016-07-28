per.controller("MyCtrl", ['$scope', '$http', function ($scope, $http) {
    var wnd, detailsTemplate;

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
            dataBound: onDataBound,
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
                    title: "Mobile Number"
                },
                "Email",
                "Skype",
                "University"
            ]
        });

        wnd = angular.element("#details").kendoWindow({
            title: "Details",
            modal: true,
            visible: false,
            resizable: false,
            width: 300
        }).data("kendoWindow");

        detailsTemplate = kendo.template(angular.element("#template").html());
    };

    function onDataBound(e) {
        var grid = $("#grid").data("kendoGrid");
        $(grid.tbody).on("click", "td", function (e) {
            var dataItem = grid.dataItem($(e.currentTarget).closest("tr"));
            wnd.content(detailsTemplate(dataItem));
            wnd.center().open();
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
                method: 'POST',
                data: Data               
            }).success(function (response) {
                console.log(response);
                angular.element("#confirmButton").addClass("btn-success");
            }).error(function (error) {
                alert("error " + error);
            });
        }
    };   

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
    });  

}]);

/*

            //Creates a gloabl object called templateLoader with a single method "loadExtTemplate"
            var templateLoader = (function ($, host) {
                //Loads external templates from path and injects in to page DOM
                return {
                    //Method: loadExtTemplate
                    //Params: (string) path: the relative path to a file that contains template definition(s)
                    loadExtTemplate: function (path) {
                        //Use jQuery Ajax to fetch the template file
                        var tmplLoader = $.get(path)
                            .success(function (result) {
                                //On success, Add templates to DOM (assumes file only has template definitions)
                                $("body").append(result);
                            })
                            .error(function (result) {
                                alert("Error Loading Templates -- TODO: Better Error Handling");
                            })

                        tmplLoader.complete(function () {
                            //Publish an event that indicates when a template is done loading
                            $(host).trigger("TEMPLATE_LOADED", [path]);
                        });
                    }
                };
            })(jQuery, document);
            */