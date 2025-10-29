import recipes from "@/data/recipes.json";
import Image from "next/image";
import NotFound from "./not_found";
import "@/app/recipe_page.css";

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  
  if (!recipe) {
    return NotFound();
  }

  return (
	<div>
		<div className="recipe_page_header">
			<div className="logo">
				<Image
					src="/assets/IMG/Logo.png"
					alt="Logo Les Petits Plats"
					width={207}
					height={25}
					sizes="(max-width: 768px) 40vw, 350px"
				/>
			</div>
		</div>
		<div className="recipe_page_container">
			<div className="recipe_page_image">
				<Image 
					src={`/assets/images_recipes/${recipe.image}`}
					alt={recipe.name} 
					width={606} 
					height={738}
					sizes="(max-width: 768px) 100vw, 606px"
					style={{
						objectFit: 'cover',
						borderRadius: '21px'
					}}
				/>
			</div>
			<div className="recipe_page_content">
			<h2>{recipe.name}</h2>
			<h3>Temps de préparation</h3>
			<p className="time">{recipe.time} min</p>
			<h3>Ingrédients</h3>
			<div className="recipe_page_list">{recipe.ingredients.map((ing, i) => (
				<ul className="ingredient_row" key={i}>
					<li className="recipe_ingredients">{ing.ingredient}</li>
					<li className="recipe_qte">{ing.quantity ? `${ing.quantity}${ing.unit ? ' ' + ing.unit : ''}` : ''}</li>
				</ul>
		))}
			</div>
			<h3>Ustensiles nécessaires</h3>
			<div className="recipe_page_ustensils">
			{recipe.ustensils.map((ustensil, i) => (
				<ul className="ingredient_row" key={i}>
					<li className="recipe_ustensils">{ustensil}</li>
					<li className="recipe_qte">{ustensil? 1:""}</li>
				</ul>
			))}
			</div>
			<h3>Appareil nécessaire</h3>
			<div className="recipe_page_appliance">
				<ul className="ingredient_row">
					<li className="recipe_appliance">{recipe.appliance}</li>
					<li className="recipe_qte">{recipe.appliance? 1:""}</li>
				</ul>
			</div>
			<h3>Recette</h3>
			<p>{recipe.description}</p>
			</div>
		</div>
	</div>
  );
}