const path = require("path");
const express = require("express");
const { createSSRApp } = require("vue");
const { renderToString } = require("@vue/server-renderer");
const manifest = require("./dist/server/ssr-manifest.json");
const fs = require("fs");
const serialize = require("serialize-javascript");

const server = express();

const appPath = path.join(__dirname, "./dist", "server", manifest["app.js"]);
const createAppAsync = require(appPath);

server.use("/img", express.static(path.join(__dirname, "./dist/client", "img")));
server.use("/js", express.static(path.join(__dirname, "./dist/client", "js")));
server.use("/css", express.static(path.join(__dirname, "./dist/client", "css")));
server.use("/favicon.ico", express.static(path.join(__dirname, "./dist/client", "favicon.ico")));

const renderState = (store: { [id: string]: any }, windowKey: string) => {
    const state = serialize(store);
    const autoRemove = ";(function(){var s;(s=document.currentScript||document.scripts[document.scripts.length-1]).parentNode.removeChild(s);}());";
    const nonceAttr = store.nonce ? ` nonce="${store.nonce}"` : "";
    return store ? `<script${nonceAttr}>window.${windowKey}=${state}${autoRemove}</script>` : "";
};

server.get("*", async (req: any, res: { setHeader: (arg0: string, arg1: string) => void; send: (arg0: string) => void }) => {
    const createApp = await createAppAsync;
    const { app, pinia } = await createApp.default();
    let appContent = await renderToString(app);

    fs.readFile(path.join(__dirname, "/dist/client/index.html"), (err: any, html: { toString: () => string }) => {
        if (err) {
            throw err;
        }

        appContent = `<div id="app">${renderState(pinia.state, "__pinia")}${appContent}</div>`;

        const str = html.toString().replace(new RegExp('<div id="app".*></div>'), `${appContent}`);
        res.setHeader("Content-Type", "text/html");
        res.send(str);
    });
});

console.log(`
  You can navigate to http://localhost:8080
`);

server.listen(8080);
