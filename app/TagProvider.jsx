"use client";
import React, { createContext, useState } from "react";

export const TagContext = createContext({
  tags: [],
  addTag: () => {},
  removeTag: () => {}
//   clearTags: () => {}
	
});

export default function TagProvider({ children }) {
  const [tags, setTags] = useState([]);

//   const addTag = (tag) => {
//     if (!tags.some(t => t.type === tag.type && t.value.toLowerCase() === tag.value.toLowerCase())) {
//       setTags(prev => [...prev, {...tag, isActive: true}]);
//     }
//   };
  const addTag = (tag) => {
	const value = tag.value.toLowerCase();
	if (!tags.some(t => t.type === tag.type && t.value.toLowerCase() === value)) {
		setTags(prev => [...prev, { ...tag, value: value, isActive: true }]);
	}
  };

  const removeTag = (tag) => {
    	setTags(prev => 
		prev.filter(
			t => !(t.type === tag.type && t.value.toLowerCase() === tag.value.toLowerCase())
		)
	);
  };
//   const removeTag = (tag) => {
// 	setTags(prev => prev.filter(t => t !== tag)); 
// 	if(tag.type === "Ingrédients") setAvailableItems(prev => [...prev, tag.value]);
// 	if(tag.type === "Appareils") setAvailableItems(prev => [...prev, tag.value]);
// 	if(tag.type === "Ustensiles") setAvailableItems(prev => [...prev, tag.value]);
//   };
  const toggleTag=(tag)=>{
	setTags(prev=>
		prev.map(t=>
			t.type===tag.type && t.value.toLowerCase()===tag.value.toLowerCase()
			? {...t, isActive: !t.isActive}
			:t
		)
	);
  }
//   const clearTags = () => setTags([]);

  return (
    <TagContext.Provider value={{ tags, addTag, removeTag, toggleTag}}>
    {/* <TagContext.Provider value={{ tags, addTag, removeTag, clearTags }}> */}
      {children}
    </TagContext.Provider>
  );
}
