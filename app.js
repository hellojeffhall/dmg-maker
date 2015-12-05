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
console.log( 'Creating a dmg called \'' + targetName + '\' from \'' + sourceFolder +'\'.' );
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

var hasStartedInit = false ;
var hasStarted  = false ;

Parse_puppetstrings.prototype._transform = function( chunk, enc, onDone ){
  var els = chunk.toString().split(':');
  var type = els[0] ;
  var value = els[1] ;
  var output;

  
  if( type==='PERCENT' ) {
      //
      // The first -1 should alert the user that we are initializing.
      // After that, any initializations should just add a '.' to let
      // the user know that we're still working.
      // When we have a number to report to the user, report it.
      // Once we've started, we know that if we get another -1, we must
      // be winding down.
      // If the type isn't a percent, then we know that we are done or that
      // there is a error.
      //

      var value = parseInt( value ) ;
      if ( value === -1 && hasStartedInit === false ) {
        hasStartedInit = true ;
        output = 'Initializing...' ;
      }
      else if( 
       value === -1 && 
       hasStartedInit === true && 
       hasStarted === false 
      ) {
        output = '.' ;
      }
      else if( value !== -1 ) {
        hasStarted = true ; 
        output = '\n' + parseInt(value) ;
      }
      else if( value === -1 && hasStarted ) {
        output = '\n' + 'Finishing up...' ;
      }
      else {
        output = value ;
      }
  }
  else if( type === 'created' ) {
      output = '\n' + 'done' + '\n' ;
  }
  this.push( output );
  onDone();  
};

command.stdout
  .pipe( new Parse_puppetstrings )
  .pipe(process.stdout) ;
command.stderr
  .pipe(process.stdout) ;
