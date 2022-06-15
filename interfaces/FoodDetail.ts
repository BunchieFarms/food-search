import { FoodNutrient } from "./FoodNutrient";

export interface FoodDetail {
    fdcId: number;
    description: string;
    brandName: string;
    foodNutrients: FoodNutrient[];
}