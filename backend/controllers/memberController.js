const fs = require('fs')
const asyncHandler = require('express-async-handler')
const { error } = require('console')

//@desc Register a new member
//@route POST /api/users
//@access PUBLIC
const addMemeber = asyncHandler(async(req, res) => {
    const {data} = req.body
    fs.writeFile("myFile.json", data, (error) => {
        if(error){
            res.status(401)
            console.log(error)
        }           
        else
        {
            res.status(200)
            console.log('The file was created.')
        }
    })

})


module.exports = {
    addMemeber
}