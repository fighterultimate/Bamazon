var inquirer = require('inquirer');
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "bamazon"

});



inquirer
    .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Menu Options',
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        },
    ])
    .then(answers => {
        console.info('Answer:', answers.action);

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
                        // var idNumber = stockList.id;
                        // var itemStock = stockList[idNumber - 1].stock_quantity;

                        if (answers.action == "View Products for Sale") {

                            // console.log(stockList);

                            for (i = 0; i < stockList.length; i++) {

                                console.log("\nItem_Id: " + stockList[i].item_id);
                                console.log("\nProduct_Name: " + stockList[i].product_name);
                                console.log("\nPrice: " + stockList[i].price);
                                console.log("\nQuantity: " + stockList[i].stock_quantity);
                                console.log("///////////////////////////////////////////");


                            }



                        }
                        else if (answers.action == "View Low Inventory") {

                            connection.query("SELECT * FROM PRODUCTS WHERE STOCK_QUANTITY <5;", function (error, res) {

                                if (error) {
                                    console.log(error)
                                }
                                else {
                                    for (i = 0; i < res.length; i++) {

                                        console.log("\nItem_Id: " + res[i].item_id);
                                        console.log("\nProduct_Name: " + res[i].product_name);
                                        console.log("\nPrice: " + res[i].price);
                                        console.log("\nQuantity: " + res[i].stock_quantity);
                                        console.log("///////////////////////////////////////////");


                                    }

                                }
                            })




                        } else if (answers.action == "Add to Inventory") {


                            // if statement, if ehatever the fuck equals add to iventory then ask the user what item he wants to add the inventory, then ask how many more to add,
                            // then update the database and show the new inventory 

                            for (i = 0; i < stockList.length; i++) {

                                console.log("\nItem_Id: " + stockList[i].item_id);
                                console.log("\nProduct_Name: " + stockList[i].product_name);
                                console.log("\nPrice: " + stockList[i].price);
                                console.log("\nQuantity: " + stockList[i].stock_quantity);
                                console.log("-----------------------------------------------");


                            }

                            inquirer
                                .prompt([
                                    {
                                        name: "product",
                                        message: "What is the id number of the product you want to update?"

                                    },
                                    {
                                        name: "amount",
                                        message: "How many would you like to add?"

                                    }
                                ])
                                .then(choice => {

                                    var idNumber = choice.product
                                    var itemStock = stockList[idNumber - 1].stock_quantity;
                                    var quantity = choice.amount;
                                    var current_Quantity = parseFloat(itemStock) + parseFloat(quantity);
                                    console.info('Answer:', idNumber);


                                    var update = `UPDATE products SET stock_quantity = ${current_Quantity} WHERE item_id = ${idNumber}`;

                                    connection.query(update, function (error, res) {
                                        if (error) {
                                            console.log(error)
                                        }
                                        else {

                                            console.log("Update completed!" + "\nCurrent_Quantity: " + current_Quantity)

                                        }
                                    })


                                })



                        } else if (answers.action == "Add New Product") {


                            inquirer
                                .prompt([
                                    {
                                        name: "name",
                                        message: "What is the name of the product you want to add?"

                                    },
                                    {
                                        name: "department",
                                        message: "What department does it belong to?"

                                    }, {
                                        name: "price",
                                        message: "What price will it be sold for?"

                                    }, {
                                        name: "quantity",
                                        message: "How many do we have?"

                                    }
                                ])
                                .then(choice => {

                                    var name = choice.name;

                                    var department = choice.department;
                                    var price = parseFloat(choice.price);
                                    var quantity = parseFloat(choice.quantity);


                                    //                                     INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
                                    // VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');

                                    var update = `INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ('${name}','${department}','${price}','${quantity}')`
                                    connection.query(update, function (error, res) {
                                        if (error) {
                                            console.log(error)
                                        }
                                        else {

                                            console.log("Item has been added!\n");


                                        }

                                    })






                                })




                        }


                    }
                })


            }
        })



    });


// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.


// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.


// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.



// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.