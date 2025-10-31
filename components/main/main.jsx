"use client";
// permet l'utilisation des Hooks useState ou useMemo et que c'est un composant côté client.
import Card from "./card/card";
import Tag from "./tag/tag";
import { useContext, useMemo } from "react";
// useContext : permet d'accéder au contexte global (ici les tags actifs)
// useMemo : permet de mémoriser des calculs lourds (ici le filtrage des recettes)
// et évite de recalculer à chaque rendu.
import { TagContext } from "@/app/TagProvider";


export default function Main({allRecipes}) {
	const { tags } = useContext(TagContext);
	// Ici, tags est un tableau d'objets, chaque objet représentant un tag (ex: {value: "Tomate", type: "Ingrédients", isActive: true/false}).
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
    <main>
      <Tag  filterCount={filteredRecipes.length}/>
      <div className="card_container">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
		// Affiche chaque recette filtrée via le composant Card. 
          // La prop key est obligatoire pour React lors du rendu de listes.

        ))}
      </div>
    </main>
  );
}