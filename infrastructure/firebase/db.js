import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "./firebase"; // Assuming your Firebase config is here
import COLLECTIONS from "../models/collection";

const db = {};

const collections = [
  {
    name: "countries",
    ref: collection(firestore, "countries"),
  },
  {
    name: COLLECTIONS.listings,
    ref: collection(firestore, COLLECTIONS.listings),
  },
  {
    name: COLLECTIONS.pairs,
    ref: collection(firestore, COLLECTIONS.pairs),
  },
  {
    name: COLLECTIONS.profile,
    ref: collection(firestore, COLLECTIONS.profile),
  },
  {
    name: COLLECTIONS.lodgerPayments,
    ref: collection(firestore, COLLECTIONS.lodgerPayments),
  },
  {
    name: COLLECTIONS.notifications,
    ref: collection(firestore, COLLECTIONS.notifications),
  },
  {
    name: COLLECTIONS.comments,
    ref: collection(firestore, COLLECTIONS.comments),
  },
  {
    name: COLLECTIONS.claimPayments,
    ref: collection(firestore, COLLECTIONS.claimPayments),
  },
  {
    name: COLLECTIONS.extensionProposal,
    ref: collection(firestore, COLLECTIONS.extensionProposal),
  },
  {
    name: COLLECTIONS.dayUseReuest,
    ref: collection(firestore, COLLECTIONS.dayUseReuest),
  },
];

// Function to build Firestore queries dynamically based on conditions
const buildQuery = (ref, conditions) => {
  let q = ref; // Start with the collection reference

  conditions.forEach((condition) => {
    const { type, args } = condition;

    if (type === "where") {
      q = query(q, where(...args)); // where(field, operator, value)
    } else if (type === "orderBy") {
      q = query(q, orderBy(...args)); // orderBy(field, direction)
    } else if (type === "limit") {
      q = query(q, limit(...args)); // limit(count)
    }
  });

  return q;
};

collections.forEach((col) => {
  db[col.name] = {
    // Create a document
    create: async (payload) => {
      try {
        const docRef = await addDoc(col.ref, payload);
        return docRef;
      } catch (error) {
        console.error(`Error creating document in ${col.name}`, error);
        throw error;
      }
    },

    // Update a document
    update: async (id, payload) => {
      try {
        const docRef = doc(col.ref, id);
        await updateDoc(docRef, payload);
      } catch (error) {
        console.error(`Error updating document in ${col.name}`, error);
        throw error;
      }
    },

    // Delete a document
    delete: async (id) => {
      try {
        const docRef = doc(col.ref, id);
        await deleteDoc(docRef);
      } catch (error) {
        console.error(`Error deleting document in ${col.name}`, error);
        throw error;
      }
    },

    // Get a document by ID
    get: async (id) => {
      try {
        const docRef = doc(col.ref, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          throw new Error("Document not found");
        }
      } catch (error) {
        console.error(`Error getting document in ${col.name}`, error);
        throw error;
      }
    },

    // List documents with optional filtering queries
    list: async (conditions = []) => {
      try {
        const q = buildQuery(col.ref, conditions);
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error(`Error listing document in ${col.name}`, error);
        throw error;
      }
    },

    // List incrementally (for pagination) with dynamic query conditions
    listIncrementally: async (
      limitCount,
      lastVisibleDoc = null,
      conditions = []
    ) => {
      try {
        let q = buildQuery(col.ref, conditions);
        q = query(q, limit(limitCount)); // Apply the limit

        if (lastVisibleDoc) {
          q = query(q, startAfter(lastVisibleDoc)); // Paginate if lastVisibleDoc is present
        }

        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

        return { docs, lastVisibleDoc: lastDoc };
      } catch (error) {
        console.error("Error with incremental listing: ", error);
        throw error;
      }
    },

    // Search documents by field and value
    search: async (field, value, limitCount = 10) => {
      try {
        const q = query(col.ref, where(field, "==", value), limit(limitCount));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error searching documents: ", error);
        throw error;
      }
    },

    // Check if a document exists
    exists: async (id) => {
      try {
        const docRef = doc(col.ref, id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
      } catch (error) {
        console.error("Error checking document existence: ", error);
        throw error;
      }
    },

    // Batch create documents
    batchCreate: async (documents) => {
      const batch = firestore.batch();
      try {
        documents.forEach((document) => {
          const docRef = doc(col.ref); // Firestore generates an ID
          batch.set(docRef, document);
        });
        await batch.commit();
      } catch (error) {
        console.error("Error with batch creation: ", error);
        throw error;
      }
    },

    // Batch delete documents by IDs
    batchDelete: async (ids) => {
      const batch = firestore.batch();
      try {
        ids.forEach((id) => {
          const docRef = doc(col.ref, id);
          batch.delete(docRef);
        });
        await batch.commit();
      } catch (error) {
        console.error("Error with batch deletion: ", error);
        throw error;
      }
    },

    // Subscribe to real-time updates
    watchChanges: (callback) => {
      return onSnapshot(col.ref, (snapshot) => {
        const changes = snapshot.docChanges().map((change) => {
          return {
            type: change.type,
            doc: { id: change.doc.id, ...change.doc.data() },
          };
        });
        callback(changes);
      });
    },
  };
});

export default db;
