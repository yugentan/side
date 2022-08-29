const sql = require("./db");

function mySql() {
  //CREATE
  this.create = function (queryString) {
    return new Promise((resolve, reject) => {
      sql.query(queryString, (err) => {
        if(err){
          console.log(err)
          return reject(false)
        }else{
          return resolve(true)
        }
      });
    });
  };
  this.altread = function (queryString){
    return new Promise((resolve, reject)=>{
      sql.query(queryString, (err,result)=>{
        if(err){
          reject(err)
        }else{
          if(result.length === 0){
            resolve(false)
          }else{
            resolve(result)
          }
        }
      })
    })
  }
  //READ
  this.read = function (queryString) {
    return new Promise((resolve, reject) => {
      sql.query(queryString, (err, result) => {
        return result.length == 0 ? reject(false) : resolve(result);
      });
    });
  };
  //UPDATE
  this.update = function (queryString) {
    return new Promise((resolve, reject) => {
      sql.query(queryString, (err, result) => {
        return result.length == 0 ? reject(false) : resolve(result);
      });
    });
  };
  //DELETE
}
module.exports = new mySql();
