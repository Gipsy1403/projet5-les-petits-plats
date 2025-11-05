import Image from "next/image";
// Import du composant Image de Next.js, qui optimise automatiquement le chargement des images
import Link from "next/link";
// Import du composant Link de Next.js pour créer des liens internes rapides et optimisés.
import "@/app/card.css"

export default function Card({ recipe }) {
	// Déclaration du composant Card qui reçoit en prop une recette individuelle (objet recipe).
	return (
		<Link href={`/recette/${recipe.slug}`}>
		{/* Crée un lien vers la page détail de la recette, utilisant le slug pour l’URL */}
			<div className="card">
				<div className="card_image">
				{/* Bloc contenant l’image et le temps de préparation */}
					<Image
						src={`/assets/images_recipes/${recipe.image}`}
						alt={recipe.name}
						width={380}
						height={253}
						className="recipe_img"
						sizes="(max-width: 768px) 100vw, 380px"
					/>
					<p>{recipe.time} min</p>
					{/* Affiche le temps de préparation de la recette */}
				</div>
				<div className="card_content">
				 {/* Bloc contenant le contenu texte de la carte */}
					<h2 className="recipe_title">{recipe.name}</h2>
					{/* titre de la recette */}
					<h3>Recette</h3>
					<p className="recipe_description">{recipe.description.length>200? recipe.description.slice(0,200) + "...":recipe.description}</p>
					 {/* Si la description dépasse 200 caractères, on tronque et on ajoute "..." */}
					<h3>Ingrédients</h3>
					<div className="ingredients_list">
					{/*  liste des ingredients */}
						{recipe.ingredients.map((ing, i) => (
						// Parcours chaque ingrédient de la recette
							<ul className="ingredient_row" key={i}>
							{/* Chaque ligne est un <ul> avec une clé unique */}
								<li className="recipe_ingredients">{ing.ingredient}</li>
								 {/* Nom de l'ingrédient */}
								<li className="recipe_qte">{ing.quantity ? `${ing.quantity}${ing.unit ? ' ' + ing.unit : ''}` : ''}</li>
								{/* Affiche la quantité et l'unité si elles existent */}
							</ul>
						))}
					</div>
				</div>
			</div>
		</Link>
	);
}

