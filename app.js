var spawn = require('child_process').spawn ;

var args = process.argv ;

var sourceFolder = process.argv[2] ;
var targetName   = process.argv[3] + '.dmg' ;

var exec_string = ' ' + 'hdiutil create -format UDZO ' + 
                  ' ' + '-srcfolder ' + sourceFolder +  
                  ' ' + targetName + '.dmg' + 
                  ' ' + '-puppetstrings'
;

console.log();
console.log( 'STARTING: ' + exec_string );
console.log();

/*--------
Mac only
--------*/

var command = spawn( 
  'hdiutil' , 
  [
    'create'     ,
    '-format'    ,
    'UDZO'       ,
    '-srcfolder' ,
    sourceFolder ,
    targetName   ,
    '-puppetstrings'
  ]
);

command.stdout.pipe(process.stdout) ;
command.stderr.pipe(process.stdout) ;
