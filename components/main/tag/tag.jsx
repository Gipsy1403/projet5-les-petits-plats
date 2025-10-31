"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons';
import recipes from "@/data/recipes.json";
import {useState, useContext, useMemo} from "react";
import { TagContext } from '@/app/TagProvider';
import "@/app/tag.css"

export default function Tag({filterCount}) {
	// const { tags, removeTag} = useContext(TagContext);
	const { tags, removeTag,toggleTag} = useContext(TagContext);

	const ingredientsSet = cleanItems([...new Set(recipes.flatMap(r=>r.ingredients.map(ing=>ing.ingredient)))]).sort();
	const appareilsSet = cleanItems([...new Set(recipes.map(r=>r.appliance))]).sort();
	const ustensilsSet = cleanItems([...new Set(recipes.flatMap(r=>r.ustensils))]).sort();

  return (
		<div className="tag_container">
			<div className="select_block">
				<div className="select">
					<CustomSelect name="Ingrédients" item={ingredientsSet} />
					<CustomSelect name="Appareils" item={appareilsSet} />
					<CustomSelect name="Ustensiles" item={ustensilsSet} />
				</div>
				{tags.length > 0 && (
					<div className="selected_tags">
						{tags.map((t, i) => {
							const typeClass = t.type
								.toLowerCase()
								.normalize('NFD')
								.replace(/\p{Diacritic}/gu, '')
								.replace(/\s+/g, '');
							return (
								<button
								key={i}
								className={`tag ${typeClass} ${t.isActive ? 'active' : ''}`} // optionnel : style si actif
								onClick={() => removeTag(t)}
								>
								{/* {t.value} */}
								{t.value.charAt(0).toUpperCase() + t.value.slice(1)}
								<FontAwesomeIcon icon={faXmark} className="icon_xmark" />
								</button>

								// <button key={i} className={`tag ${typeClass}`} onClick={() => removeTag(t)}>
								// 	{t.value}
								// 	<FontAwesomeIcon icon={faXmark} className="icon_xmark" />
								// </button>
							);
						})}
					</div>
				)}
			</div>
			<h2 className="tag_nbr_recipes">{filterCount} recettes</h2>
		</div>
  );
}

function CustomSelect({name,item}) {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	// const [availableItems, setAvailableItems] = useState(item);
	// const [selected, setSelected] = useState("");
	const { tags, addTag } = useContext(TagContext);

	const availableItems = useMemo(() => {
		const activeTags = tags
			.filter(t => t.type === name)
			.map(t => t.value.toLowerCase());
		return item.filter(i => !activeTags.includes(i.toLowerCase()));
	}, [tags, item, name]);

	// useEffect(() => {
	// 	const activeTags = tags
	// 		.filter(t => t.type === name)
	// 		.map(t => t.value);
	// 	const newAvailableItems = item.filter(i => !activeTags.includes(i));
	// 	setAvailableItems(newAvailableItems);
	// }, [tags, item, name]);

	// const filterItems = search.length>=3 ? item.filter(i => i.toLowerCase().includes(search.toLowerCase())) : item;
	const filterItems = search.length>=3 
		? availableItems.filter(i => i.toLowerCase().includes(search.toLowerCase())) 
		: availableItems;

	const handleSelect=(value)=>{
		// setSelected(value);
		setIsOpen(false);
		// add tag to global state
		addTag({ type: name, value });
		// setAvailableItems(prev=> prev.filter(i=>i!==value));
	};
	
	return (
		<div className="custom_select">
			<div className="custom_select_header" onClick={()=>setIsOpen(!isOpen)}>
				{/* {selected || name} */}
				{name}
				<i className={`arrow ${isOpen ? 'open' : ''}`}></i>
			</div>
			{isOpen && (
				<div className="custom_select_menu">
					<div className="custom_select_search">
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<FontAwesomeIcon icon={faMagnifyingGlass} className="icon_magnifying_glass" />
					</div>
					<ul className="custom_select_items">
						{filterItems.map((it, i) => (
							<li key={i} onClick={() => handleSelect(it)} className="select_item">
								{it}
							</li>
						))}
						{filterItems.length === 0 && <li className="no_items">Le terme `{search}` ne se trouve pas dans la liste</li>}
					</ul>
				</div>
			)}
		</div>
	);
}
function normalize(word) {
	return word
		.toLowerCase()
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '');
}

function cleanItems(items) {
	const exceptions = ["ananas","cassis","maïs","riz","couscous","salsifis","radis","jus","houmous"];
	const normalizedItems = items.map(i =>normalize(i));
	const cleanedItems = []

	for(let word of normalizedItems) {
		if(exceptions.includes(word)) {
			if(!cleanedItems.includes(word))
				cleanedItems.push(word);
				continue
			}

			const singular=word.replace(/(s|x)$/i, "");
			if(normalizedItems.includes(singular) && word !== singular) continue;
			if(!cleanedItems.includes(word)) cleanedItems.push(word);
	}
	const formatedItems = cleanedItems.map(w => 
		w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
	);
	return formatedItems;
}

