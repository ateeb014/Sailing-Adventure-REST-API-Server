

exports.add = function (db, obj, cb) {
    let sql = `INSERT INTO Sailing.Boats (B_name, Type) VALUES (?, ?)`;
    let values = [obj.B_name, obj.Type];

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        cb(results);
    });
};

exports.display = function(db, cb){
    let sql =`SELECT * FROM Sailing.Boats`;
    db.query (sql,(err, results)=>{
        if (err) throw err;
        cb(results);
    });
};

exports.delete = function (db, obj, cb) {
    let sql = `DELETE FROM Sailing.Boats WHERE B_id=?`;
    let values = [obj.B_id];

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        cb(results);
    });
};

exports.update = function (db, obj, cb) {
    let sql= ""
    sql= `SELECT * FROM Sailing.Boats WHERE B_id= \'${obj.B_id}\'`;
        db.query(sql, (err, results) => {
            if (err) {
            cb(err.message);
            }else if ( results && results.length ===0){
                cb('Boat not found');
            } else {
                let keys = Object.keys(obj);
                const Name =keys.includes('B_name')? obj.B_name: results[0].B_name;
                const Type =keys.includes('Type')? obj.Type: results[0].Type;
                sql= "UPDATE Sailing.Boats SET B_name = ?, Type = ? WHERE B_id = ?";
                db.query(sql, [Name, Type, obj.B_id], (err, results) =>{
                if (err) throw err
                console.log('The update is successful');
                cb(results);
                })
            }
        });
    };