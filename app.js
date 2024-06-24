const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const routes = require ('./routes');

const { eAdmin } = require('./middleware/auth')

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
    return res.send('pong')
})


app.get('/', eAdmin, async (req, res) => {
    return res.json({
        erro: false,
        mensagem: "Listar usuários",
        id_usuario_logado: req.userId
    })
})

app.post('/cadastrar', async (req, res) => {
    const password = await bcrypt.hash("123456", 8)

    console.log(password)

    return res.json({
        erro: false,
        mensagem: "Cadastrar usuário",
    })
})

app.post('/login', async (req, res) => {
    // $2a$08$Rl4lKw2Dtj64tSC7dFTlFOVTYArN8gavfqLVRiDaqTOMh2qvjfKxS
    console.log(req.body)

    if(req.body.email != "jonasbfranco@gmail.com"){
        return res.status(400).json({
            erro: true,
            mensagem: "Email inválidos"
        })
    }

    if(!(await bcrypt.compare(req.body.password, "$2a$08$Rl4lKw2Dtj64tSC7dFTlFOVTYArN8gavfqLVRiDaqTOMh2qvjfKxS"))){
        return res.status(400).json({
            erro: true,
            mensagem: "Senha inválidos"
        })
    }

    var token = jwt.sign({id: 2}, "J9N309539K622964LNGT01189JFR7649K9", {
        //expiresIn: 600 //10 minutos
        expiresIn: 60 //1 minutos
        //expiresIn: '7d' //7 dias
    })

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso",
        token: token
    })
})


var port = (process.env.PORT || 3000)

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})