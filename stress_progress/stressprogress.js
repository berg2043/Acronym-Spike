const pool = require('./pool');


async function words (num) {
    const arr = []
    let dict = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    for(let i=0; i<num; i++){
      let word = ''
      for(let j = 0; j<4; j++){
        word += dict[Math.floor(Math.random()*dict.length)]
      }
      arr.push(word);  
    }
  const results = await pool.query(
    `EXPLAIN ANALYZE SELECT * FROM "words" WHERE "word" = ANY($1::varchar(50)[]);`,
    [arr]
  ).catch(err=>{return err})
  return results.rows[0];
}

// words(1000);
// console.log('next');
words(1000000).then(r=>{console.log(r)})