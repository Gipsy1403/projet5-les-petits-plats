"use client";
import React, { createContext, useState } from "react";
// Import de React, ainsi que des hooks createContext et useState
// createContext permet de créer un contexte global partagé entre composants
// useState permet de gérer l'état local dans le fournisseur de contexte.

export const TagContext = createContext({
  tags: [],
  // Tableau initial des tags actifs ou existants
  addTag: () => {},
  // Fonction pour ajouter un tag (placeholder vide ici)
  removeTag: () => {}
  // Fonction pour supprimer un tag (placeholder vide ici)	
});
// Création du contexte TagContext avec des valeurs par défaut.
// Même si ce contexte est vide au départ, il sera rempli par le Provider.

export default function TagProvider({ children }) {
	// Déclaration du composant TagProvider qui va envelopper toute l'application ou partie de l'UI.
// La prop children représente tous les composants enfants qui auront accès au contexte.
  const [tags, setTags] = useState([]);
    // State local pour stocker la liste des tags actifs. 
  // tags : état actuel, setTags : fonction pour le mettre à jour.

  const addTag = (tag) => {
  // Fonction pour ajouter un tag au contexte
	const value = tag.value.toLowerCase();
	 // On normalise la valeur du tag en minuscules pour éviter les doublons dus aux majuscules
	if (!tags.some(t => t.type === tag.type && t.value.toLowerCase() === value)) {
		 // Vérifie si le tag n’existe pas déjà dans le tableau (même type et même valeur)
		setTags(prev => [...prev, { ...tag, value: value, isActive: true }]);
		// Si le tag n'existe pas, on l'ajoute au tableau des tags avec isActive: true
	}
  };

  const removeTag = (tag) => {
	  // Fonction pour supprimer un tag
    	setTags(prev => 
		prev.filter(
			t => !(t.type === tag.type && t.value.toLowerCase() === tag.value.toLowerCase())
			// On filtre tous les tags sauf celui qu'on veut retirer
		)
	);
  };

  const toggleTag=(tag)=>{
	  // Fonction pour activer ou désactiver un tag (isActive true/false)
	setTags(prev=>
		prev.map(t=>
			t.type===tag.type && t.value.toLowerCase()===tag.value.toLowerCase()
			 // Trouve le tag correspondant
			? {...t, isActive: !t.isActive}
			 // Inverse l'état actif du tag
			:t
			// Tous les autres tags restent inchangés
		)
	);
  }


  return (
    <TagContext.Provider value={{ tags, addTag, removeTag, toggleTag}}>
	 {/* Fournit le contexte aux composants enfants avec :
        - tags : tableau des tags
        - addTag : fonction pour ajouter un tag
        - removeTag : fonction pour supprimer un tag
        - toggleTag : fonction pour activer/désactiver un tag
    */}
      {children}
	 {/* Rend tous les composants enfants à l'intérieur du Provider */}
    </TagContext.Provider>
  );
}
