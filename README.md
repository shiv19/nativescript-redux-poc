# Redux demo with NativeScript + JavaScript Project

This project shows how you can use Redux with plain JavaScript {N} (or even with TS)

Additional info coming soon.

# Installation

#### Clone the Repo

`git clone https://github.com/vakrilov/ngrx-devtools-nativescript.git ./reduxDemo`

#### Update the hardcoded local IP address

Goto `app/state/store.js` and change the hostname to your computer’s local IP address (assuming you’ll connect to a android/ios device over USB debugging)

In package.json, in the script section, change the IP address of the script to your
computer's IP address

#### Start the local remotedev server

Run `npm run remotedev` to start the dev server\
then on a browser visit `<your ip address>:8000` to access the redux remote console console!

#### Finally run the app

Run the app using,
`tns run android` or `tns run ios`

If everything went right, you'll see that your app connects to remotedev console!
