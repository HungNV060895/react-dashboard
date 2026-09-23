import { useEffect } from "react";

// Khai báo kiểu dữ liệu toàn cục cho TypeScript không bị báo lỗi "Window không có thuộc tính DocsBotAI"
declare global {
    interface Window {
        DocsBotAI: any;
    }
}

export const DocsBotChat = () => {
    useEffect(() => {
        // 1. Định nghĩa hàm khởi tạo DocsBotAI trên đối tượng window
        window.DocsBotAI = window.DocsBotAI || {};
        window.DocsBotAI.init = function (e: any) {
            return new Promise((t, r) => {
                const n = document.createElement("script");
                n.type = "text/javascript";
                n.async = true;
                n.src = "https://widget.docsbot.ai/chat.js";

                const o = document.getElementsByTagName("script")[0];
                if (o && o.parentNode) {
                    o.parentNode.insertBefore(n, o);
                } else {
                    document.head.appendChild(n);
                }

                n.addEventListener("load", () => {
                    let findElement: (t: string) => Promise<Element | null>;
                    Promise.all([
                        new Promise((t: any, r) => {
                            window.DocsBotAI.mount(Object.assign({}, e)).then(t).catch(r);
                        }),
                        (findElement = function (t: string) {
                            return new Promise((resolve) => {
                                if (document.querySelector(t)) return resolve(document.querySelector(t));
                                const observer = new MutationObserver(() => {
                                    if (document.querySelector(t)) {
                                        resolve(document.querySelector(t));
                                        observer.disconnect();
                                    }
                                });
                                observer.observe(document.body, { childList: true, subtree: true });
                            });
                        })("#docsbotai-root"),
                    ])
                        .then(() => t(null))
                        .catch(r);
                });

                n.addEventListener("error", (err) => {
                    r(err.message);
                });
            });
        };

        // 2. Kích hoạt Widget với ID của bạn
        window.DocsBotAI.init({ id: "0KRsyHSEIewgAKa7D3N2/s3PU7wRPEASbNs84BT2Z" });

        // 3. Cleanup function: Xóa root của bot khi component bị unmount (nếu cần)
        return () => {
            const botRoot = document.getElementById("docsbotai-root");
            if (botRoot) botRoot.remove();
        };
    }, []);

    return null; // Component này chỉ xử lý logic nhúng script, không cần render giao diện trực tiếp
};