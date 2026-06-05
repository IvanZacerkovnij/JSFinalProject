import type { Meal } from "../types.js";

export function getIngredients(meal: Meal): string[] {
    const ingredients: string[] = [];

    for(let i = 0; i < 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`srtMeasure${i}`];

        if(ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure ?? ""} ${ingredient}`.trim());
        }
    }
    return ingredients;
}