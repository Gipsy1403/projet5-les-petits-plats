import "@/app/tag.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import recipes from "@/data/recipes.json";

export default function Tag() {
  return (
    <div className="tag_container">
		<div className="tag">
			<select defaultValue="" name="ingredients" id="ingredients">
				{/* <input type="search"/>
				<FontAwesomeIcon className='tag_icon_search' icon={faMagnifyingGlass} /> */}
				<option className="tag_title" value=""disabled hidden>Ingrédients</option>
				{recipes.map((r) => (
					r.ingredients.map((ing, i) => (
						<option key={i} value={ing.ingredient}>{ing.ingredient}</option>
					))
				))}
			</select>
			<select defaultValue="" name="appareils" id="appareils">
				<option className="tag_title" value=""disabled hidden>Appareils</option>
				{recipes.map((r) => (
					<option key={r.id} value={r.appliance}>{r.appliance}</option>
				))}
			</select>
			<select defaultValue="" name="ustensils" id="ustensils">
				<option className="tag_title" value=""disabled hidden>Ustensiles</option>
				{recipes.map((r) => (
					r.ustensils.map((ust, i) => (
						<option key={i} value={ust}>{ust}</option>
					))
				))}
			</select>
		</div>
		<h2 className="tag_nbr_recipes">x recettes</h2>
    </div>
  );
}