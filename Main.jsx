import React from "react";
import IngredientList from "./component/IngredientList";
import ChefRecipe from "./component/ChefRecipe";
import { getRecipeFromMistral } from "./ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])

    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
    }




    function addIngredient(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const formData = new FormData(event.target);
        const newIngredient = formData.get("ingredient");
        if (newIngredient) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
        }
        event.target.reset(); // Clear the input field
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button type="submit">Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientList ingredients={ingredients}
                    getRecipe={getRecipe}
                />}

            {recipe && <ChefRecipe recipe={recipe} />}
        </main>
    );
}