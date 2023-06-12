const User = require('../modules/User');
const bcrypt = require('bcrypt');

module.exports = class UserController{
    static async register(req, res){        
        const { name, email, phone, password, confirmpassword} = req.body;
        //Validações
        if(!name){
            res.status(422).json({ message: 'O nome é obrigatório' });
            return;
        }

        if(!email){
            res.status(422).json({ message: 'O email é obrigatório' });
            return;
        }

        if(!phone){
            res.status(422).json({ message: 'O telefone é obrigatório' });
            return;
        }

        if(!password){
            res.status(422).json({ message: 'A senha  é obrigatória' });
            return;
        }

        if(!confirmpassword){
            res.status(422).json({ message: 'A confirmação de senha  é obrigatória' });
            return;
        }

        if(passoword !== confirmpassword){
            res.status(422).json({
                message:' A senha é a confirmação de senha precisam ser iguais!'                
            })
            return;
        }
        
        // check if user exists 
        const userExists = await User.findOne({email: email})
        if(userExists){
            res.status(422).json({
                message: 'E-mail já cadastrado, utilize outro e-mail para criar o cadastro!'
            })
            return
        }

        // create a password 
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        //Create a USER
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        });

        try{
            const newUser = await user.save()
            res.status(201).json({message:'Usuário criado com sucesso!', newUser})

        } catch(error){
            res.status(500).json({
                message: error
            })
        }
    }    
}