const deleteStatement = (month) => { 
  let query =    
    `DELETE FROM totalload WHERE month(DateTime) = ${month}`;
}
module.exports = deleteStatement