import RecipeHeader from "@/components/recipeHeader"; 

export default function RecetteLayout({ children }) {
  return (
    <>
      <RecipeHeader />
      {children}
    </>
  );
}