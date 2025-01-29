const sql = require("./db.js");

// constructor
const Users = function (tutorial) {
  this.title = tutorial.title;
  this.description = tutorial.description;
  this.published = tutorial.published;
};

Users.getAll = (data, result) => {
  let query = "SELECT * FROM users";
  if (data.email) {
    query += ` WHERE email = '${data.email}' AND password = '${data.password}'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};
Users.checkUserByEmail = (email, result) => {
  let query = "SELECT * FROM users";
  if (email) {
    query += ` WHERE email = '${email}'`;
  }
  sql.query(query, (err, res) => {  
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};


Users.findById = (id, result) => {
  let query = "SELECT * FROM users";
  if (id) {
    query += ` WHERE id = '${id}'`;
  }
  sql.query(query, (err, res) => {  
    if (err) {
      result(null, err); 
      return;
    }
    result(null, res);
  });
};

Users.changePassword = (data, result) => {
  let query = `UPDATE users SET password = '${data.newpassword}' WHERE email = '${data.email}'`;
  
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Users.saveOtp = (data, result) => { 
  // Before Insert delete Otp logs
  var queryDel = `DELETE FROM otp WHERE email_id = '${data.email}'`;
  sql.query(queryDel, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
    //result(null, result);  
  });
  
  const otp = Math.floor(Math.random() * (1000 + 9999) + 10);
  let query = `INSERT INTO otp (otp, email_id) VALUES (?, ?);`;
    sql.query(query, [otp,data.email], (err, rows) => {  
        result(null, rows); 
    }); 
};


Users.CheckOtpForLogin = (data, result) => {
  let query = "SELECT * FROM otp";
  if (data.email) {
    query += ` WHERE email_id = '${data.email}' AND otp = '${data.otp}'`;
  }
  sql.query(query, (err, res) => {  
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Users.updateUserProfile = (data, result) => {
  let query = `UPDATE users SET name = '${data.name}' , email = '${data.email}' WHERE id = '${data.id}'`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res); 
  });
};
module.exports = Users;   