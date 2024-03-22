const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8000;

//récupération de requète
app.get('/', (request, result) => {
    result.send('Hello world');
})

//récupération de requète sur l'url /jwt
app.get('/jwt', (request, result) => {

    // créer la fonction pour génèrer les token
    const createTokenFromJson = (jsonData, option = {}) => {
        try {
            const secretKey = "token-sécurisé"
            const token = jwt.sign(jsonData, secretKey, option)
            return token;
        } catch(error) {
            console.log("Error :", error.message);
            return null
        }
    }

    // récupération des identifiants de connection
    const jsonData = {email: "exemple@gmail.com", password : "password trop fort"}
    const token = createTokenFromJson(jsonData);

    //Ajout du token dans un fichier json
    if (token) {
        result.json({status: true, token: token})
    }else {
        result.json({status: false})
    }

})

//Lancement du serveur sur un port choisi
app.listen(port, () => {
    console.log('serveur en ligne sur : http://localhost:8000/');
})