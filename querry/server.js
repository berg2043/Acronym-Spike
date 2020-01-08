const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const pool = require('./pool');

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('querry/public'));

/** ---------- EXPRESS ROUTES ---------- **/
// app.post('/word', async (req,res) => {
//   const client = await pool.connect()
//   const answer = []
//   const words = Object.keys(req.body)
//   await Promise.all(words.map( async word=>{
//     const queryText = `SELECT * FROM "words" WHERE "word" = $1;`
//     found = await client.query(queryText, [word]);
//     found = found.rows;
//     return found[0]? word: null
//   })).then(results=>{
//     answer.push(results)
//   })
//   res.send(answer);
//   client.release()
// })
app.post('/word', (req,res) => {
  let list = Object.keys(req.body);
  let blings = ''
  for(let i = 0; i<list.length; i++){
    blings += `$${i+1}, `
  }
  blings = blings.slice(0,blings.length-2);
  const queryText = `SELECT * FROM "words" WHERE "word" IN (${blings});`;
  pool.query(queryText, Object.keys(req.body)).then(results=>{
    res.send( results.rows.map(item=>
      item['words'] = req.body[item['word']]
    ));
  }).catch(err=>{
    console.log(err);
    res.sendStatus(500);
  })
})
/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});