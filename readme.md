# Electron React Chat App

The simple desktop Chat App build on top of Electron and React/Redux

This project can be consider as a electron-react-redux boilerplate


## Technical dependencies:

- [Electron](http://electron.atom.io)
- [React](https://facebook.github.io/react/)
- [Redux](http://redux.js.org)
- SASS
- [Webpack](https://webpack.github.io)
- ES2015


## Clone the repo
```
$ git clone https://github.com/thienthinh/electron-react-chat-app.git
```

## Install dependencies

```
$ npm install
```

## Run

Run this two commands __simultaneously__ in different console tabs.

```bash
$ npm run server
$ npm run start
```

or run two servers with one command

```bash
$ npm run dev
```


### Build production

```
$ npm run build
```

### Package App on current platform

```
$ npm run package
```

### Package App for all platforms

```
$ npm run package-all
```

### Package Windows apps from non-Windows platforms
Make sure you have installed Wine: https://www.winehq.org

Builds the app for OS X, Linux, and Windows, using [electron-packager](https://github.com/electron-userland/electron-packager).


## License

MIT © [Thinh Le](http://thinhle.com)
