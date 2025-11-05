"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faXmark} from '@fortawesome/free-solid-svg-icons';
import { useState,useCallback,useEffect } from 'react';
import "@/app/styles.css"

function normalize(text) {
	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '');
}

export default function SearchBar({allRecipes, onSearchResults}) {
	const [search, setSearch] = useState("");
	 const [results, setResults] = useState([]);

	const clearSearch=()=>{
		setSearch("");
		setResults([]);
		onSearchResults([], false);
	}
    // Debounce : attendre 300ms après la dernière frappe avant de lancer la recherche
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    // Fonction de recherche
    const performSearch = (query) => {
        if (query.length < 3) {
            setResults([]);
		  onSearchResults([]);
            return;
        }

        const normalizedQuery = normalize(query);

        const filtered = allRecipes.filter(recipe => {
            // Vérification sur titre
            const name = normalize(recipe.name).includes(normalizedQuery);

            // Vérification sur description
            const description = normalize(recipe.description).includes(normalizedQuery);

            // Vérification sur ingrédients
            const ingredients = recipe.ingredients.some(ing =>
                normalize(ing.ingredient).includes(normalizedQuery)
            );

            return name || description || ingredients;
        });
  console.log("🎯 Résultats trouvés :", filtered);
        setResults(filtered);
	   onSearchResults(filtered, true);
    };

//   const clearSearch = () => {
// 	setSearch("");
// 	setResults([]);
// 	onSearchResults([], false); 
//   };
    // Version "debounced" pour ne pas surcharger le filtrage
//     const debouncedSearch = useCallback(debounce(performSearch, 300), []);
const debouncedSearch = useCallback(debounce((query) => performSearch(query), 600), [allRecipes]);


    // Chaque fois que l'utilisateur tape quelque chose
    useEffect(() => {
        debouncedSearch(search);
    }, [search, debouncedSearch]);

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



