import { throttle } from "../utils";


// .js-search-house-dropdown
if (document.querySelector('.js-search-house')){
  const searchInput = document.querySelector('.js-search-house');
  const dropdown = document.querySelector('.js-search-house-dropdown');

  function promotionSearchInput(e){
    const mockdata = [
      'Дом 2-х комнатный',
      'Квартира 2-х комнатный',
      'Дом на патриках',
      'Пример объявления',
      'Квартира'
    ];
    const search = e.target.value;
    dropdown.classList.remove('d-none');
    
    dropdown.innerHTML = '<div class="p-2 text-body-tertiary">Загрузка...</div>';

    // лоигка обновления 
    setTimeout(() => {
      const data = mockdata.filter((el) => el.toLowerCase().includes(search.toLowerCase()))
      // отрисовка вариантов из списка
      promotionSearchDropdownHandler(data, dropdown)
    }, 1500);

  }

  function promotionSearchDropdownHandler(list, elem){
    const optionTemplate = (option) => `<button class="btn d-block text-start" type="button">${option}</button>`;
    if (list.length){
      elem.innerHTML = list.map((item) => optionTemplate(item)).join('')
    } else {
      elem.innerHTML = '<div class="p-2 text-body-tertiary">Ничего не найдено</div>'
    }
    elem.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', () => {
        dropdown.classList.add('d-none');
        searchInput.value = btn.textContent;
      });
    })


  }


  const promotionSearchHandler = throttle(promotionSearchInput, 500)
  searchInput.addEventListener('input', promotionSearchHandler);
}