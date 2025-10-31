"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark, faXmark} from '@fortawesome/free-solid-svg-icons';
import recipes from "@/data/recipes.json";
import {useState, useContext} from "react";
import { TagContext } from '@/app/TagProvider';
import "@/app/tag.css"

export default function Tag({filterCount}) {
	// Déclaration du composant Tag, qui prend en prop filterCount : nombre de recettes filtrées.
	const { tags, removeTag} = useContext(TagContext);
	 // Récupère depuis le contexte : 
  // - tags : tous les tags existants
  // - removeTag : fonction pour retirer un tag actif

	const ingredientsSet = cleanItems([...new Set(recipes.flatMap(r=>r.ingredients.map(ing=>ing.ingredient)))]).sort();
	const appareilsSet = cleanItems([...new Set(recipes.map(r=>r.appliance))]).sort();
	const ustensilsSet = cleanItems([...new Set(recipes.flatMap(r=>r.ustensils))]).sort();
	  // - flatMap pour transformer les tableaux imbriqués en un seul tableau
  // - new Set pour obtenir des valeurs uniques
  // - cleanItems pour normaliser (singulier, majuscules, etc.)
  // - sort pour trier alphabétiquement

  return (
		<div className="tag_container">
			<div className="select_block">
				<div className="select">
					<CustomSelect name="Ingrédients" item={ingredientsSet} />
					<CustomSelect name="Appareils" item={appareilsSet} />
					<CustomSelect name="Ustensiles" item={ustensilsSet} />
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
function CustomSelect({ name, item }) {
  const [isOpen, setIsOpen] = useState(false);
    // État du menu déroulant (ouvert/fermé)
  const [search, setSearch] = useState("");
    // État de la barre de recherche
  const { tags, addTag, removeTag } = useContext(TagContext);
    // Accès aux tags et aux fonctions addTag/removeTag
  const activeTags = tags.filter(t => t.type === name);
   // Filtre des tags actifs de ce type

  // Filtre des éléments disponibles en excluant les tags déjà actifs 
   const availableItems = item.filter(i => 
  !tags
    .filter(t => t.type === name && t.isActive)
    .map(t => t.value.toLowerCase())
    .includes(i.toLowerCase())
);

  const filterItems = search.length >= 3
    ? availableItems.filter(i => i.toLowerCase().includes(search.toLowerCase()))
    : availableItems;

  const handleSelect = (value) => {
	addTag({ type: name, value });
	  // ajoute un tag actif
	setIsOpen(false);
	 // Ferme le menu déroulant après sélection
  };

  return (
    <div className="custom_select">
      {/* Barre de titre */}
      <div className="custom_select_header" onClick={() => setIsOpen(!isOpen)}>
        {name}
        <i className={`arrow ${isOpen ? "open" : ""}`}></i>
	    {/* Flèche qui change selon si le menu est ouvert */}
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
		// .normalize('NFD')
		.replace(/\p{Diacritic}/gu, '');
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
	}
	const formatedItems = cleanedItems.map(w => 
		w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
		// Met en majuscule la première lettre et le reste en minuscule
	);
	return formatedItems;
}

