"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_dom_1 = require("react-dom");
require("./index.css");
const App_1 = require("./App");
const serviceWorker = require("./serviceWorker");
react_dom_1.default.render(<App_1.default />, document.getElementById('root'));
serviceWorker.unregister();
//# sourceMappingURL=index.js.map