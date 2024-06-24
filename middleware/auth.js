const jwt =  require('jsonwebtoken');
const { promisify } = require('util');

module.exports = {
    eAdmin: async function (req, res, next) {
        const authHeader = req.headers.authorization;
        //console.log(authHeader);
        if(!authHeader){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário realizar o login para acessar a página - Token A não informado"
            })
        }

        const [bearer, token] = authHeader.split(' ')
        console.log("bearer: " + bearer + " token: " + token)

        if(!token){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário realizar o login para acessar a página - Token B não informado"
            })
        }

        try {
            const decode = await promisify(jwt.verify)(token, "J9N309539K622964LNGT01189JFR7649K9")
            req.userId = decode.id
            return next()
        }catch(error){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro: Necessário realizar o login para acessar a página - Token C não informado"
            })
        }
    }
}