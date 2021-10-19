import { fetchPictures } from './fetchData.js';

const showPagination = function (firstPage, currentPage, lastPage) {

  fetchPictures('metal').then(({ page }) => console.log(page.totalPages));
  //responce:  {size: 20, totalElements: 1647, totalPages: 83, number: 0}

  /* fetchPictures('metal').then(( data ) => {
    //console.log(data._embedded[0]);
    console.log(data)
});
 */ let paginationMarkup = '';

  if (lastPage <= 7)
    for (let i = 1; i <= lastPage; i++) {
      //        fetchPictures('monatik').then(({ page }) => console.log(page));
      paginationMarkup += `<a href = "#page-${i}"><span `;
      if (i === currentPage) paginationMarkup += `class = 'pagination__selected'>`;
      else paginationMarkup += `class = 'pagination__simple'>`;
      paginationMarkup += `${i}</span></a>`;
    }

  if (lastPage >= 8) {
    paginationMarkup += `<a href = "#"><span `;
    if (currentPage === 1) paginationMarkup += `class = 'pagination__selected'>1</span></a>`;
    else paginationMarkup += `class = 'pagination__simple'>1</span></a>`;

    for (let i = 1; i <= 5; i++) {
      if ((currentPage > 4 && i === 1) || (currentPage <= lastPage - 4 && i === 5)) {
        paginationMarkup += `<span class = 'pagination__simple'>&#8230</span>`;
        continue;
      }

      paginationMarkup += `<a href = "#page-${currentPage - 3 + i}"><span `;

      if (i === 3 && currentPage != 1 && currentPage != lastPage)
        paginationMarkup += `class = 'pagination__selected'>${currentPage - 3 + i}</span></a>`;
      else if (currentPage - 3 + i < lastPage && currentPage - 3 + i > 1)
        paginationMarkup += `class = 'pagination__simple'>${currentPage - 3 + i}</span></a>`;
    }
    paginationMarkup += `<a href = "#"><span `;
    if (currentPage === lastPage)
      paginationMarkup += `class = 'pagination__selected'>${lastPage}</span></a>`;
    else paginationMarkup += `class = 'pagination__simple'>${lastPage}</span></a>`;
  }

  document.querySelector('.pagination__container').innerHTML = paginationMarkup;
};


document.querySelector('.pagination__container').addEventListener('click', (e) =>  console.log(e) );


fetchPictures('metal').then(({ page }) => {
showPagination(1, 2, page.totalPages);
});

//showPagination(1, 1, 1);



//showPagination(1, 7, 21);

/* 
    export const paginationMarkup = ({ pages, next, prev }, query = '') => {
      let markup = prev ? `<a href="${prev.slice(config.baseUrl.length)}">&lArr;</a>` : '';
      let link = next || prev;
      if (!link) return false;

      const nowPage = next ? parseInt(next.slice(next.indexOf('page=') + 5)) - 1 : pages;

      link = link.slice(config.baseUrl.length, link.indexOf('page=') + 5);
      for (let i = 1; i <= pages; i++) {
        if (nowPage + 4 === i) markup += '<span>...</span>';
        if (i === 1 || i === pages || (i >= nowPage - 2 && i <= nowPage + 2))
          markup += `<a class="${i === nowPage ? 'active' : ''}" href="${link + i}${
            query ? '&' + query : ''
          }">${i}</a>`;
        if (nowPage - 4 === i) markup += '<span>...</span>';
      }
      markup += next ? `<a href="${next.slice(config.baseUrl.length)}">&rArr;</a>` : '';

      document.querySelector('.pagination').innerHTML = markup;
    }; */
