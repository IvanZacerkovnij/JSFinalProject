export function renderCategories(container, data) {
    container.innerHTML = data
        .map(category => `
            <div class="col-md-3">
                <button 
                    class="btn btn-outline-primary w-100"
                    data-category="${category.strCategory}">
                    ${category.strCategory}
                </button>
            </div>
        `)
        .join("");
}
