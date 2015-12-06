const remote = require('remote');
const dialog = remote.require('dialog');
const BrowserWindow = remote.BrowserWindow ;
const mainWindow = BrowserWindow.getFocusedWindow() ;

var choose_source = function(){
  
  dialog.showOpenDialog( 
    mainWindow ,
    { 
      'title' : 'Please choose the source folder.' ,
      'properties' : ['openDirectory']             ,
    } , 
    function( array_of_filepaths ){
      var result = array_of_filepaths[0] ;
      document.querySelector('.source_path').innerHTML = result ;
    }
  );
};

document.querySelector('.source_selector')
  .addEventListener('click' , function(ev) {
    choose_source() ;
  })
;
