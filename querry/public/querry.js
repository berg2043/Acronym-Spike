 
const words = [
  ['great', 'big', 'enourous', 'extreme', 'high', 'huge', 'immense', 'strong', 'terrible', 'remendous', 'vast'],
  ['function', 'operation', 'utilization', 'application'],
  ['inclusive', 'broad', 'comprehensive']
];

function cartesian(arg) {
  // creates permutations of all combinations of words
  var r = [], max = arg.length-1;
  function helper(arr, i) {
      for (var j=0, l=arg[i].length; j<l; j++) {
          var a = arr.slice(0); // clone arr
          a.push(arg[i][j]);
          if (i==max)
              r.push(a);
          else
              helper(a, i+1);
      }
  }
  helper([], 0);

  const t = r.reduce((outer, inner)=>{
    let word = inner.reduce((str, i)=>{
      str += i[0]
      return str;
    },'')
    outer[word]? outer[word].push(inner):outer[word]=[inner]
    return outer;
  },{})
  
  axios.post('/word', t).then(response=>{
    console.table(response.data);
  }).catch(err=>{
    console.log(err);
  })
  return t;
}

console.log(cartesian(words));