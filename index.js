const express = require('express')
const fetchUrl  = require('fetch').fetchUrl
const app = express()
const bp = require('body-parser')

app.use(bp.json())

app.use(bp.urlencoded({ extended: true }))

const NodeCache = require("node-cache")

const myCache = new NodeCache({ stdTTL: 300000})

app.post('/', function (req, res) {

cep = req.body.cep.toString()
usuario = req.body.usuario.toString()
senha = req.body.senha.toString()

    //validação do cpf

if (cep == "")
    console.log("O CEP inserido é inválido, pois está vazio.")


else if(cep.length > 8)
    console.log("O CEP inserido é inválido, pois contem mais de 9 dígitos. Digite somente os 9 números.")
    

else if(cep.length < 8)
    console.log("O CEP inserido é inválido, pois contem menos de 9 dígitos. Digite somente os 9 números.")
    

else if(isNaN(cep))
    console.log("O CEP inserido é inválido, pois contem letras ou símbolos. Digite somente números.")
    

else if(cep.indexOf(' ') >= 0)
    console.log("O CEP inserido é inválido, pois não deve conter espaços.")   

    //autenticação

else if(usuario.localeCompare("zeus.dacax"))
    console.log("O nome de usuário informado não existe.")


else if(senha.localeCompare("dacax123"))
    console.log("A senha informada está incorreta.")
    
else if (myCache.has("dados")){
    console.log("Estava armazenado em cache: " +myCache.get("dados"))
}
else{  
    fetchUrl('https://viacep.com.br/ws/' + cep + '/json/', function (error, meta, body){
    corpo=body.toString()
    if(corpo.localeCompare('"erro": "true"')){  //utilizando a validação do site para verificar se o cpf existe ou não
        myCache.set("dados", corpo)
        console.log("Não estava armazenado em cache: " + corpo);
    }
    else
        console.log("O CEP informado não existe.")      
        
    }
    )}

res.send("Requisição enviada.");

})

app.listen(3000)