const jwt = require("jsonwebtoken");


const jwrFilter = (req, res, next) =>{
    const token = req.headers["Authorization"];
    if(!token) return res.status(401).json({message : "No token found"});

    jwt.verify(token, "pedi-care-secret-key", (error, decode) => {
        if(error) return res.status(401).json({message : "Auth failed"});
        next();
    });
}