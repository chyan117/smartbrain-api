const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    // let found = false;
    // database.users.forEach(user=>{
    // 	if(user.id===id){
    // 		found = true;
    // 		return res.json(user);
    // 	}
    // 	// }else{
    // 	// 	res.status(404).json('no such user');
    // 	// }
    // })
    db.select('*').from('users').where({
        id: id

    }).then(user => {
        // console.log(user)
        if (user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('Not found')
        }
    }).catch(err => res.status(400).json('err getting'))
    // if(!found){
    // 	res.status(404).json('no such user');
    // }
}

module.exports = {
    handleProfileGet: handleProfileGet
}