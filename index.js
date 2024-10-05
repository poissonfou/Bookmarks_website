//menu toggle
const hamburguerMenu = document.getElementById("hamburguer-menu");
const navMobile = document.getElementById("nav-mobile");
const closeBtn = document.getElementById("close-btn");

hamburguerMenu.addEventListener("click", () => {
  navMobile.classList.add("nav--active");
  hamburguerMenu.setAttribute("hidden", true);
});

closeBtn.addEventListener("click", () => {
  navMobile.classList.remove("nav--active");
  hamburguerMenu.removeAttribute("hidden");
});

//tabs
const tabs = document.querySelectorAll(".features__tab");
const tabList = document.querySelector(".features__nav");

let tabFocus = 0;
tabList.addEventListener("keydown", (e) => {
  const keydownLeft = 37;
  const keydownRight = 39;

  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute("tabindex", -1);

    if (e.keyCode === keydownRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else if (e.keyCode === keydownLeft) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }

    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
  }
});

tabs.forEach((tab) =>
  tab.addEventListener("click", (e) => {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImg = targetTab.getAttribute("data-image");
    const previousTab = document.querySelector('[aria-selected="true"]');
    const previousPanel = previousTab.getAttribute("aria-controls");
    const previousImg = previousTab.getAttribute("data-image");

    previousTab.setAttribute("aria-selected", false);
    targetTab.setAttribute("aria-selected", true);

    document.getElementById(previousPanel).setAttribute("hidden", true);
    document.getElementById(targetPanel).removeAttribute("hidden");

    document.getElementById(previousImg).setAttribute("hidden", true);
    document.getElementById(targetImg).removeAttribute("hidden");
  })
);

//accordion
const tabsAccordion = document.querySelectorAll(".question__tab");

tabsAccordion.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const tabSelected = tab.getAttribute("aria-selected");
    const tabPanelId = tab.getAttribute("aria-controls");
    const panel = document.getElementById(tabPanelId);

    const previousTab = document.querySelector(
      '.questions__tabs [aria-selected="true"]'
    );

    if (previousTab && tabSelected == "false") {
      const tabPreviousPanelId = previousTab.getAttribute("aria-controls");
      const previousPanel = document.getElementById(tabPreviousPanelId);
      previousTab.setAttribute("aria-selected", false);
      previousPanel.classList.remove("question__answer--selected");
      previousPanel.style.maxHeight = null;
    }

    if (tabSelected == "true") {
      tab.setAttribute("aria-selected", false);
      panel.style.maxHeight = null;
      panel.classList.remove("question__answer--selected");
      return;
    }

    tab.setAttribute("aria-selected", true);
    panel.style.maxHeight = panel.scrollHeight + 50 + "px";
    panel.classList.add("question__answer--selected");
  });
});

//form
const form = document.getElementById("contact-form");
const errorMsg = document.getElementById("error-msg");
const errorIcon = document.getElementById("error-icon");
const inputBox = document.getElementById("input-box");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const email = f.get("email");

  if (!email.includes("@") || !email.includes(".com")) {
    errorMsg.removeAttribute("hidden");
    errorIcon.removeAttribute("hidden");
    inputBox.classList.add("contact__inputbox--error");
    return;
  }

  if (!errorMsg.getAttribute("hidden")) {
    errorMsg.setAttribute("hidden", true);
    errorIcon.setAttribute("hidden", true);
    inputBox.classList.remove("contact__inputbox--error");
  }
});
