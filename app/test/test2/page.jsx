"use client";

// components/Countries.js
import {
  useListIncrementally,
  useCreateDocument,
  useUpdateDocument,
  useDeleteDocument,
} from "@/infrastructure/reactQuery/utils/useDocument";
import { useState } from "react";

const Countries = () => {
  const [newCountry, setNewCountry] = useState("");
  const [editingCountryId, setEditingCountryId] = useState(null);
  const [editedCountry, setEditedCountry] = useState("");
  const [limitCount] = useState(2); // Limit the number of documents per page

  // Queries and mutations
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useListIncrementally("countries", limitCount);

  const countries = data?.pages.flatMap((page) => page.documents) || [];

  const createMutation = useCreateDocument("countries");
  const updateMutation = useUpdateDocument("countries");
  const deleteMutation = useDeleteDocument("countries");

  const handleCreate = async () => {
    if (newCountry) {
      await createMutation.mutateAsync({ name: newCountry });
      setNewCountry("");
    }
  };

  const handleUpdate = async () => {
    if (editingCountryId && editedCountry) {
      await updateMutation.mutateAsync({
        id: editingCountryId,
        payload: { name: editedCountry },
      });
      setEditingCountryId(null);
      setEditedCountry("");
    }
  };

  const handleDelete = async (id) => {
    await deleteMutation.mutateAsync(id);
  };

  const handleLoadMore = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
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

      {hasNextPage && !isFetchingNextPage && (
        <button onClick={handleLoadMore}>Load More</button>
      )}

      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default Countries;
