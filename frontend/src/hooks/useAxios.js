import { useEffect, useState } from "react";
import { firestoreDb } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const useAxios = (name) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    console.log("inside use axios" + name);

    
    useEffect(() => {
        console.log("useeffect is running");
        const fetchData = async() => {
            console.log("inside fetch data");
            try {
                // const response = await axios.get(url, { headers: headers, params: params, body: body });
                // setData(response.data);
                const dataCollection = collection(firestoreDb, name);
                const collectionDocs = await getDocs(dataCollection);
                const collectionData = collectionDocs.docs.map((doc) => doc.data());
                setData(collectionData);
                
            } catch (error) {
                console.log("error message: " + error);
                setError(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    return { data, loading, error };

    

}