const UseCaseHelper = require("../../../use_case/UseCaseHelper");
const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')

class ReadCSVFileHelper extends UseCaseHelper{
}

module.exports = ReadCSVFileHelper;