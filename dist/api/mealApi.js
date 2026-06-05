const API_URL = "https://www.themealdb.com/api/json/v1/1";
async function api(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Помилка запиту");
    }
    return await response.json();
}
export async function getCategories() {
    const data = await api(API_URL + "/categories.php");
    return data.categories;
}
export async function getMealsByCategory(category) {
    const data = await api(`${API_URL}/filter.php?c=${encodeURIComponent(category)}`);
    return data.meals ?? [];
}
export async function searchMeals(query) {
    const data = await api(`${API_URL}/search.php?s=${encodeURIComponent(query)}`);
    return data.meals ?? [];
}
export async function getMealDetails(id) {
    const data = await api(`${API_URL}/lookup.php?i=${id}`);
    return data.meals?.[0] ?? null;
}
export async function getRandomMeal() {
    const data = await api(`${API_URL}/random.php`);
    return data.meals?.[0] ?? null;
}
