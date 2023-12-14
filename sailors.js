
exports.add = function (db, obj, cb) {
    let sql = `INSERT INTO Sailing.Sailors (S_name, B_date, Rate)
               VALUES (?, ?, ?)`;
    let values = [obj.S_name, new Date(obj.B_date), obj.Rate];

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        cb(results);
    });
};

exports.display = function(db, cb){
    let sql =`SELECT * FROM Sailing.Sailors`;
    db.query (sql,(err, results)=>{
        if (err) throw err;
        cb(results);
    });
};

exports.delete = function (db, obj, cb) {
    let sql = `DELETE FROM Sailing.Sailors WHERE S_id=?`;
    let values = [obj.S_id];

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        cb(results);
    });
};

exports.update = function (db, obj, cb) {
let sql= ""
sql= `SELECT * FROM Sailing.Sailors WHERE S_id= \'${obj.S_id}\'`;
    db.query(sql, (err, results) => {
        if (err) {
        cb(err.message);
        }else if ( results && results.length ===0){
            cb('Sailor not found');
        } else {
            let keys = Object.keys(obj);
            const name =keys.includes('S_name')? obj.S_name: results[0].S_name;
            const date =keys.includes('B_date')? obj.B_date: results[0].B_date;
            const rate =keys.includes('Rate')? obj.Rate: results[0].Rate;
            sql= "UPDATE Sailing.Sailors SET S_name = ?, B_date = ?, Rate = ? WHERE S_id = ?";
            db.query(sql, [name, date, rate, obj.S_id], (err, results) =>{
            if (err) throw err
            console.log('The update is successful');
            cb(results);
            })
        }
    });
};