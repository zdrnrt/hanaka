(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function throttle(fn, time) {
  let inProgress;
  return function(...args) {
    if (!inProgress) {
      fn.apply(this, args);
      inProgress = true;
      setTimeout(() => inProgress = false, time);
    }
  };
}
if (document.querySelector(".js-search-house")) {
  let promotionSearchInput = function(e) {
    const mockdata = [
      "Дом 2-х комнатный",
      "Квартира 2-х комнатный",
      "Дом на патриках",
      "Пример объявления",
      "Квартира"
    ];
    const search = e.target.value;
    dropdown.classList.remove("d-none");
    dropdown.innerHTML = '<div class="p-2 text-body-tertiary">Загрузка...</div>';
    setTimeout(() => {
      const data = mockdata.filter((el) => el.toLowerCase().includes(search.toLowerCase()));
      promotionSearchDropdownHandler(data, dropdown);
    }, 1500);
  }, promotionSearchDropdownHandler = function(list, elem) {
    const optionTemplate = (option) => `<button class="btn d-block text-start" type="button">${option}</button>`;
    if (list.length) {
      elem.innerHTML = list.map((item) => optionTemplate(item)).join("");
    } else {
      elem.innerHTML = '<div class="p-2 text-body-tertiary">Ничего не найдено</div>';
    }
    elem.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        dropdown.classList.add("d-none");
        searchInput.value = btn.textContent;
      });
    });
  };
  var promotionSearchInput2 = promotionSearchInput, promotionSearchDropdownHandler2 = promotionSearchDropdownHandler;
  const searchInput = document.querySelector(".js-search-house");
  const dropdown = document.querySelector(".js-search-house-dropdown");
  const promotionSearchHandler = throttle(promotionSearchInput, 500);
  searchInput.addEventListener("input", promotionSearchHandler);
}
console.log("main");
