const totalload = () => {
  let query = 
  
    `create table if not exists TotalLoad(
        DateTime DATETIME,
        ResolutionCode VARCHAR(4),
        MapCode VARCHAR(10),
        TotalLoadValue NUMERIC(10,3),
        UpdateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (DateTime, MapCode,UpdateTime)
          )`
        
      //`DROP DATABASE actual_total_load`
      return query;
  
};
module.exports = totalload;
