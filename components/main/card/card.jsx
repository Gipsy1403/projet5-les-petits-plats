import Image from "next/image";
import "@/app/card.css";
import recipes from "@/data/recipes.json";
import Link from "next/link";

export default function Card(recette) {
	return (
		<Link href={`/recette/${recette.slug}`}>
			<div className="card_container">
				{recipes.map((r) => (
					<div className="card" key={r.id}>
						<div className="card_image">
							<Image
								src={`/assets/images_recipes/${r.image}`}
								alt={r.name}
								width={380}
								height={253}
								className="recipe_img"
								sizes="(max-width: 768px) 100vw, 380px"
							/>
							<p>{r.time} min</p>
						</div>
						<div className="card_content">
							<h2 className="recipe_title">{r.name}</h2>
							<h3>Recette</h3>
							<p className="recipe_description">{r.description.length>200? r.description.slice(0,200) + "...":r.description}</p>
							<h3>Ingrédients</h3>
							<div className="ingredients_list">
								{r.ingredients.map((ing, i) => (
									<ul className="ingredient_row" key={i}>
										<li className="recipe_ingredients">{ing.ingredient}</li>
										<li className="recipe_qte">{ing.quantity ? `${ing.quantity}${ing.unit ? ' ' + ing.unit : ''}` : ''}</li>
									</ul>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</Link>
	);
}