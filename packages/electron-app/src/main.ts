import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'

import { MSG } from './utils/const'

let mainWindow: Electron.BrowserWindow | null

const { NODE_ENV } = process.env

const ENTRY = {
  DEV: 'http://localhost:3000',
  PROD: `file://${path.join(__dirname, '../../react-app/build/index.html')}`,
}

ipcMain.on(MSG.SEND_CAPACITY, (e: Electron.Event, ...args: string[]) => {
  e.sender.send(MSG.SEND_CAPACITY, args)
})

ipcMain.on(MSG.GET_LIVE_CELL, (e: Electron.Event, ...args: string[]) => {
  e.sender.send(MSG.GET_LIVE_CELL, args)
})

ipcMain.on(MSG.GET_CELLS_BY_TYPE_HASH, (e: Electron.Event, ...args: string[]) => {
  setTimeout(() => {
    e.sender.send(MSG.GET_CELLS_BY_TYPE_HASH, args)
  }, 1000)
})

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: NODE_ENV === 'development',
    },
  })

  mainWindow.loadURL(NODE_ENV === 'development' ? ENTRY.DEV : ENTRY.PROD)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

export default {
  MSG,
}
