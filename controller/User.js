const userModel = require('../model/User.js')
const response = require('../config/response')
const bcrypt = require('bcrypt')


exports.registrasi = (data) =>
    new Promise((resolve, reject) => {
        userModel.findOne({userName: data.userName})
            .then(user => {
                if (user){
                    resolve(response.commonErrorMsg('Username sudah digunakan'))
                }else {
                    bcrypt.hash(data.password, 10, (err, hash)=>{
                        if (err){
                            reject(response.commonErrorMsg)
                        }else {
                            data.password = hash
                            userModel.create(data)
                                .then(()=> resolve(response.commonSuccessMsg('berhasil registrasi')))
                                .catch(() =>reject(response.commonErrorMsg('mohon maaf registrasi gagal')))
                        }
                    })
                }
            }).catch(()=>reject(response.commonError))
    })

exports.login = (data) =>
    new Promise((resolve, reject) => {
        userModel.findOne({
            userName: data.userName
        }).then(user =>{
            if (user){
                if (bcrypt.compareSync(data.password, user.password)){
                    resolve(response.commonResult(user))
                }else {
                    reject(response.commonErrorMsg('password salah'))
                }
            }else {
                reject(response.commonErrorMsg('username tidak di temukan'))
            }
        })
    })