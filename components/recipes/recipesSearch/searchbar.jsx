"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faXmark} from '@fortawesome/free-solid-svg-icons';
import { useState,useCallback,useEffect } from 'react';
import "@/app/styles.css"

function normalize(text) {
	// function permettant de mettre le texte en minuscule, sans accent et
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, "");
}

function debounce(func, delay){
// empêche d'appeler la fonction de recherche trop souvent pendant la frappe
// ce qui améliore la performance
	let timeout;
//    variable pour compter le minuteur
	return (...args) => {
		clearTimeout(timeout);
	//   reset du minuteur
		timeout = setTimeout(() => func(...args), delay);
		// on exécute la fonction après "delay" ms
	};
};


export default function SearchBar({allRecipes, onSearchResults}) {
	const [search, setSearch] = useState("");
	const [results, setResults] = useState([]);
	// useState, créé un état interne au composant
	// - "search" stocke la valeur du champ de recherche
	// - "results" contient la liste des recettes filtrées
  
    // Fonction de recherche
    const performSearch = (query) => {
        if (query.length < 3) {
            setResults([]);
		//   aucun resultat
		  onSearchResults([]);
		//   informe le parent (main)
            return;
		//   quitte la fonction
        }

        const normalizedQuery = normalize(query);

        const filtered = allRecipes.filter(recipe => {
            // filtre toutes les recettes d'après le texte saisi
            const name = normalize(recipe.name).includes(normalizedQuery);
            const description = normalize(recipe.description).includes(normalizedQuery);
            const ingredients = recipe.ingredients.some(ing =>normalize(ing.ingredient).includes(normalizedQuery)
		//   some() retourne true si au moins un ingrédient est trouvé
            );
            return name || description || ingredients;
		//   garde la recette si au moins un des trois est vrai
        });
        setResults(filtered);
	//    met à jour les résultats filtrés dans l'état usestate
	   onSearchResults(filtered, true);
	//    envoi les résultats filtrés au parent (main)
	// true vérifie qu'il y a bien eu une recherche
    };

    // Version "debounced" pour ne pas surcharger le filtrage
const debouncedSearch = useCallback(
	debounce((query) => performSearch(query), 400), 
	[allRecipes]);
	// lorsque l'utilisateur tape dans la barre de recherche
	// performSearch() ne se déclenche que 400ms après la dernière touche tapé
	// si la liste des recettes allRecipes change, alors la fonction
	// debouncedSearch est recréée pour prendre en compte les nouvelles recettes

    // Chaque fois que l'utilisateur tape quelque chose
    useEffect(() => {
	// réagit à des changements de variables, ici il s'exécute à chaque fois lorsque
        debouncedSearch(search);
	// l'utilisateur modifie search ou que la fonction debounceSearch change
    }, [search, debouncedSearch]);
//  du coup, lorsque search change, la fonction debounceSearch est appelée 
// et grâce au debounce, la recherche ne s'effectuera qu'après 400ms.Si l'utilisateur
// continue à saisir, le minuteur redémarre à chaque fois

	const clearSearch=()=>{
		// vide la recherche en réinitialisant le champ texte et les résultats
		setSearch("");
		setResults([]);
		onSearchResults([], false);
		// informe le parent (main) qu'il n'y a rien à afficher
	}
	
  return (
	<div className="search-bar">
		<input 
			type="text" 
			placeholder="Rechercher une recette, un ingrédient, ..."
			value={search}
			onChange={(e) => setSearch(e.target.value)}
		/>
		{search && (
			<FontAwesomeIcon className="icon_clear" icon={faXmark} onClick={clearSearch}/>
		)}
		<FontAwesomeIcon className='icon_search' icon={faMagnifyingGlass} />
	</div>
  );
}



