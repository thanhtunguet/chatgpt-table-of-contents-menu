(function () {
    "use strict";

    if (document.getElementById("toc-panel") || document.getElementById("toc-handle")) {
        return;
    }

    // --- Create panel & handle ---
    const panel = document.createElement("div");
    panel.id = "toc-panel";
    panel.innerHTML = `
        <div id="toc-header">Conversation TOC</div>
        <ul id="toc-list"></ul>
    `;
    document.body.appendChild(panel);

    const handle = document.createElement("div");
    handle.id = "toc-handle";
    handle.textContent = "TOC";

    const mainContent = document.querySelector('.flex.h-full.w-full.flex-col:first-of-type');

    document.body.appendChild(handle);
    mainContent.classList.add("has-toc");

    let chatContainer = null;
    let observer = null;
    let isScheduled = false;

    function debounceBuildTOC() {
        if (isScheduled) return;
        isScheduled = true;
        setTimeout(() => {
            buildTOC();
            isScheduled = false;
        }, 300);
    }

    function buildTOC() {
        const list = document.getElementById("toc-list");
        if (!list) return;
        list.innerHTML = "";

        const articles = (chatContainer || document).querySelectorAll("article[data-testid^='conversation-turn-']");
        if (!articles.length) {
            list.innerHTML = '<li style="opacity:0.7;font-style:italic;">Empty chat</li>';
            return;
        }

        articles.forEach((art, i) => {
            const li = document.createElement("li");
            const sr = art.querySelector("h6.sr-only");
            const isAI = sr && sr.textContent.includes("ChatGPT said:");
            li.textContent = `Turn ${i + 1} (${isAI ? "AI" : "You"})`;

            li.addEventListener("click", () => {
                art.scrollIntoView({ behavior: "smooth", block: "start" });
            });

            if (isAI) {
                const subUl = document.createElement("ul");
                art.querySelectorAll("h3:not(.sr-only)").forEach((hd, h) => {
                    let p = hd;
                    while (p) {
                        if (p.tagName === "PRE" || p.tagName === "CODE") return;
                        p = p.parentElement;
                    }

                    const subLi = document.createElement("li");
                    subLi.textContent = hd.textContent.trim() || `Section ${h + 1}`;
                    subLi.addEventListener("click", (ev) => {
                        ev.stopPropagation();
                        hd.classList.remove("toc-highlight");
                        hd.offsetWidth; // force reflow
                        hd.classList.add("toc-highlight");
                        hd.scrollIntoView({ behavior: "smooth", block: "start" });
                    });

                    subUl.appendChild(subLi);
                });
                if (subUl.children.length > 0) li.appendChild(subUl);
            }

            list.appendChild(li);
        });
    }

    function attachObserver() {
        const c = document.querySelector("main#main") || document.querySelector(".chat-container");
        if (c !== chatContainer) {
            chatContainer = c;
            if (observer) observer.disconnect();
            if (chatContainer) {
                observer = new MutationObserver(debounceBuildTOC);
                observer.observe(chatContainer, { childList: true, subtree: true });
                buildTOC();
            }
        }
    }

    attachObserver();
    setInterval(attachObserver, 2000);

    handle.addEventListener("click", () => {
        panel.classList.toggle("collapsed");
        const isCollapsed = panel.classList.contains("collapsed");
        if (isCollapsed) {
            mainContent.classList.remove("has-toc");
        } else {
            mainContent.classList.add("has-toc");
        }
    });
})();
