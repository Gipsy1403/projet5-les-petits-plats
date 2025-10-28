import recipes from "@/data/recipes.json";
import Image from "next/image";

export default async function RecipePage({ params }) {
  const { slug } = await params;
  const r=recipes.find((r) => r.slug === slug);
  if (!r) {
    return <div>Recette non trouvée</div>;
  }
  return (
  	<div className="recipe_page_container">
		<div className="recipe_page_image">
			<Image 
			src={`/assets/images_recipes/${r.image}`} 
			alt={r.name} 
			width={500} 
			height={300}/>
		</div>
		<div className="recipe_page_content">
			<h2>{r.name}</h2>
			<h3>Temps de préparation</h3>
			<p>{r.time} minutes</p>
			<h3>Ingrédients</h3>
			<ul className="recipe_page_list">
				{r.ingredients.map((ing, i) => (
					<li key={i}>
						{ing.ingredient} - {ing.quantity ? `${ing.quantity}${ing.unit ? ' ' + ing.unit : ''}` : ''}
					</li>
				))}
			</ul>
			<h3>Ustensiles nécessaires</h3>
			<ul className="recipe_page_ustensils">
				{r.ustensils.map((ust, i) => (
					<li key={i}>
						{ustensils ?`${ustensils} 1`: ""}</li>
				))}
			</ul>
			<h3>Appareils nécessaires</h3>
			<ul className="recipe_page_appliances">
				{r.appliance.map((app, i) => (
					<li key={i}>
						{apppliance ?`${apppliance} 1`: ""}</li>
				))}
			</ul>
			<h3>Recette</h3>
			<p>{r.description}</p>
		</div>
	
	</div>);
}