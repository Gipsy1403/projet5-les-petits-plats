"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark, faXmark} from '@fortawesome/free-solid-svg-icons';
// import recipes from "@/data/recipes.json";
import {useState} from "react";
import "@/app/tag.css"

export default function Tag({filterCount, tags, addTag, removeTag, allRecipes}) {
	// Déclaration du composant Tag, qui prend en prop filterCount : nombre de recettes filtrées.

	const ingredientsSet = cleanItems([...new Set(allRecipes.flatMap(r=>r.ingredients.map(ing=>ing.ingredient)))]).sort();
	const appareilsSet = cleanItems([...new Set(allRecipes.map(r=>r.appliance))]).sort();
	const ustensilsSet = cleanItems([...new Set(allRecipes.flatMap(r=>r.ustensils))]).sort();
	// - flatMap transforme les tableaux imbriqués en un seul tableau
	// - new Set obtient des valeurs uniques
	// - cleanItems normalise (singulier, majuscules, etc.)
	// - sort trie alphabétiquement

  return (
		<div className="tag_container">
			<div className="select_block">
				<div className="select">
					<CustomSelect name="Ingrédients" item={ingredientsSet} tags={tags} addTag={addTag}removeTag={removeTag}/>
					<CustomSelect name="Appareils" item={appareilsSet} tags={tags} addTag={addTag}removeTag={removeTag} />
					<CustomSelect name="Ustensiles" item={ustensilsSet} tags={tags} addTag={addTag}removeTag={removeTag} />
				</div>
				{tags.length > 0 && (
					 // Affiche les tags actifs seulement si il y en a
					<div className="selected_tags">
						{tags.map((t, i) => {
							// Parcours tous les tags actifs pour les afficher
							const typeClass = t.type
								.toLowerCase()
								.normalize('NFD')
								.replace(/\p{Diacritic}/gu, '')
								.replace(/\s+/g, '');
								// Transforme le type du tag en classe CSS normalisée (ex: "Ustensiles" → "ustensiles")
							return (
								<button
								key={i}
								className={`tag ${typeClass} ${t.isActive ? 'active' : ''}`} 
								onClick={() => removeTag(t)}
								// Supprime le tag si l'utilisateur clique dessus
								>
								{t.value.charAt(0).toUpperCase() + t.value.slice(1)}
								{/* Affiche la valeur du tag avec la première lettre en majuscule  */}
								<FontAwesomeIcon icon={faXmark} className="icon_xmark" />
								{/* Petite croix pour retirer le tag */}
								</button>
							);
						})}
					</div>
				)}
			</div>
			<h2 className="tag_nbr_recipes">{filterCount}{filterCount<=1?" recette": " recettes"}</h2>
			{/* Affiche le nombre de recettes filtrées avec accord pluriel */}
		</div>
  );
}
// Composant Menu déroulant pour chaque type de tag
function CustomSelect({ name, item, tags, addTag, removeTag }) {
  const [isOpen, setIsOpen] = useState(false);
    // État du menu déroulant (ouvert/fermé)
  const [search, setSearch] = useState("");
    // État de la barre de recherche
  const activeTags = tags.filter(t => t.type === name);
   // Filtre des tags actifs // à son type

 
   const availableItems = item.filter(i => 
	// filtre item pour retirer ceux déjà présents dans les tags actifs du même type
  	!tags
	// inverse la condition. si true = tag actif = retiré de la liste
	// si false (tag non actif)= gardé dans la liste
    .filter(t => t.type === name && t.isActive)
	// filtre la liste des tags pour ne garde que ceux qui ont le
	// même type que name et qui sont actifs
    .map(t => t.value.toLowerCase())
	// transforme cette liste en un tableau dont les valeurs sont mises en minuscule
    .includes(i.toLowerCase())
	// vérifie si le tableau de valeurs contient l'élément courant i mis en minuscule également
);

  const filterItems = search.length >= 3
//   filterItems est la liste finale d'éléments à afficher dans le menu déroulant
    ? availableItems.filter(i => i.toLowerCase().includes(search.toLowerCase()))
//    filtre availableItems pour ne garder que ceux qui contiennent le texte saisi
    : availableItems;

  const handleSelect = (value) => {
	// quand l'utilisateur sélectionne un élément dans la liste, 
	addTag({ type: name, value });
	// celui ci est ajouté comme nouveau tag actif (orange)
	setIsOpen(false);
	 // ferme le menu déroulant après sélection
  };

  return (
    <div className="custom_select">
      {/* Barre de titre */}
      <div className="custom_select_header" onClick={() => setIsOpen(!isOpen)}>
        {name}
        <i className={`arrow ${isOpen ? "open" : ""}`}></i>
	    {/* Flèche qui change si le menu est ouvert */}
      </div>

      {/* --- Menu déroulant --- */}
      {isOpen && (
        <div className="custom_select_menu">
          <div className="custom_select_search">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
		    // Met à jour la barre de recherche
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="icon_magnifying_glass"
            />
          </div>

          {/* Tags actifs sous l'input dans le menu */}
          {activeTags.length > 0 && (
            <div className="selected_tags_inside">
              {activeTags.map((t, i) => (
                <button
                  key={i}
                  className="tag_inside"
                  onClick={() => removeTag(t)}
                >
                  {t.value}
                  <FontAwesomeIcon icon={faCircleXmark} className="icon_xmark" />
                </button>
              ))}
            </div>
          )}

          <ul className="custom_select_items">
            {filterItems.map((it, i) => (
              <li key={i} onClick={() => handleSelect(it)} className="select_item">
                {it}
              </li>
            ))}
            {filterItems.length === 0 && (
              <li className="no_items">
                Le terme “{search}” ne se trouve pas dans la liste
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// Fonction pour normaliser les mots (minuscules + suppression accents)
function normalize(word) {
	return word
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, "");
}
// Fonction pour nettoyer et formater les items (ingrédients, ustensiles, appareils)
function cleanItems(items) {
	const exceptions = ["ananas","cassis","maïs","riz","couscous","salsifis","radis","jus","houmous"];
	  // Liste d'exceptions à ne pas mettre au singulier
	const normalizedItems = items.map(i =>normalize(i));
	const cleanedItems = []

	for(let word of normalizedItems) {
		if(exceptions.includes(word)) {
			if(!cleanedItems.includes(word))
				cleanedItems.push(word);
				continue
		}
		const singular=word.replace(/(s|x)$/i, "");
			// Supprime le "s" ou "x" final pour avoir le singulier
		if(normalizedItems.includes(singular) && word !== singular) continue;
		// Si le singulier existe déjà dans la liste, ignore la forme plurielle
		if(!cleanedItems.includes(word)) cleanedItems.push(word);
		// si le mot choisi n'est pas dans le tableau cleanedItems alors le mettre à l'intérieur
	}
	const formatedItems = cleanedItems.map(w => 
		w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
		// Met en majuscule la première lettre et le reste en minuscule
	);
	return formatedItems;
}

