var BrowserWindow = require('browser-window');
var join          = require('path').join ;
var app           = require('app');

app.commandLine.appendSwitch('remote-debugging-port', '8315');
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1'); 

// Run when ready 

app.on('ready' , function(){
  var mainWindow = new BrowserWindow({
    width  : 800 ,
    height : 600 
  });

  mainWindow.loadURL( 
    join( 'file://' , __dirname , '..' , '/index.html' ) 
  );

});

