
document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".hero-terminal");

    if (!terminal || terminal.dataset.initialized) return;

    terminal.dataset.initialized = "true";

    const commands = terminal.querySelectorAll(".terminal-command");
    const result = terminal.querySelector(".terminal-result");
    const skills = terminal.querySelectorAll(".terminal-skills p");
    const finalLine = terminal.querySelector(".terminal-final");

    const sleep = (ms) =>
        new Promise(resolve => setTimeout(resolve, ms));

    // Enable animation styles
    terminal.classList.add("terminal-animating");

    // Reduced motion: show everything immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        commands.forEach(el => {
            el.textContent = el.dataset.text;
        });

        if (result) result.style.opacity = "1";
        skills.forEach(el => el.style.opacity = "1");
        if (finalLine) finalLine.style.opacity = "1";

        return;
    }

    // Reset terminal
    commands.forEach(el => el.textContent = "");
    if (result) result.style.opacity = "0";
    skills.forEach(el => el.style.opacity = "0");
    if (finalLine) finalLine.style.opacity = "0";

    async function typeText(element, text, speed = 75) {
        for (const char of text) {
            element.textContent += char;
            await sleep(speed);
        }
    }

    async function runTerminal() {
        // Command 1
        await sleep(600);
        await typeText(commands[0], commands[0].dataset.text);

        await sleep(500);

        if (result) result.style.opacity = "1";

        // Command 2
        await sleep(900);
        await typeText(commands[1], commands[1].dataset.text);

        await sleep(400);

        // Show skills one by one
        for (const skill of skills) {
            skill.style.opacity = "1";
            await sleep(300);
        }

        // Final prompt
        await sleep(500);

        if (finalLine) {
            finalLine.style.opacity = "1";
        }
    }

    runTerminal();
});


/* =================================
   QUEST 002 - SCROLL REVEAL
================================= */

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) return;

    // Respect user's motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        elements.forEach(element => {
            element.classList.add("is-visible");
        });
        return;
    }

    // Activate reveal only when JavaScript is available
    document.documentElement.classList.add("has-reveal");

    // Fallback for older browsers
    if (!("IntersectionObserver" in window)) {
        elements.forEach(element => {
            element.classList.add("is-visible");
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    // Animate only once
                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    elements.forEach(element => {
        observer.observe(element);
    });

});
