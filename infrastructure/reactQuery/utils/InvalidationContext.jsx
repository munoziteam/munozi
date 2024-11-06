"use client";

import { useQueryClient } from "@tanstack/react-query"; // Changed from useQuery to useQueryClient
import { createContext, useContext } from "react";
import InvalidationRules from "./InvalidationRules";

// Create an InvalidationContext
const InvalidationContext = createContext();

// Create a provider component
export const InvalidationProvider = ({ children }) => {
  const queryClient = useQueryClient(); // Corrected to use useQueryClient
  // Global Invalidation
  const InvalidateRules = (collectionName) => {
    const rules = InvalidationRules[collectionName];

    if (rules) {
      rules.forEach(async (affectedCollection) => {
        await queryClient.invalidateQueries({
          queryKey: [affectedCollection],
        });
      });
    }
  };

  return (
    <InvalidationContext.Provider value={{ InvalidateRules }}>
      {children}
    </InvalidationContext.Provider>
  );
};

// Custom hook for accessing the InvalidationContext
export const useInvalidate = () => useContext(InvalidationContext); // Corrected InvalidationContext
