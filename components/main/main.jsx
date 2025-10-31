"use client";
import Card from "./card/card";
import Tag from "./tag/tag";
import { useContext, useMemo } from "react";
import { TagContext } from "@/app/TagProvider";


export default function Main({allRecipes}) {
	const { tags } = useContext(TagContext);

	const activeTags = tags.filter(t => t.isActive);

	const filteredRecipes = useMemo(() => {
	if (activeTags.length === 0) return allRecipes;

	return allRecipes.filter(recipe => {
		return activeTags.every(tag => {
		const value = tag.value.toLowerCase();
		switch(tag.type){
			case "Ingrédients":
				return recipe.ingredients.map(i => i.ingredient.toLowerCase()).includes(value);
			case "Appareils":
				return recipe.appliance.toLowerCase() === value;
			case "Ustensiles":
				return recipe.ustensils.map(u => u.toLowerCase()).includes(value);
			default:
				return false;
		}
		});
	});
	}, [allRecipes, activeTags]);
	

  return (
    <main>
      <Tag  filterCount={filteredRecipes.length}/>
      <div className="card_container">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}