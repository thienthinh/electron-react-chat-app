'use strict';
const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu

// adds debug features like hotkeys for triggering dev tools and reload
if (process.env.NODE_ENV === 'development') {
	require('electron-debug')();
}

// prevent window being garbage collected
let mainWindow;

const ipcMain = require('electron').ipcMain;
ipcMain.on('notification-clicked', function(event, arg) {
	
	mainWindow.show();
	event.sender.send('asynchronous-reply', arg);
});

function onClosed() {
	// dereference the window
	// for multiple windows store them in an array
	mainWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 800,
		height: 600
	});

	win.loadURL(`file://${__dirname}/index.html`);
	win.on('closed', onClosed);

	if (process.env.NODE_ENV === 'development') {
		// Open the DevTools.
	  win.webContents.openDevTools();
	}

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
	
	createAppMenu();
});

function createAppMenu() {
	// Create application menu
	var template = [
	  {
	    label: 'Edit',
	    submenu: [
	      {
	        label: 'Undo',
	        accelerator: 'CmdOrCtrl+Z',
	        role: 'undo'
	      },
	      {
	        label: 'Redo',
	        accelerator: 'Shift+CmdOrCtrl+Z',
	        role: 'redo'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Cut',
	        accelerator: 'CmdOrCtrl+X',
	        role: 'cut'
	      },
	      {
	        label: 'Copy',
	        accelerator: 'CmdOrCtrl+C',
	        role: 'copy'
	      },
	      {
	        label: 'Paste',
	        accelerator: 'CmdOrCtrl+V',
	        role: 'paste'
	      },
	      {
	        label: 'Select All',
	        accelerator: 'CmdOrCtrl+A',
	        role: 'selectall'
	      }
	    ]
	  },
	  {
	    label: 'View',
	    submenu: [
	      {
	        label: 'Reload',
	        accelerator: 'CmdOrCtrl+R',
	        click: function(item, focusedWindow) {
	          if (focusedWindow) {
	            focusedWindow.reload()
	          }
	        }
	      },
	      {
	        label: 'Toggle Full Screen',
	        accelerator: (function() {
	          if (process.platform == 'darwin') {
	            return 'Ctrl+Command+F'
	          }
	          else {
	            return 'F11'
	          }
	        })(),
	        click: function(item, focusedWindow) {
	          if (focusedWindow) {
	            focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
	          }
	        }
	      },
	      {
	        label: 'Toggle Developer Tools',
	        accelerator: (function() {
	          if (process.platform == 'darwin') {
	            return 'Alt+Command+I'
	          } else {
	            return 'Ctrl+Shift+I'
	          }
	        })(),
	        click: function(item, focusedWindow) {
	          if (focusedWindow) {
	            focusedWindow.webContents.toggleDevTools()
	          }
	        }
	      }
	    ]
	  },
	  {
	    label: 'Window',
	    role: 'window',
	    submenu: [
	      {
	        label: 'Minimize',
	        accelerator: 'CmdOrCtrl+M',
	        role: 'minimize'
	      },
	      {
	        label: 'Close',
	        accelerator: 'CmdOrCtrl+W',
	        role: 'close'
	      }
	    ]
	  },
	  {
	    label: 'Help',
	    role: 'help',
	    submenu: [
	      {
	        label: 'Learn More',
	        click: function() {
	          electron.shell.openExternal('http://electron.atom.io')
	        }
	      }
	    ]
	  }
	]

	// OSX menu
	if (process.platform == 'darwin') {
	  var name = app.getName()
	  template.unshift({
	    label: name,
	    submenu: [
	      {
	        label: 'About ' + name,
	        role: 'about'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Services',
	        role: 'services',
	        submenu: []
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Hide ' + name,
	        accelerator: 'Command+H',
	        role: 'hide'
	      },
	      {
	        label: 'Hide Others',
	        accelerator: 'Command+Alt+H',
	        role: 'hideothers'
	      },
	      {
	        label: 'Show All',
	        role: 'unhide'
	      },
	      {
	        type: 'separator'
	      },
	      {
	        label: 'Quit',
	        accelerator: 'Command+Q',
	        click: function() {
	          app.quit()
	        }
	      }
	    ]
	  })

	  template[3].submenu.push(
	    {
	      type: 'separator' 
	    },
	    {
	      label: 'Bring All to Front',
	      role: 'front'
	    }
	  )
	}

	var appMenu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(appMenu)
}
