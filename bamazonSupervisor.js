
var inquirer = require('inquirer');
var mysql = require("mysql");
var cTable = require('console.table');


var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "bamazon"

});



    connection.query("SELECT * FROM departments", function (error, res) {

        if (error) {
            console.log(error)
        }
        else {
            var stockList = res;
            // console.log(stockList)
            
inquirer
.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'Menu Options',
        choices: ["View Product Sales by Department", "Create New Department"],
    },
])
.then(answers => {
    console.info('Answer:', answers.action);


    if (answers.action == "View Product Sales by Department") {


        for(i=0;i<stockList.length;i++){
        console.table([
          {
            Department_id: stockList[i].department_id,
            Department_name: stockList[i].department_name,
            Over_head_costs: stockList[i].over_head_costs
          }
        ])};
        
        


    }



})}})
      
            // i left off trying to learn how to use an allies