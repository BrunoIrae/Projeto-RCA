const express = require('express')
const app = express()
const PORT = 3000;
const bodyParser = require('body-parser')

//Criptografar a senha do usuário
const Bcrypt = require('bcrypt')

//Bd para Login
const connection = require('./database/bd_login', './database/bd_formulario')
const cadastroUser = require('./database/cadastro_usuario');

//BD para cadastro Pet

const cadastroPet = require('./database/cadastro_pet');

//User
const usuario = require('./database/cadastro_usuario');

//Pet
const pet = require('./database/cadastro_pet');
const { DatabaseError } = require('sequelize');
const { response, application } = require('express');

//Executando servidor
app.listen(PORT)

//Configurando body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//Configurando EJS
app.set('view engine', 'ejs')

//Configurando arquivos static
app.use(express.static('public'))

//Configuração da conexão com o banco de dados
connection.authenticate().then(()=>{
    console.log('Conexão com o banco de Dados feita com sucesso !')
}).catch((error)=>{
    console.log(error)
})

//Rota de cadastro user
app.post('/cadastro-user', (req, res)=>{
    var email = req.body.email
    var senha = req.body.senha

    var salt = Bcrypt.genSaltSync(10)
    var hash = Bcrypt.hashSync(senha, salt)
    cadastroUser.create({
        email: email,
        senha: hash,
        confirma_senha: req.body.confirma_senha
    }).then(function(){
        res.redirect("/login")
    }).catch(function(erro){
        res.send("Houve erro no cadastro, cadastro não efetuado." + erro)
    })
})

//Rota de cadastro
app.post('/cadastro-pet', (req, res)=>{
    var nome_pet = req.body.nome_pet
    var sexo_pet = req.body.sexo_pet
    var data_resgate_pet = req.body.data_resgate_pet
    var cidade = req.body.cidade
    var estado = req.body.estado
    var endereco = req.body.endereco

    cadastroPet.create({
        nome_pet: nome_pet,
        sexo_pet: sexo_pet,
        data_resgate_pet: data_resgate_pet,
        cidade: cidade,
        estado: estado,
        endereco: endereco,
    }).then(function(){
        res.redirect("/main")
    }).catch(function(erro){
        res.send("Houve erro no cadastro, cadastro não efetuado." + erro)
    })
})

//Rota de Logar
app.post('/logado', (req,res)=>{
    var email = req.body.email
    var senha = req.body.senha

    cadastroUser.findOne({where:{email:email}}).then(usuario =>{
        if(usuario!=undefined){
            var correct = Bcrypt.compareSync(senha, usuario.senha)
            if(correct){
                res.redirect("/main")
            }else{
                res.redirect("/login")
            }
        }else{
            res.redirect("/login")
        }
    })
})

//Rota principal
app.get('/', (req, res) =>{
    res.render('index')
})

//Rota main
app.get('/main',(req, res)=>{
    res.render('page/main')
})

//Rota login
app.get('/login',(req, res)=>{
    res.render('partials/login')
})

//Rota cadastro
app.get('/cadastro',(req, res)=>{
    res.render('partials/cadastro')
})


//Iniciando o servidor
app.listen((PORT , ()=>{
    console.log('Servior online!')
}))

//Rota cadastro
app.get('/formulario',(req, res)=>{
    res.render('partials/formulario')
})


//Rota principal
app.get('/pets', (req, res) =>{
    cadastroPet
})
