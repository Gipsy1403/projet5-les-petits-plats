"use client";

import Link from "next/link";
import Image from "next/image";
import "@/app/recipe_page.css"; 


export default function RecipeHeader() {
  return (
	<div className="recipe_page_header">
		<div className="logo">
			<Link href="/">
				<Image
					src="/assets/IMG/Logo.png"
					alt="Logo Les Petits Plats"
					width={207}
					height={25}
					sizes="(max-width: 768px) 40vw, 207px"
				/>
			</Link>
		</div>
	</div>
  );
}
