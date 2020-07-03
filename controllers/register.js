const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) return res.status(400).json('can not be blank');
    // bcrypt use to store password normallly used in database (https post body)
    // bcrypt.hash(password, null, null, (err, hash)=>{
    // 	// console.log(hash);
    // });
    const hash = bcrypt.hashSync(password);
    // create transaction to do more than one thing
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: email,
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0])
                    })
            })
            // incase we make sure it commit
            .then(trx.commit)
            // anything fail --> roll back
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
};