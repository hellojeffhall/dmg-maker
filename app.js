var sys = require('sys');
var exec = require('child_process').exec ;
var child ;

var args = process.argv ;

var sourceFolder = process.argv[2] ;
var targetName   = process.argv[3] ;

var exec_string = 'hdiutil create -format UDZO ' + 
                  '-srcfolder ' + sourceFolder +  
                  targetName + '.dmg'
;

console.log();
console.log( process.env.USER + '$ ' + exec_string );
console.log();

/*--------
Mac only
--------*/

exec( exec_string , function( err , stdout  , stderr) {

  if (stdout.length !== 0 ) {
    console.log(stdout) ;
  }

  if (stderr.length !== 0 ) {
    console.log( stderr ) ;
  }


  if( err !== null ) {
    console.log(err) ;
  }
});
