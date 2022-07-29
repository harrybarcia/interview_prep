new Promise ((resolve, reject) => {
    console.log('1234');
    reject('abcd')
})
.then(res=> {
    console.log('works');
    console.log(res);
})
.catch(err=> {
    console.log(err);
})

var fs = require('fs');

fs.rename('sample_old.txt', 'sample_old.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed.');
});