import React, { createContext, useContext, useState } from 'react';

const BagContext = createContext();

export const BagProvider = ({ children }) => {
  const [bag, setBag] = useState([]);

  const addToBag = (type, item) => {
    setBag((prev) => {
      // Prevent duplicates by type+id
      if (prev.some((i) => i.type === type && i.item.id === item.id)) return prev;
      return [...prev, { type, item }];
    });
  };

  const removeFromBag = (type, id) => {
    setBag((prev) => prev.filter((i) => !(i.type === type && i.item.id === id)));
  };

  const clearBag = () => setBag([]);

  return (
    <BagContext.Provider value={{ bag, addToBag, removeFromBag, clearBag }}>
      {children}
    </BagContext.Provider>
  );
};

export const useBag = () => useContext(BagContext); 