"use strict";
/*
    baer1 website
    Copyright (C) 2024  baer1

    This website is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    A copy of the GNU General Public License should be hosted along with
    this website (LICENSE). If not, see <https://www.gnu.org/licenses/>.

    videocreator@outlook.de
*/
window.addEventListener("load", () => {
    let buttons = document
        .getElementById("content")
        .getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        const btn = buttons[i];
        btn.addEventListener("click", (e) => {
            document.body.style.pointerEvents = "none";
            document.body.style.overflow = "hidden";
            let cover = document.createElement("div");
            cover.classList.add("transition_cover");
            document.body.appendChild(cover);
            let anim = cover.animate([
                {
                    top: `${e.clientY}px`,
                    left: `${e.clientX}px`,
                    bottom: `${window.innerHeight - e.clientY}px`,
                    right: `${window.innerWidth - e.clientX}px`,
                },
                { top: "-2px", bottom: "-2px", left: "-2px", right: "-2px" },
            ], {
                duration: 750,
                easing: "ease-out",
                fill: "forwards",
            });
            anim.onfinish = () => {
                if (btn.hasAttribute("data-href"))
                    location.href = btn.getAttribute("data-href");
                else
                    location.reload();
            };
        });
    }
    const TITLE = document.title;
    const CHARS = "abcdefghijklmnopqrstuvwxyz1234567890#+~*?!\"'\\/%[]{}$ .,-_<>|".split("");
    let title_effect_interval = undefined;
    function title_effect_frame() {
        let t = document.title.split("");
        let i = Math.floor(Math.random() * t.length);
        t[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
        t[i] = Math.random() > 0.5 ? t[i].toUpperCase() : t[i];
        document.title = t.join("");
    }
    let stop_title_effect = () => {
        clearInterval(title_effect_interval);
        document.title = TITLE;
    };
    let start_title_effect = () => {
        stop_title_effect();
        title_effect_interval = setInterval(title_effect_frame, 50);
        title_effect_frame();
    };
    window.addEventListener("blur", stop_title_effect);
    window.addEventListener("focus", start_title_effect);
    window.addEventListener("mousemove", () => {
        if (!title_effect_interval)
            start_title_effect();
    });
});