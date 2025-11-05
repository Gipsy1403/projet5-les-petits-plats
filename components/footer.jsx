import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import "@/app/styles.css";


export default function Footer() {
  return (
	<div className="footer">
		<p>Copyright <FontAwesomeIcon className="icon_copyright" icon={faCopyright} /> 2025 - Les Petits Plats</p>
	</div>
  );
}