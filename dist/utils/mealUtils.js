export function getIngredients(meal) {
    const ingredients = [];
    for (let i = 0; i < 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`srtMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push(`${measure ?? ""} ${ingredient}`.trim());
        }
    }
    return ingredients;
}
