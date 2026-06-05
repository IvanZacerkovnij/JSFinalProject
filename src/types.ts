export type MealShort = {
    idMeal: string,
    strMeal: string,
    strMealThumb: string
}

export type Meal = MealShort & {
    strCategory: string,
    strArea: string,
    strInstruction: string,
    [key: string]: string | null | undefined
}

export type Category = {
    idCategory: string,
    strCategory: string,
    strCategoryThumb: string,
    strCategoryDescription: string
}

export type CategoryResponse = {
    categories: Category[]
}

export type MealResponse<T> = {
    meals: T[] | null
}