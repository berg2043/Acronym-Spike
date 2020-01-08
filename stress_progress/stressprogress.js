const pool = require('./pool');


function words (num) {
  let arr = []

  let dict = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

  for(let i=0; i<num; i++){
    let word = ''
    for(let j = 0; j<4; j++){
      word += dict[Math.floor(Math.random()*dict.length)]
    }
    arr.push(word);  
  }
  
  let blings = ''
  for(let i = 0; i<arr.length; i++){
    blings += `$${i+1}, `
  }
  blings = blings.slice(0,blings.length-2);
  const queryText = `SELECT * FROM "words" WHERE "word" IN (${blings});`;
  pool.query(queryText, arr).then(results=>{
    console.log(num,results.rows);
  }).catch(err=>{
    console.log(err);
  })
  
}

// words(1000);
// console.log('next');
words(60000)