import Image from "next/image";
import "@/app/styles.css";

export default function Header() {
	  return (
		<div className="header">
			<div className="logo">
				<Image 
					src="/assets/IMG/Logo.png"
					alt="Logo Les Petits Plats"
					width={350}
					height={40}
					sizes="(max-width: 768px) 40vw, 350px"
				/>
			</div>
			<div className="content_banner">
				<h1 className="title_banner">Découvrez nos recettes <span>du quotidien, simples et délicieuses</span></h1>
				
			</div>
		</div>
	  )
	}