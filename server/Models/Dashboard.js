const { UserModel } = require("../Models/userModel.js")

module.exports={
getUserCount:()=>{
    return new Promise((resolve, reject) => {
        UserModel.find({isAllowed:'true'}).count().then((count)=>{
            resolve(count)
        })
    })
}
,}