"use client";
import "@/app/tag.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import recipes from "@/data/recipes.json";
import {useState} from "react";

export default function Tag() {
	const ingredientsSet = [...new Set(recipes.flatMap(r=>r.ingredients.map(ing=>ing.ingredient)))].sort();
	const appareilsSet = [...new Set(recipes.map(r=>r.appliance))].sort();
	const ustensilsSet = [...new Set(recipes.flatMap(r=>r.ustensils))].sort();
  return (
	<div className="tag_container">
		<div className="select">
			<CustomSelect name="Ingrédients" option={ingredientsSet} />
			<CustomSelect name="Appareils" option={appareilsSet} />
			<CustomSelect name="Ustensiles" option={ustensilsSet} />
		</div>
		<h2 className="tag_nbr_recipes">x recettes</h2>
    </div>
  );
}

function CustomSelect({name,option}) {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState("");

	const filterOptions = option.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

	const handleSelect=(value)=>{
		setSelected(value);
		setIsOpen(false);
	};
	return (
		<div className="custom_select">
			<div className="custom_select_header" onClick={()=>setIsOpen(!isOpen)}>
				{selected || name}
				<i className={`arrow ${isOpen ? 'open' : ''}`}></i>
			</div>
			{isOpen && (
				<div className="custom_select_menu">
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="custom_select_search"
					/>
					<ul className="custom_select_options">
						{filterOptions.map((opt, i) => (
							<li key={i} onClick={() => handleSelect(opt)} className="select_option">
								{opt}
							</li>
						))}
						{filterOptions.length === 0 && <li className="no_options">Aucune option trouvée</li>}
					</ul>
				</div>
			)}
		</div>
	);
}