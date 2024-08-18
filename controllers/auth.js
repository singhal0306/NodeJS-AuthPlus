const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path= require('path');
const pool = require("../src/mysql");
const { promisify } = require("util");

exports.logout = (req,res)=>{
    res.clearCookie('jwt')
    res.status(200).redirect('/')
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                message: "Please provide an email and password"
            })
        }

        pool.query("select * from info where email = ?", [email], async (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                // console.log(result)
                if (!result || !(await bcrypt.compare(password, result[0].password))) {
                    res.status(401).render("login", {
                        message: "Email or Password is incorrect."
                    })
                }

                const id = result[0].id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: ", token);

                const cookiesOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookiesOptions);
                res.status(200).redirect("/profile");
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.register = (req, res) => {

    // console.log(req.body)
    // const data = {
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password,
    //     passwordConfirm: req.body.passwordConfirm
    // }
    const { username, email, password, passwordConfirm } = req.body;

    pool.query("SELECT EMAIL FROM INFO WHERE EMAIL = ?", [email], async (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result && result.length > 0) {
            return res.render('signup', {
                message: "Email is already in use."
            })
        }
        else if (password !== passwordConfirm) {
            return res.render("signup", {
                message: "Password do not match."
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        pool.query("INSERT INTO info SET ?", { username: username, email: email, password: hashedPassword }, (err, result, field) => {
            if (err) {
                console.log(err);
            }
            else {
                // console.log(result)
                res.render("signup", {
                    message: "Registered Successfully."
                })
            }
        })
    })
}

exports.isLoggedIn = async (req, res, next) => {
    // console.log(req.cookies)
    if (req.cookies.jwt) {
        try {

            //1.) Verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            // console.log(decoded)

            //2.) Check if the user still exists
            pool.query("Select * from info where id = ?", [decoded.id], (error, result) => {
                if (error) {
                    console.log(error)
                }
                else {
                    if (!result) {
                        return next();
                    }
                    req.user = result[0]
                    return next()
                }
            })

        } catch (error) {
            console.log(error)
            return next()
        }
    } else {
        next();
    }
}

exports.image = async(req, res, next) =>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.")
    }

    if (req.cookies.jwt){
        try{
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            
            let sampleFile = req.files.profile;
            // console.log(sampleFile);
            midpath = path.resolve(__dirname,"../upload")
            let uploadPath = midpath + '/' + sampleFile.name
            
            sampleFile.mv(uploadPath, (err) => {
                if (err) {
                    return res.status(500).send(err)
                }
            })
            
            pool.query('update info set profile_image = ? where id = ?', [sampleFile.name, decoded.id] ,(err, result, field) =>{
                if(!err){
                    res.redirect('/profile');    
                }
                else{
                    console.log(err)
                }
            })
        } catch(error) {
            console.log(error)
            return next()
        }
    } 
}