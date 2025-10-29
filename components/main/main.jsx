import Card from "./card/card";
import Tag from "./tag/tag";
import recipes from "@/data/recipes.json";

export default function Main() {
  return (
    <main>
      <Tag />
      <div className="card_container">
        {recipes.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}