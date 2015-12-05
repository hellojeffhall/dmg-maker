var spawn = require('child_process').spawn ;
var inherits = require('util').inherits ;
var Transform = require('stream').Transform ;

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

var Parse_puppetstrings = function() {
  Transform.call(this) ;
};
inherits( Parse_puppetstrings , Transform ) ;

Parse_puppetstrings.prototype._transform = function( chunk, enc, onDone ){
  this.push( chunk );
  onDone();  
};

command.stdout
  .pipe( new Parse_puppetstrings )
  .pipe(process.stdout) ;
command.stderr
  .pipe( new Parse_puppetstrings )
  .pipe(process.stdout) ;
