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
  getDoc,
  Firestore,
} from "firebase/firestore";
import ToastComponent from "./Components/ToastComponent";
import HelperComponent from "./Components/HelperComponent";

const firebaseConfig = {
  apiKey: "AIzaSyBOujekLpfHDpobk0aIlpgp_Zhup-HNNps",
  authDomain: "thought-8dd54.firebaseapp.com",
  projectId: "thought-8dd54",
  storageBucket: "thought-8dd54.appspot.com",
  messagingSenderId: "353223067970",
  appId: "1:353223067970:web:c1aa3e2f43941d958120db",
};

function App() {
  const [defined, setDefined] = useState<boolean>(false);
  const [toast, setToast] = useState<boolean>(false);
  const [message, setMessage] = useState("" as any);
  const [help, setHelp] = useState(false);
  const [data, setData] = useState("");
  const [db, setDb] = useState(null as any);
  const [id, setId] = useState("" as any);

  const welcome = () => {
    setHelp(true);
    setDefined(true);
    setTimeout(() => {
      setHelp(false);
      setDefined(false);
    }, 10000);
  };

  const saveData = async () => {
    let docRef = null;
    if (db == null) {
      const app = initializeApp(firebaseConfig);
      const initialDb = getFirestore(app);
      setDb(initialDb);
    }
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
              setMessage("saved 😏");
              setToast(true);
            } catch (e) {
              console.error("Error adding document: ", e);
              setMessage("Error saving 🤣💀");
              setToast(true);
            }
          });
      } catch (error) {
        console.error("Error fetching IP address:", error);
        setMessage("Error fetching IP address ☹️");
        setToast(true);
      }
    } else {
      try {
        docRef = await setDoc(doc(collection(db, "notes"), id), { data: data });
        // console.log("Document written with ID: ", docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
        setMessage("Error saving the document");
        setToast(true);
      }
    }
  };

  const getData = async (initialDb: Firestore, id: string) => {
    let docSnap = null as any;
    if (id == "") {
      try {
        axios
          .get("https://api.ipify.org?format=json")
          .then(async (response) => {
            const { ip } = response.data;
            const docRef = doc(initialDb, "notes", ip);
            docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setData(docSnap.data().data);
              setMessage("Welcome again we found you 😊😁👍");
              setToast(true);
            } else {
              welcome();
              setMessage("Welcome To ThoughtPage 😎🥰");
              setToast(true);
            }
          });
      } catch (error) {
        console.error("Error fetching IP address:", error);
        setMessage("Error fetching IP address ☹️");
        setToast(true);
      }
    } else {
      try {
        const docRef = doc(initialDb, "notes", id);
        docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data().data);
          setMessage("Welcome again! we found you 😊😁👍");
          setToast(true);
        } else {
          setMessage("Welcome To ThoughtPage 😎🥰");
          setToast(true);
        }
      } catch (e) {
        console.error("Error adding document: ", e);
        setMessage("Error getting document 😱😨");
        setToast(true);
      }
    }
  };

  useLayoutEffect(() => {
    const app = initializeApp(firebaseConfig);
    const initialDb = getFirestore(app);
    setDb(initialDb);
    getData(initialDb, "");
  }, []);

  useEffect(() => {
    if (defined) {
      document.getElementById("manual")?.focus();
    } else {
      setId("");
    }
  }, [defined]);
  return (
    <div className="App d-flex">
      {help ? (
        <div>
            <div className="position-absolute help bottom-0 start-0 m-2 mb-5 pb-5 text-success">
              save in cloud
            </div>
            <div className="position-absolute help top-0 end-0 m-2 mt-5 pt-5 d-none d-sm-block">
              click defined for manual name
            </div>
            <div className="position-absolute help top-0 start-0 m-2 mt-5 pt-5 d-flex gap-4 flex-wrap">
              <div className="d-flex flex-wrap">name 🫡</div>
              <div className="ms-5 text-danger">fetch button😎</div>
            </div>
            <div className="position-absolute help top-50 start-50 translate-middle">
              Through your thoughts here😁😋
              <div>
                (you can save the info using the name or by default it is saved
                using IP)
              </div>
            </div>
          <button
            className="btn btn-outline-danger mt-5 text-danger help position-absolute top-50 start-50 translate-middle"
            onClick={() => {
              setHelp(false);
              setDefined(false);
            }}
          >
            close helper
          </button>

        </div>
      ) : null}
      <header className="m-2 d-flex">
        <IPComponent defined={defined} setDefined={setDefined} />
        <div>
          {defined ? (
            <div className="switch">
              <input
                id="manual"
                type="text"
                className="manual border border-0 mt-2"
                placeholder="Name.."
                onChange={(e) => setId(e.target.value)}
                autoComplete="off"
              />
              <button
                className="p-2 btn btn-danger"
                onClick={() => getData(db, id)}
              ></button>
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
      {toast ? (
        <ToastComponent message={message} setToast={setToast}></ToastComponent>
      ) : null}
      <button
        className="p-2 btn btn-success position-fixed bottom-0 start-0 m-4"
        onClick={saveData}
      ></button>
    </div>
  );
}

export default App;
