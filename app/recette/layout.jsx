import RecipeHeader from "@/components/recipeHeader"; 
// import du composant permettant d'avoir un autre type de header,
// seulement pour la page de la recette
export default function RecipeLayout({ children }) {
  return (
    <>
      <RecipeHeader />
      <main>{children}</main>
    </>
  );
}