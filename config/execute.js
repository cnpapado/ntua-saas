const execute = (stm,items,con) => {
    return new Promise((resolve) => {
        var conn = con.query(stm, items,
            (err,res) => {
                if(err) throw err;
                //console.log(res);
            });
        resolve(conn);
    })
}
module.exports = execute