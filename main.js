
// Electron Configuration
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const express = require('express')
const unhandled = require('electron-unhandled');

// unhandled({
//     logger: () => {
//         console.error();
//     }
// });

unhandled();

let win

function createWindow () {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    fullscreen: true,
    resizable: false,
    frame: false
  })

  win.loadURL('http://localhost:3000')

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const remote = require('electron').remote;

// document.getElementById("exit").addEventListener("click", function (e) {
//        var window = remote.getCurrentWindow();
//        window.close();
//   });
