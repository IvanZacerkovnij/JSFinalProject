import type {
    Meal,
    MealShort,
    MealResponse,
    Category,
    CategoryResponse
} from "../types.js";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

async function api<T>(url:string): Promise<T> {
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error("Помилка запиту");
    }

    return await response.json();
}

export async function getCategories(): Promise<Category[]> {
    const data: CategoryResponse = await api(API_URL + "/categories.php");
    return data.categories;
}

export async function getMealsByCategory(category: string): Promise<MealShort[]> {
    const data = await api<MealResponse<MealShort>>(
        `${API_URL}/filter.php?c=${encodeURIComponent(category)}`
    );

    return data.meals ?? [];
}

export async function searchMeals(query: string): Promise<Meal[]> {
    const data = await api<MealResponse<Meal>>(
        `${API_URL}/search.php?s=${encodeURIComponent(query)}`
    );

    return data.meals ?? [];
}

export async function getMealDetails(id: string): Promise<Meal | null> {
    const data = await api<MealResponse<Meal>>(
        `${API_URL}/lookup.php?i=${id}`
    );

    return data.meals?.[0] ??  null;
}

export async function getRandomMeal(): Promise<Meal | null> {
    const data = await api<MealResponse<Meal>>(`${API_URL}/random.php`);
    return data.meals?.[0] ??  null;
}