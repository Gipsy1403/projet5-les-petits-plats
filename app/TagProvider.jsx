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

  const addTag = (tag) => {
    // tag = { type: 'Ingrédients'|'Appareils'|'Ustensiles', value: 'Tomate' }
    // prevent duplicates
    if (!tags.some(t => t.type === tag.type && t.value === tag.value)) {
      setTags(prev => [...prev, tag]);
    }
  };

  const removeTag = (tag) => {
    setTags(prev => prev.filter(t => !(t.type === tag.type && t.value === tag.value)));
  };
//   const removeTag = (tag) => {
// 	setTags(prev => prev.filter(t => t !== tag)); 
// 	if(tag.type === "Ingrédients") setAvailableItems(prev => [...prev, tag.value]);
// 	if(tag.type === "Appareils") setAvailableItems(prev => [...prev, tag.value]);
// 	if(tag.type === "Ustensiles") setAvailableItems(prev => [...prev, tag.value]);
//   };

//   const clearTags = () => setTags([]);

  return (
    <TagContext.Provider value={{ tags, addTag, removeTag}}>
    {/* <TagContext.Provider value={{ tags, addTag, removeTag, clearTags }}> */}
      {children}
    </TagContext.Provider>
  );
}
