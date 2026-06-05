import type { MealShort } from "../types.js";

export function renderMeals(
    container: HTMLDivElement,
    meals: MealShort[]){
    if (meals.length === 0){
        container.innerHTML = `
            <div class="col-12">
                    <div class="alert alert-warning">
                        Страви не знайдено.
                    </div>
            </div>`;
        return;
    }
    container.innerHTML = meals
        .map(meal => `
            <div class="col-md-4">
                <div class="card h-100 shadow-sm">
                    <img
                        src="${meal.strMealThumb}"
                        class="card-img-top"
                        alt="${meal.strMeal}">

                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${meal.strMeal}</h5>

                        <p class="card-text">
                            Натисни “Детальніше”, щоб переглянути рецепт.
                        </p>

                        <div class="mt-auto">
                            <button
                                class="btn btn-primary me-2"
                                data-details="${meal.idMeal}">
                                Детальніше
                            </button>

                            <button
                                class="btn btn-outline-danger"
                                data-favorite="${meal.idMeal}">
                                ❤
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `)
        .join("");
}