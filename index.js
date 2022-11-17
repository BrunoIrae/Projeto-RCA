const express = require('express')
const app = express()
const PORT = 3000;
const bodyParser = require('body-parser')
const Bcrypt = require('bcrypt')
const connection = require('./database/bd_login')
const cadastroUser = require('./database/cadastro_usuario');
const usuario = require('./database/cadastro_usuario');

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

//Rota de cadastro
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
//Iniciando o servidor
app.listen((PORT , ()=>{
    console.log('Servior online!')
}))

//Rota cadastro
app.get('/formulario',(req, res)=>{
    res.render('partials/formulario')
})