import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
  return (
	<div className="search-bar">
		<input type="text" placeholder="Rechercher une recette, un ingrédient, ..."/>
		<FontAwesomeIcon className='icon_search' icon={faMagnifyingGlass} />
	</div>
  );
}