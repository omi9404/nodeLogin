const mysql = require("mysql");
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

exports.register = (req,res) => {
       // const name = req.body.name;
        //const email = req.body.email;
        //const password = req.body.password;
        const {name,email,password,confirmPass} = req.body;
        db.query('SELECT email from users where email = ?',[email],(error,result) =>{
            if(error){
                console.log(error);
            }
            if(result.length > 0){
                return res.render('register',{
                    message:'email already in use'
                });
            }else if(password!==confirmPass){
                return res.render('register',{
                    message:'Password and Confirm passsowrd should be same.'
                });
            }
        });

        //Insert record into dataase
        db.query("INSERT INTO users SET ? " , {name:name,email:email,password:password},(error,result) =>{
            if(error){
                console.log(error);
            }else{
                console.log('Result',result);
                return res.render("register",{
                    message:"user registered"
                });
            }
        });

        //console.log(req.body);
        //res.send("Form sumitted");
}