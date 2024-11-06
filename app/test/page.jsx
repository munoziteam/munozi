"use client";

// components/Countries.js
import {
  useListDocuments,
  useCreateDocument,
  useUpdateDocument,
  useDeleteDocument,
} from "@/infrastructure/reactQuery/utils/useDocument";
import { Query } from "appwrite";
import { useState } from "react";
import COLLECTIONS from "../../infrastructure/models/collection";

const Countries = () => {
  const [newCountry, setNewCountry] = useState("");
  const [editingCountryId, setEditingCountryId] = useState(null);
  const [editedCountry, setEditedCountry] = useState("");

  const queries = [
    Query.limit(50), // Appwrite's way to limit the results
  ];

  // Queries and mutations
  const { data } = useListDocuments(COLLECTIONS.country, queries); // Fetch list of countries
  const countries = data?.documents;
  console.log("🚀 ~ Countries ~ countries:", countries);
  const createMutation = useCreateDocument(COLLECTIONS.country); // Mutation for creating a country
  const updateMutation = useUpdateDocument(COLLECTIONS.country); // Mutation for updating a country
  const deleteMutation = useDeleteDocument(COLLECTIONS.country); // Mutation for deleting a country

  const handleCreate = async () => {
    if (newCountry) {
      await createMutation.mutateAsync({ name: newCountry });
      setNewCountry(""); // Clear input field after creation
    }
  };

  const handleUpdate = async () => {
    if (editingCountryId && editedCountry) {
      await updateMutation.mutateAsync({
        id: editingCountryId,
        payload: { name: editedCountry },
      });
      setEditingCountryId(null); // Reset editing state
      setEditedCountry("");
    }
  };

  const handleDelete = async (id) => {
    await deleteMutation.mutateAsync(id);
  };

  return (
    <div>
      <h1>Countries</h1>
      <input
        type="text"
        value={newCountry}
        onChange={(e) => setNewCountry(e.target.value)}
        placeholder="New country"
      />
      <button onClick={handleCreate}>Add Country</button>

      <ul>
        {countries?.map((country) => (
          <li key={country.$id}>
            {editingCountryId === country.$id ? (
              <div>
                <input
                  type="text"
                  value={editedCountry}
                  onChange={(e) => setEditedCountry(e.target.value)}
                  placeholder="Edit country"
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingCountryId(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                {country.name}
                <button
                  onClick={() => {
                    setEditingCountryId(country.$id);
                    setEditedCountry(country.name);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(country.$id)}>
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Countries;
