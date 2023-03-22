const addListItem = (request) => {
  const { id, name, idea, url } = request;
  return `
      <!-- Card Section - START -->
      <div class="card" data-id="${id}">
        <div class="card-outer">
          <img src="${url}" alt="${name}" />

          <div class="card-inner">
            <h2 class="card-inner-title">${name}</h2>
            <p class="card-inner-content">${idea}</p>
            <div class="card-footer">
              <!-- <span class="card-footer--nums"></span> -->
              <div class="card-footer--icons">
                <i class="fa-brands fa-twitter"></i>
                <i class="fa-brands fa-github"></i>
                <i class="fa-brands fa-discord"></i>
              </div>
              <div class="card-footer--btn">
                <button class="card-footer--btnEdit"  id="req-edit" >
                  <i class="fa-solid fa-pen-to-square" data-id="${id}"></i>
                </button>
                <button class="card-footer--btnDel" id="req-del" >
                  <i class="fa-solid fa-trash" data-id="${id}"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Card Section - END -->
`;
};
