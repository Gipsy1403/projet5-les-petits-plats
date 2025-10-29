import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
// import { useState } from 'react';

export default function SearchBar() {
	// const [search, setSearch] = useState("");

  return (
	<div className="search-bar">
		<input 
			type="text" 
			placeholder="Rechercher une recette, un ingrédient, ..."
			// value={search}
			// onChange={(e) => setSearch(e.target.value)}
		/>
		<FontAwesomeIcon className='icon_search' icon={faMagnifyingGlass} />
	</div>
  );
}