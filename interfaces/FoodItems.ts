import { FoodDetail } from "./FoodDetail";

export interface FoodItems {
    totalHits: number;
    currentPage: number;
    totalPages: number;
    foods: FoodDetail[];
}