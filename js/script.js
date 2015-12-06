const remote        = require('remote');
const dialog        = remote.require('dialog');
const BrowserWindow = remote.BrowserWindow ;
const mainWindow    = BrowserWindow.getFocusedWindow() ;
const path          = require('path');

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
  target_path = path.extname(target_path) === '.dmg' ?
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

        // 
        // If the user chose a directory that isn't root, set the target
        // default name to be the source directory + .dmg.
        // If the user did choose, root, keep 'untitled.dmg' since'/.dmg' 
        // looks like a system file. 
        //
        default_target_path =  result === '/' ? 
          default_target_path : result + '.dmg' 
        ;
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
    // Trap for paths not yet selected.
    if( target_path === undefined || source_path === undefined ) {
      dialog.showErrorBox(
        'Oops!' , 
        'You must specify a path and a target.'  
      )
      return ;
    }
    dialog.showMessageBox(
      mainWindow ,
      {
        title   : 'Are you sure?'  ,
        type    : 'question'       ,
        buttons : [ 'Yes' , 'No' ] ,
        message : 'Please confirm the following details:\n\n' + 
                  'Source directory :\n' + 
                  source_path + '\n\n' + 
                  'Disk image name:\n'+ 
                  path.parse(target_path).base+'\n\n' + 
                  'Disk image location:\n' +
                  path.parse(target_path).dir +'\n\n' + 
                  'Is this correct?'
      },
      function( value ){
        if ( value === 0 /* 'Yes' */ ) {
          process_request( source_path , target_path ) ;
        }
      }
    );
  })
;


