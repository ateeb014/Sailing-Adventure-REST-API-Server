
exports.add = function (db, obj, cb) {
    let sql = `INSERT INTO Sailing.Reserves (S_id, B_id, Day) VALUES (?, ?, ?)`;
    let values = [obj.S_id, obj.B_id, obj.Day];

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        cb(results);
    });
};

exports.display = function(db, cb){
    let sql = `SELECT * FROM Sailing.Reserves`;
    db.query (sql,(err, results)=>{
        if (err) throw err;
        cb(results);
    });
};

exports.delete = function (db, obj, cb) {
    let sql = `DELETE FROM Sailing.Reserves WHERE S_id=? AND B_id=? AND Day=?`;
    let values = [obj.S_id, obj.B_id, obj.Day];

    db.query(sql, values, (err, results) => {
        if (err) throw err;
        cb(results);
    });
};

