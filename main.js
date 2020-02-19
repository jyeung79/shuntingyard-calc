const {app, BrowserWindow } = require('electron')

function createWindow () {
	// Create the browser windows
	let mainWindow = new BrowserWindow({
		width: 440,
		height: 555,
		webPreferences: {
			nodeIntegration: true
		}
	})
	mainWindow.setMenuBarVisibility(false)

	// and load the index.html of the app
	mainWindow.loadFile('./static/index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quite()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})
