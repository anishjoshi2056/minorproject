const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
//Setting view engine template
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.get('/',(req,res)=> {
    res.render('home')
})

app.listen(port,()=> {
    console.log(`Listining to the port:${port}`)
})
