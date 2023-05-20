import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import IPComponent from "./Components/IPComponent";
import axios from "axios";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  DocumentData,
  DocumentReference,
  getDoc,
  Firestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOujekLpfHDpobk0aIlpgp_Zhup-HNNps",
  authDomain: "thought-8dd54.firebaseapp.com",
  projectId: "thought-8dd54",
  storageBucket: "thought-8dd54.appspot.com",
  messagingSenderId: "353223067970",
  appId: "1:353223067970:web:c1aa3e2f43941d958120db",
};

function App() {
  const [checked, setChecked] = useState<boolean>(false);
  const [data, setData] = useState("");
  const [db, setDb] = useState(null as any);
  const [id, setId] = useState("" as any);

  const saveData = async () => {
    let docRef = null;
    if (id == "") {
      try {
        axios
          .get("https://api.ipify.org?format=json")
          .then(async (response) => {
            const { ip } = response.data;
            try {
              docRef = await setDoc(doc(collection(db, "notes"), ip), {
                data: data,
              });
              // console.log("Document written with ID: ", docRef);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
          });
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    } else {
      try {
        docRef = await setDoc(doc(collection(db, "notes"), id), { data: data });
        // console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const getData = async (initialDb: Firestore, id: string) => {
    let docSnap = null as any;
    if (id == '') {
      try {
        axios
          .get("https://api.ipify.org?format=json")
          .then(async (response) => {
            const { ip } = response.data;
            id= ip
          });
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    }
    else
    {
      try {
        const docRef = doc(initialDb, "notes", id);
        docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data().data);
          setData(docSnap.data().data);
        } else {
          // docSnap.data() will be undefined in this case
          // console.log("No such document!");
        }
        // console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  useLayoutEffect(() => {
    const app = initializeApp(firebaseConfig);
    const initialDb = getFirestore(app);
    setDb(initialDb);
    getData(initialDb, '');
    window.addEventListener("beforeunload", saveData);

    return () => {
      // Clean up the event listener when the component is unmounted
      window.removeEventListener("beforeunload", saveData);
    };
  }, []);

  useEffect(() => {
    if (checked) {
      document.getElementById("manual")?.focus();
    } else {
      setId("");
    }
  }, [checked]);
  return (
    <div className="App d-flex">
      <header className="m-2 d-flex">
        <IPComponent checked={checked} setChecked={setChecked} />
        <div>
          {checked ? (
            <div className="switch">
              <input
                id="manual"
                type="text"
                className="manual border border-0 mt-2"
                placeholder="Name.."
                onChange={(e) => setId(e.target.value)}
                autoComplete="off"
              />
              <button className="p-2 btn btn-success" onClick={saveData}></button>
              <button className="p-2 btn btn-danger" onClick={()=>getData(db, id)}></button>
            </div>
          ) : null}
        </div>
      </header>
      <textarea
        id="data"
        className="text-area position-absolute top-0 start-0 w-100 h-100 border border-0 pt-5"
        autoFocus={true}
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Type here ..."
      ></textarea>
    </div>
  );
}

export default App;
