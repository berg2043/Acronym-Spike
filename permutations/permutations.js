const words = [
  ['great', 'big', 'enourous', 'extreme', 'high', 'huge', 'immense', 'strong', 'terrible', 'remendous', 'vast'],
  ['function', 'operation', 'utilization', 'application'],
  ['inclusive', 'broad', 'comprehensive']
];

// const words1 = ['great', 'big', 'enourous', 'extreme', 'high', 'huge', 'immense', 'strong', 'terrible', 'remendous', 'vast'];
// const words2 = ['function', 'operation', 'utilization', 'application'];
// const words3 = ['inclusive', 'broad', 'comprehensive'];

// function permuations(arr){
//   holder = arr.reduce((arr, item, currentIndex)=>{
//     arr[currentIndex] = item.reduce((outer, inner)=>{
//       outer[inner[0]]? outer[inner[0]].push(inner):outer[inner[0]] = [inner];
//       return outer;
//     },{})
//     return arr;
//   },{})
//   // for(key1 in holder){
//   //   for(key2 in holder)
//   // }
//   return holder;
// }

// console.log(permuations(words));



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


  // Gets first letter
  // const g =[]
  // r.forEach(item=>{
  //   let h=[]
  //   item.forEach(el=>{
  //     h.push(el[0]);
  //   })
  //   g.push(h);
  // })
  // Gets list of words
  // const q = g.reduce((outer, inner)=>{
  //   let word = inner.reduce((str,i)=>{
  //     str+=i
  //     return str;
  //   },'')
  //   outer[word]? null: outer[word]=true;
  //   return outer
  // },{});

  // Creates an object that has accronyms that references the words that create them
  const t = r.reduce((outer, inner)=>{
    let word = inner.reduce((str, i)=>{
      str += i[0]
      return str;
    },'')
    outer[word]? outer[word].push(inner):outer[word]=[inner]
    return outer;
  },{})

  return t;
}

console.log(cartesian(words));