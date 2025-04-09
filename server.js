// test accounts:
// {"userName": "moomer", "password": "1234", "password2": "1234"}
// {"userName": "poobie", "password": "moooo:3", "password2": "moooo:3"}

const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const userService = require("./user-service.js");
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require("passport-jwt");

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: process.env.JWT_SECRET,
};

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    if (jwt_payload) {
        next(null, {
            _id: jwt_payload._id,
            userName: jwt_payload.userName,
        });
    }
    else {
        next(null, false);
    }
});

const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
passport.use(strategy);


app.post("/api/user/register", (req, res) => {
    userService.registerUser(req.body)
    .then((msg) => {
        res.json({ "message": msg });
    }).catch((msg) => {
        res.status(422).json({ "message": msg });
    });
});

app.post("/api/user/login", (req, res) => {
    userService.checkUser(req.body)
    .then((user) => {
        //now we mae a payload from the thing that chechuser returns!!!
        let payload = {
            _id: user._id,
            userName: user.userName,
        };

        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        console.log(`token: ${token}`);
        //retur n the token!!
        res.json({message: "logged in!!", token: token});
    }).catch(msg => {
        res.status(422).json({ "message": msg});
    });
});

app.get("/api/user/favourites", passport.authenticate('jwt', { session: false }), (req, res) => {
    userService.getFavourites(req.user._id)
    .then(data => {
        res.json(data);
    }).catch(msg => {
        res.status(422).json({ error: msg });
    })

});

app.put("/api/user/favourites/:id", passport.authenticate('jwt', {session:false}), (req, res) => {
    console.log("hit");
    console.log(req.user._id);
    userService.addFavourite(req.user._id, req.params.id)
    .then(data => {
        res.json(data)
    }).catch(msg => {
        res.status(422).json({ error: msg });
    })
});

app.delete("/api/user/favourites/:id", passport.authenticate('jwt', {session:false}), (req, res) => {
    userService.removeFavourite(req.user._id, req.params.id)
    .then(data => {
        res.json(data)
    }).catch(msg => {
        res.status(422).json({ error: msg });
    })
});

app.get("/api/user/history",passport.authenticate('jwt', {session:false}), (req, res) => {
    userService.getHistory(req.user._id)
    .then(data => {
        res.json(data);
    }).catch(msg => {
        res.status(422).json({ error: msg });
    })

});

app.put("/api/user/history/:id", passport.authenticate('jwt', {session:false}), (req, res) => {
    userService.addHistory(req.user._id, req.params.id)
    .then(data => {
        res.json(data)
    }).catch(msg => {
        res.status(422).json({ error: msg });
    })
});

app.delete("/api/user/history/:id", passport.authenticate('jwt', {session:false}), (req, res) => {
    userService.removeHistory(req.user._id, req.params.id)
    .then(data => {
        res.json(data)
    }).catch(msg => {
        res.status(422).json({ error: msg });
    })
});

userService.connect()
.then(() => {
    app.listen(HTTP_PORT, () => { console.log("API listening on: " + HTTP_PORT) });
})
.catch((err) => {
    console.log("unable to start the server: " + err);
    process.exit();
});

function authUser() {

}