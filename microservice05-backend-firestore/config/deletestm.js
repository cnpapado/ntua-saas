const deleteStatement = (prevmonth) => { 
  let query =    
    `DELETE FROM totalload WHERE month(DateTime) = ${prevmonth}`;
    console.log(query);
  return query;
}
module.exports = deleteStatement