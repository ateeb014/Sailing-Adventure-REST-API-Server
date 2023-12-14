
//import the mysql2 module
const mysql = require ('mysql2');
const http = require('http');
const {URL} = require('url');
const sailors= require ('./lib/sailors.js');
const boats= require ('./lib/boats.js');
const reserves= require ('./lib/reserves.js');

function formatDate(date) {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return monthNames[monthIndex]+  + day + + ',' + year;   
}

// initialize the connection object
const db= mysql.createConnection({
    host : "localhost",
    user : "username", // Add your MySQL user name
    password: "password",  // Add your MySQL password
    multipleStatements: true
    });


//Check the status of the connection
    db.connect((err)=>{
        if (err) throw err;
        console.log("Connected!!");
    });

// Creating the database Sailing
    let sql = "CREATE DATABASE IF NOT EXISTS Sailing";
    db.query(sql, (err)=>{
        if (err) throw err;
            console.log("Database Created");
    });

// Creating the table Sailors
    sql = "CREATE TABLE IF NOT EXISTS Sailing.Sailors ("
        +" S_id INT PRIMARY KEY AUTO_INCREMENT," 
        + "S_name VARCHAR(45) NOT NULL,"
        + "B_date DATE NOT NULL,"
        + "Rate INT NOT NULL)";
    db.query(sql, (err)=>{
        if (err) throw err;
            console.log("TABLE Sailors Created");
    });

// Creating the table Boats
    sql = "CREATE TABLE IF NOT EXISTS Sailing.Boats ("
        +" B_id INT PRIMARY KEY AUTO_INCREMENT," 
        + "B_name VARCHAR(45) NOT NULL,"
        + "Type VARCHAR(100) NOT NULL)";
    db.query(sql, (err)=>{
        if (err) throw err;
            console.log("TABLE Boats Created");
    });
 
// Creating the table Reserves
    sql = "CREATE TABLE IF NOT EXISTS Sailing.Reserves ("
    +" S_id INT," 
    + "B_id INT,"
    + "Day VARCHAR(100) NOT NULL,"
    + "PRIMARY KEY(S_id, B_id, Day),"
    + "CONSTRAINT FOREIGN KEY(S_id) REFERENCES Sailors(S_id) ON UPDATE CASCADE ON DELETE CASCADE, CONSTRAINT FOREIGN KEY(B_id) REFERENCES Boats(B_id) ON UPDATE CASCADE ON DELETE CASCADE)";
    db.query(sql, (err)=>{
        if (err) throw err;
            console.log("TABLE Reserves Created");
});

const serverHandler = function(req, res){
    //1. Creates a new URL object from the request url
    const baseURL = 'http://'+ req.headers.host + '/';
    const parsedUrl = new URL(req.url, baseURL);
    
    //2. Get the untrimmed path from the url
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    
    
    //3. Get the query string as an object
    const urlquery= parsedUrl.searchParams
    let entries = urlquery.entries();
    const qs = Object.fromEntries(entries);
    
    //4. Get the HTTP method and convert it to uppercase
    const method = req.method.toUpperCase();
    
    //5. Build a simple Routing Logic
    switch(method){
        case 'POST': if(trimmedPath.toUpperCase() === 'SAILOR'){
            const obj = qs;
                sailors.add(db, obj, (results) => {
                    console.log(results);
                    res.end(JSON.stringify(results));
        });
        } else if (trimmedPath.toUpperCase() === 'BOATS'){
            const obj = qs;
            boats.add(db, obj, (results)=>{
                console.log(results);
                res.end(JSON.stringify(results));
            });
        } else if(trimmedPath.toUpperCase() === 'RESERVES'){
            const obj = qs;
            reserves.add(db, obj, (results)=>{
                console.log(results);
                res.end(JSON.stringify(results));
        });
        }else {
            console.log("wrong method");
        }
            break;
        case 'DELETE': if(trimmedPath.toUpperCase() === 'SAILOR'){
            const obj = qs;
            sailors.delete(db, obj, (results) => {
                console.log(results);
                res.end(JSON.stringify(results));
        });
        } else if (trimmedPath.toUpperCase() === 'BOATS'){
            const obj = qs;
            boats.delete(db, obj, (results) => {
                console.log(results);
                res.end(JSON.stringify(results));
        });
        } else if (trimmedPath.toUpperCase() === 'RESERVES'){
            const obj = qs;
            reserves.delete(db, obj, (results) => {
                console.log(results);
                res.end(JSON.stringify(results));
        });
        } else {
            res.end('Wrong path');
        }
            break;
        case 'GET': if(trimmedPath.toUpperCase() === 'SAILOR'){
            sailors.display(db, (results) => {
                const output=results.map((object)=>{
                    let values=Object.values(object);
                    values[2]=formatDate(values[2]);
                    return values.join(" ");

                }).join("\n");
                console.log(output);
                res.end(output);
            });
        } else if (trimmedPath.toUpperCase() === 'BOATS'){
            boats.display(db, (results) => {
                console.log(results);
                res.end(JSON.stringify(results));
            });
        } else if(trimmedPath.toUpperCase() === 'RESERVES'){
            reserves.display(db, (results) => {
                console.log(results);
                res.end(JSON.stringify(results));
            });
        }else {
            res.end('wrong method');
        }
            break;
        case 'PUT': if(trimmedPath.toUpperCase() === 'SAILOR'){
            const obj = qs;
        sailors.update(db, obj, (results) => {
            console.log(results);
            res.end('The update is successfull');
        });
        } else if (trimmedPath.toUpperCase() === 'BOATS'){
            const obj = qs;
        boats.update(db, obj, (results) => {
            console.log(results);
            res.end('The update is successfull');
        });
        }else {
            res.end('wrong method');
        }
            break;
        }
}

const server = http.createServer(serverHandler);
server.listen(3030,()=>{
    console.log('Server listenning at port 3030');
});
