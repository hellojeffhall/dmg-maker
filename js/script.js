const remote = require('remote');
const dialog = remote.require('dialog');
const BrowserWindow = remote.BrowserWindow ;
const mainWindow = BrowserWindow.getFocusedWindow() ;
const extname = require('path').extname ;

// Functions

var choose_directory = function( callback ){
  dialog.showOpenDialog( 
    mainWindow ,
    { 
      'properties' : ['openDirectory']             ,
    } , 
    function( array_of_filepaths ){
      var result = array_of_filepaths[0] ;
      callback( result ) ; 
    }
  );
};

var set_target = function( default_path, callback ){
  dialog.showSaveDialog( 
    mainWindow ,
    { 
      'properties'  : ['openDirectory' ]  ,
      'defaultPath' : default_path 
    } , 
    function( result ){
      callback( result ) 
    }
  )
};

var process_request = function ( source_path , target_path ) {
  //
  // Make sure that we are saving with the dmg extension.
  // Is this necessary/ good? Or should we allow the user to specify 
  // the file extension?
  // 
  target_path = extname(target_path) === '.dmg' ?
     target_path : target_path + '.dmg'
  ;
  if( target_path === undefined || source_path === undefined ) {
    console.error ('The source and/or target were not specified.');
    return ;
  }
  var exec_string = 'node app.js ' + source_path + ' ' + target_path ;
  console.log( exec_string ) ;
}

// I/O

var target_path ;
var source_path ;
var default_target_path = '/untitled.dmg';

document.querySelector('.source_selector')
  .addEventListener('click' , function(ev) {
    choose_directory( function (result) {
      if ( result !== undefined ) {
        // 
        // Put the selected directory's path on the screen,
        // set the source_path global, and set the default target path
        // so that by default the user will create the .dmg "next to" 
        // the source directory.
        // 

        document.querySelector('.source_path').innerHTML = result ;
        source_path = result ;
        default_target_path = result + '.dmg' ;
      }
    }) ;
  })
;

document.querySelector('.target_selector')
  .addEventListener('click' , function(ev) {
    //
    // If we're previously specified a target path, use that one.
    // If we haven't already specified a target path, use the default (which
    // has a default value but is also changed when the user picks a source
    // directory).
    //
    var default_path = target_path === undefined ? 
      default_target_path : target_path 
    ;
    set_target( default_path , function( result ) {
      if ( result !== undefined ) {
        document.querySelector('.target_path').innerHTML = result ;
        target_path = result ;
      };
    })  
  })
;

document.querySelector('.button.submit')
  .addEventListener( 'click' , function(ev) {
    process_request( source_path , target_path ) ;
  })
;


