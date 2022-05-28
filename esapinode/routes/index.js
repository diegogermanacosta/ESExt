
//import { getDatabase, ref, set } from "firebase/database";

const { Router } = require('express');
const router = Router();
const db = require("../src/firebase");


router.get('/', (req, res) => {    
    res.json(
        {
            "Title": "Hello stranger!"
        }
    );
})

router.post("/saveRutas",(req,res) => {
    console.log(req.body.imperio);
    console.log(req.body.partida);
    console.log(req.body.clan);
    console.log(req.body.ronda);
    console.log(req.body.ciudades);
    //db.ref()
    db.ref('rutas/' + req.body.partida + '/'+ req.body.ronda + '/'+ req.body.clan + '/'+ req.body.imperio + '/' ).set( req.body.ciudades);
    res.json({
        "msg":"rutas guardadas uwu"
    })
});
 
module.exports = router;