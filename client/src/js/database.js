import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error("putDb not implemented");

// Export a function we will use to POST to the database.
export const putDb = async (content) => {
  console.log("PUT to the database");

  // Create a connection to the database and specify the version we want to use.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the store and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .add() method on the store and pass in the content.
  const request = store.put({
    value: content,
  });

  // Get confirmation of the request.
  const result = await request;
  console.log("data saved to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error("getDb not implemented");

// get all
export const getDb = async () => {
  console.log("GET from the database");

  // connection to the IndexedDB database
  const jateDb = await openDB("jate", 1);

  // new transaction
  const tx = jateDb.transaction("jate", "readonly");

  // open the store
  const store = tx.objectStore("jate");

  // .getAll() method
  const request = store.getAll();

  // confirmation request.
  const result = await request;
  console.log("result.value", result);
  return result;
};

initdb();
