import RecipeHeader from "@/components/recipeHeader"; 

export default function RecipeLayout({ children }) {
  return (
    <>
      <RecipeHeader />
      <main>{children}</main>
    </>
  );
}