import { useEffect } from "react";

type DocsBotConfig = { id: string };
type DocsBotApi = {
    __northstarInitialized?: boolean;
    init?: (config: DocsBotConfig) => Promise<void>;
    mount?: (config: DocsBotConfig) => Promise<unknown>;
};

declare global {
    interface Window {
        DocsBotAI: DocsBotApi;
    }
}

export const DocsBotChat = () => {
    useEffect(() => {
        window.DocsBotAI = window.DocsBotAI || {};
        if (window.DocsBotAI.__northstarInitialized) return;
        window.DocsBotAI.__northstarInitialized = true;

        window.DocsBotAI.init = (config: DocsBotConfig) => new Promise<void>((resolve, reject) => {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.async = true;
                script.src = "https://widget.docsbot.ai/chat.js";

                const firstScript = document.getElementsByTagName("script")[0];
                if (firstScript?.parentNode) {
                    firstScript.parentNode.insertBefore(script, firstScript);
                } else {
                    document.head.appendChild(script);
                }

                script.addEventListener("load", () => {
                    if (!window.DocsBotAI.mount) {
                        reject(new Error("DocsBot did not expose its mount function."));
                        return;
                    }
                    window.DocsBotAI.mount(config).then(() => resolve()).catch(reject);
                });

                script.addEventListener("error", () => {
                    reject(new Error("Unable to load DocsBot."));
                });
            });

        void window.DocsBotAI.init({ id: "0KRsyHSEIewgAKa7D3N2/s3PU7wRPEASbNs84BT2Z" });
    }, []);

    return null;
};