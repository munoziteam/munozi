import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import db from "@/infrastructure/appwrite/database";
import { useInvalidate } from "./InvalidationContext";

// Hook to list documents with optional filtering queries
export const useListDocuments = (collectionName, queries = []) => {
  return useQuery({
    queryKey: [collectionName, queries],
    queryFn: () => db[collectionName].list(queries),
  });
};

// Hook to get a specific document by ID
export const useGetDocument = (collectionName, id) => {
  return useQuery({
    queryKey: [collectionName, id],
    queryFn: () => db[collectionName].get(id),
    enabled: !!id,
  });
};

// Hook to create a document in a collection
export const useCreateDocument = (collectionName) => {
  const { InvalidateRules } = useInvalidate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => db[collectionName].create(payload),
    onSuccess: () => {
      if (collectionName) {
        queryClient.invalidateQueries([collectionName]);
        InvalidateRules(collectionName);
      }
    },
  });
};

// Hook to update a document in a collection
export const useUpdateDocument = (collectionName) => {
  const { InvalidateRules } = useInvalidate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => db[collectionName].update(id, payload),
    onSuccess: () => {
      if (collectionName) {
        queryClient.invalidateQueries([collectionName]);
        InvalidateRules(collectionName);
      }
    },
  });
};

// Hook to delete a document in a collection
export const useDeleteDocument = (collectionName) => {
  const { InvalidateRules } = useInvalidate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => db[collectionName].delete(id),
    onSuccess: () => {
      if (collectionName) {
        queryClient.invalidateQueries([collectionName]);
        InvalidateRules(collectionName);
      }
    },
  });
};

// Hook to list documents incrementally (for infinite scroll or pagination)
export const useListIncrementally = (
  collectionName,
  limitCount,
  queries = []
) => {
  return useInfiniteQuery({
    queryKey: [collectionName, "incremental", limitCount, queries],
    queryFn: ({ pageParam = 0 }) =>
      db[collectionName].listIncrementally(limitCount, pageParam, queries),
    getNextPageParam: (lastPage) => lastPage.lastVisibleDoc || null,
  });
};
