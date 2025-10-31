"use client";
import Image from "next/image";
import Link from "next/link";
import "@/app/card.css"

export default function Card({ recipe }) {
	return (
		<Link href={`/recette/${recipe.slug}`}>
			<div className="card">
				<div className="card_image">
					<Image
						src={`/assets/images_recipes/${recipe.image}`}
						alt={recipe.name}
						width={380}
						height={253}
						className="recipe_img"
						sizes="(max-width: 768px) 100vw, 380px"
					/>
					<p>{recipe.time} min</p>
				</div>
				<div className="card_content">
					<h2 className="recipe_title">{recipe.name}</h2>
					<h3>Recette</h3>
					<p className="recipe_description">{recipe.description.length>200? recipe.description.slice(0,200) + "...":recipe.description}</p>
					<h3>Ingrédients</h3>
					<div className="ingredients_list">
						{recipe.ingredients.map((ing, i) => (
							<ul className="ingredient_row" key={i}>
								<li className="recipe_ingredients">{ing.ingredient}</li>
								<li className="recipe_qte">{ing.quantity ? `${ing.quantity}${ing.unit ? ' ' + ing.unit : ''}` : ''}</li>
							</ul>
						))}
					</div>
				</div>
			</div>
		</Link>
	);
}

