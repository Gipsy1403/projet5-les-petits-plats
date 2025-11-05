"use client";
// permet l'utilisation des Hooks useState ou useMemo et que c'est un composant côté client.
import Card from "./recipesSearch/card";
import Tag from "./recipesSearch/tag";
import SearchBar from "./recipesSearch/searchbar";
import { useMemo, useState } from "react";
import "@/app/card.css"
// useMemo : permet de mémoriser des calculs lourds (ici le filtrage des recettes)
// et évite de recalculer à chaque rendu.



export default function Main({allRecipes}) {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [tags, setTags] = useState([]);
    // State local pour stocker la liste des tags actifs. 
  // tags : état actuel, setTags : fonction pour le mettre à jour.

  const addTag = (tag) => {
  // Fonction pour ajouter un tag au contexte
	const value = tag.value.toLowerCase();
	 // On normalise la valeur du tag en minuscules pour éviter les doublons dus aux majuscules
	if (!tags.some(t => t.type === tag.type && t.value.toLowerCase() === value)) {
		 // Vérifie si le tag n’existe pas déjà dans le tableau (même type et même valeur)
		setTags(prev => [...prev, { ...tag, value: value, isActive: true }]);
		// Si le tag n'existe pas, on l'ajoute au tableau des tags avec isActive: true
	}
  };

  const removeTag = (tag) => {
	  // Fonction pour supprimer un tag
    	setTags(prev => 
		prev.filter(
			t => !(t.type === tag.type && t.value.toLowerCase() === tag.value.toLowerCase())
			// On filtre tous les tags sauf celui qu'on veut retirer
		)
	);
  };

  const toggleTag=(tag)=>{
	  // Fonction pour activer ou désactiver un tag (isActive true/false)
	setTags(prev=>
		prev.map(t=>
			t.type===tag.type && t.value.toLowerCase()===tag.value.toLowerCase()
			 // Trouve le tag correspondant
			? {...t, isActive: !t.isActive}
			 // Inverse l'état actif du tag
			:t
			// Tous les autres tags restent inchangés
		)
	);
  }
  const activeTags = tags.filter(t => t.isActive);
// Filtre uniquement les tags qui sont actifs (cochés par l'utilisateur). 
// activeTags contiendra uniquement les tags qui vont servir au filtrage des recettes.

  const filteredRecipes = useMemo(() => {
	// useMemo permet de mémoriser le résultat de cette fonction jusqu'à ce que allRecipes ou activeTags changent. 
  	// Cela évite de recalculer le filtre à chaque rendu inutilement.

	if (activeTags.length === 0) return allRecipes;
 // Si aucun tag n'est actif, on renvoie toutes les recettes sans filtrage.
	return allRecipes.filter(recipe => {
		   // Sinon, on filtre les recettes selon les tags actifs.
		return activeTags.every(tag => {
			// every() vérifie que **tous les tags actifs** sont présents dans la recette.
		const value = tag.value.toLowerCase();
		        // On met la valeur du tag en minuscule pour comparer sans tenir compte des majuscules/minuscules.
		switch(tag.type){
			// On filtre selon le type du tag : Ingrédients, Appareils ou Ustensiles.
			case "Ingrédients":
				return recipe.ingredients.map(i => i.ingredient.toLowerCase()).includes(value);
				// Transforme tous les ingrédients de la recette en minuscules et Vérifie si le tag actif est présent dans la liste des ingrédients
			case "Appareils":
				return recipe.appliance.toLowerCase() === value;
				 // Vérifie si l'appareil de la recette correspond exactement au tag actif
			case "Ustensiles":
				return recipe.ustensils.map(u => u.toLowerCase()).includes(value);
			default:
				return false;
				// Si le type de tag n'existe pas, on retourne false pour exclure la recette
		}
		});
	});
	}, [allRecipes, activeTags]);
	  // Les dépendances de useMemo : recalcul uniquement si allRecipes ou activeTags changent.
	

  return (
    <div>
		<SearchBar 
			allRecipes={allRecipes} 
			onSearchResults={(results, active) => {
				setSearchResults(results);
				setIsSearching(active);
			}}
		/>
		<Tag 
			filterCount={
				isSearching 
				? searchResults.length 
				: filteredRecipes.length
			}
			tags={tags}
			addTag={addTag}
			removeTag={removeTag}
			toggleTag={toggleTag}
			allRecipes={allRecipes}
		/>
		<div className="card_container">
			{isSearching
				? (searchResults.length > 0 
					? searchResults.map(recipe => 
						<Card 
							key={recipe.id} 
							recipe={recipe} 
						/>)
					: <p>Aucune recette trouvée</p>
				)
				: filteredRecipes.map(recipe => 
					<Card 
						key={recipe.id} 
						recipe={recipe} 
					/>
				)
			}
		</div>
    </div>
  );
}
