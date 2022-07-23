const totalload = (name) => {
  let query = 
    `create table if not exists ${name}(
        DateTime TIMESTAMP,
        ResolutionCode VARCHAR(4),
        MapCode VARCHAR(10),
        TotalLoadValue NUMERIC(10,3),
        UpdateTime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (DateTime, MapCode,UpdateTime)
          )`
      return query;
};
module.exports = totalload;
