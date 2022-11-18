import createApp from "./app";

const { app, pinia } = createApp();
// @ts-ignore
if (window.__pinia) {
    // @ts-ignore
    window.__pinia = pinia.state.value;
}
app.mount("#app", true);
