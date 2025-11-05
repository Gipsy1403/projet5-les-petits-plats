
"use client";
import recipesData from "@/data/recipes.json"
import "./globals.css";
import "./styles.css";
import Main from "@/components/recipes/main";



export default function Home() {
	const allRecipes= recipesData;

  return (
    	<div className="app">
		<Main allRecipes={allRecipes}></Main>
	</div>
  );
}
