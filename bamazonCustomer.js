var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "bamazon"

});

connection.connect(function (error) {

    if (error) {
        console.log(error)
    }
    else {
        connection.query("SELECT * FROM products", function (error, res) {

            if (error) {
                console.log(error)
            }
            else {

                var stockList = res;
                console.log(stockList);

                inquirer.prompt([
                    {
                        name: "id",
                        message: "What is the id number of the product you want to purchase?"

                    },
                    {
                        name: "Quantity",
                        message: "How many would you like?"
                    }
                ]).then(function (answers) {
                    var idNumber = answers.id;
                    var quantity = answers.Quantity;
                    var itemStock = stockList[idNumber - 1].stock_quantity;
                    var price = stockList[idNumber - 1].price;
                    var cost = quantity * price;
                    var sales = stockList[idNumber - 1].product_sales;
                    var currentSales =sales + cost;



                    if (itemStock < quantity) {
                        console.log("Insufficient quantity!")
                    }
                    else {

                        var update = `UPDATE products SET stock_quantity = ${itemStock - quantity} WHERE item_id = ${answers.id};`;

                        connection.query(update, function (error, res) {
                            if (error) {
                                console.log(error)
                            }
                            else {

                                console.log("Item price: $" + price + "\nQuantity: " + quantity + "\nYour total: $" + cost)

                                var updated = `UPDATE products SET product_sales = ${currentSales} WHERE item_id = ${answers.id}`
                                connection.query(updated, function (error, res) {
                                    if (error) {
                                        console.log(error)
                                    }
                                    else {
                                        


                                    }})


                              

                            }
                        })





                    }

                })
            }
        })
    }
});


// var sql = "SELECT * FROM trn_employee WHERE employee_id = ?;SELECT * FROM trn_person WHERE person_id = ?";

                    // connection.query(sql, [2, 1], function(error, results, fields) {
                    //     if (error) {
                    //         throw error;