
import "@/app/recipe_page.css";
import Image from "next/image";



export default function NotFound() {
    return (

		<div className="not_found">
			<div className="logo">
				<Image
					src="/assets/IMG/Logo.png"
					alt="Logo Les Petits Plats"
					width={207}
					height={25}
					sizes="(max-width: 768px) 40vw, 207px"
				/>
			</div>
			<div className="content">
				<h1>404 : (</h1>
				<p>La page que vous demandez est introuvable</p>
			</div>
		</div>

    );
}