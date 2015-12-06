const remote = require('remote');
const dialog = remote.require('dialog');
const BrowserWindow = remote.BrowserWindow ;
const mainWindow = BrowserWindow.getFocusedWindow() ;

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

var set_target = function( callback ){
};

// I/O

var default_target_path ;

document.querySelector('.source_selector')
  .addEventListener('click' , function(ev) {
    choose_directory( function (result) {
      if ( result !== undefined ) {
        document.querySelector('.source_path').innerHTML = result ;
        default_target_path = result + '.dmg';
      }
    }) ;
  })
;

document.querySelector('.target_selector')
  .addEventListener('click' , function(ev) {
    dialog.showSaveDialog( 
      mainWindow ,
      { 
        'properties'  : ['openDirectory' ]  ,
        'defaultPath' : default_target_path 
      } , 
      function( result ){
        if ( result !== undefined ) {
          document.querySelector('.target_path').innerHTML = result ;
        };
      }
    );
  })
;
