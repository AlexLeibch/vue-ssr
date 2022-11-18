import { createSSRApp, createApp, h } from 'vue'
import isSSR from './_base/isSSR'
import App from './App.vue'
import { createPinia } from "pinia";

export default function () {
    const rootComponent = {
        render: () => h(App),
        components: { App }
    }
    const app = (isSSR ? createSSRApp : createApp)(rootComponent);
    const pinia = createPinia();
    app.use(pinia);
    return { app, pinia };
}
