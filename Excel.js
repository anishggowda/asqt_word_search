const xlsxFile = require('read-excel-file/node');

xlsxFile('./').then((rows) => {
for (i in rows){
       for (j in rows[i]){
           console.dir(rows[i][j]);
}
   }
})
