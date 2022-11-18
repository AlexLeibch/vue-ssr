import createApp from "./app";

export default function () {
    const { app, pinia } = createApp();

    return { app, pinia };
}
