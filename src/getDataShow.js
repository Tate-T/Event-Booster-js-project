export function showData(data) {
    const markUp = data
      .map((events => {
        return `<li class="events__item">
        <a href="" class="link events__link" target="_blank" rel="noreferrer noopener" id = {{events.id}}>
           <div class="events__image-wrap" id = {{events.id}}>
              <picture>
                 <img src="{{ events.images.[3].url}}" alt="" title="" class="events__image lazyload" id = {{events.id}} />
              </picture>
           </div>
           <div class="events__descr" id = {{events.id}}>

              <h3 class="events__name" id = {{events.id}}>{{events.name}}</h3>
              <p class="events__date" id = {{events.id}}>{{events.dates.start.localDate}}</p>
              <p class="events__location" id = {{events.id}}>

                 <svg viewBox="0 0 22 32" width="16" height="12" id = {{events.id}}>
                   <path class="events__location-icon" id = {{events.id}} fill="#fff"
                      d="M11.2 0c-6.176 0-11.2 4.99-11.2 11.123 0 7.709 11.211 20.877 11.211 20.877s11.189-13.547 11.189-20.877c0-6.133-5.024-11.123-11.2-11.123zM14.579 14.38c-0.932 0.925-2.155 1.388-3.379 1.388s-2.448-0.463-3.379-1.388c-1.863-1.85-1.863-4.861 0-6.712 0.902-0.896 2.103-1.39 3.379-1.39s2.477 0.494 3.379 1.39c1.863 1.851 1.863 4.862 0 6.712z">
                   </path>

                 </svg>
              {{events._embedded.venues.[0].name}} </p>
           </div>
        </a>
     </li>`;
      })
      .join('');

    galleryNode.insertAdjacentHTML('beforeend', markUp);
