require('nativescript-websockets');
import { Application } from '@nativescript/core';

global.process = require("process/browser");

Application.run({ moduleName: "app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
