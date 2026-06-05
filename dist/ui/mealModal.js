import { getIngredients } from "../utils/mealUtils.js";
export function showMealModal(modalElement, titleElement, bodyElement, meal) {
    titleElement.textContent = meal.strMeal;
    const ingredients = getIngredients(meal);
    bodyElement.innerHTML = `
        <img
            src="${meal.strMealThumb}"
            class="img-fluid rounded mb-3"
            alt="${meal.strMeal}">

        <p>
            <strong>Категорія:</strong> ${meal.strCategory}
            <br>
            <strong>Країна:</strong> ${meal.strArea}
        </p>

        <h4>Інгредієнти</h4>
        <ul>
            ${ingredients.map(item => `<li>${item}</li>`).join("")}
        </ul>

        <h4>Інструкція</h4>
        <p>${meal.strInstructions}</p>
    `;
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}
