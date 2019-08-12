# Strudel Devtools

WORK IN PROGRESS

## Introduction

Google Chrome Dev Tools extension for debugging Strudel.js applications

### Windows
- DevTools Panel - /src/devtools
- Background - /src/background
- Backend (injected into the page) - /src/backend

### Events flow
```
/src/devtools        /src/core                  /src/backend/proxy

+----------+       +------------+               +----------------+
|          |       |            |  sendMessage  |                |
| DEVTOOLS +------>+ redux-saga +-------------->+ chrome.runtime |
|          |       |            |               |   .onMessage   |
+--+-------+       +------------+               |                |
   ^                                            +---+------------+
   |                                                |
   | /src/background           /src/backend/proxy   |  postMessage
   |                                                v
   |   +-------+            +-----------------------+------------+
   |   |       |  dispatch  |                                    |
   +---+ store +<-----------+ window.addEventListener('message') |
       |       |            |                                    |
       +-------+            +------------------------------------+
```

## Contributing

Coming soon

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, Mateusz Łuczak
