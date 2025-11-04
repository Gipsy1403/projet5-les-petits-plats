import Header from "components/header/header";
import Main from "components/main/main";
import Footer from "components/footer/footer";
import recipesData from "@/data/recipes.json"
import "./globals.css";
import "./styles.css";

export default function Home() {
	const allRecipes= recipesData;

  return (
    <div className="app">
      <Header allRecipes={allRecipes}/>
      <Main allRecipes={allRecipes}/>
      {/* <Main allRecipes={allRecipes}/> */}
      <Footer />
    </div>
  );
}
