const connection = function(con){
      con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      con.query("CREATE DATABASE IF NOT EXISTS Actual_Total_Load", function (err, result) {
        if (err) console.log(err);
        console.log("Database created");
      });
      con.query('USE Actual_Total_Load');
      });
      
  }
module.exports = connection;