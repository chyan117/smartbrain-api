const handleSignin = (req, res, db, bcrypt) => {

    const {email, password} = req.body;
    if(!email || !password) return res.status(400).json('submission form error');
    // not modify so do not need tranx
    db.select('email', 'hash').from('login')
        // where don't need object
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            // console.log(isValid);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        // console.log(user)
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            }
            else {
                res.status(400).json('wrong credential')
            }
            // console.log(data[0])
        })
        .catch(err => res.status(400).json('wrong credential'))
    // bcrypt.compare('cookies', '$2a$10$D9gj6tACdw2LbsYeOCHyge1MWaVh7YQmzJTedPdy/QxqmDRjHAyMm', (err, res)=>{
    // 	if(err) console.log(err);
    // 	else console.log("first guess", res);
    // });
    // // req.body need to body-parse by =>const bodyParser = require('body-parser') =>app.use(bodyParser.json());
    // if(req.body.email===database.users[0].email && req.body.password===database.users[0].password){
    // 	res.json(database.users[0]);
    // }
    // else{
    // 	res.status(400).json('err logging in');
    // }
}

module.exports = {
    handleSignin: handleSignin
}