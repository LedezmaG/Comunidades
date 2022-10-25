const connection = require('../../database/connection');
const UsersModel = require('../../models/catalog/users');
const PermissionsModel = require('../../models/system/modules/permissions');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SignInController = async (req, res = response) => {
    const transaction = await connection.transaction()
    try {
        const { email, password } = req.body
        
        const user = await UsersModel.findOne({
            where: { 
                email,
                active: true
            },
            transaction,
        })
        if (!user || user.email !== email) {
            throw new Error("Email not found")
        }
        if (!user || user.email !== email) {
            throw new Error("Email not found")
        }
        const validPass = await bcrypt.compareSync(password, user.password)
        if (!validPass) {
            throw new Error("Email or password wrong")
        }

        const token = jwt.sign(
            {
                id: user.id,
                // avatar: avatar?.url,
                name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.id_role,
            },
            `${process.env.SECRET_KEY}`,
            { expiresIn: '30d' }
        )

        await transaction.commit()
        return res.status(200).json({
            status: true,
            token
        })
    } catch (error) {
        await transaction.rollback()
        return res.status(400).json({status: false, messaje: error.message})
    }
} 

const SignUpController = async (req, res = response) => {
    const transaction = await connection.transaction()
    try {
        const { id_role, id_avatar, first_name, last_name, email, password } = req.body
        const salt = await bcrypt.genSalt(10)
        const pass = await bcrypt.hash(password, salt)
        const created = await UsersModel.create(
            {
                id_role, 
                id_avatar, 
                first_name, 
                last_name, 
                email, 
                password: pass
            },
            { transaction }
        )
        await transaction.commit()
        return res.status(200).json({
            status: true,
            response: created
        })
    } catch (error) {
        await transaction.rollback()
        return res.status(400).json({status: false, messaje: error.message})
    }
} 

const JwtDecodeController = async (req, res = response) => {
    try {
        
        const { token } = req.body
        const decrypt = jwt.verify(token, `${process.env.SECRET_KEY}`)
        return res.status(200).json({
            status: true,
            response: decrypt
        })
    } catch (error) {
        return res.status(400).json({status: false, messaje: error.message})
    }
} 

module.exports = {
    SignInController,
    SignUpController,
    JwtDecodeController
}