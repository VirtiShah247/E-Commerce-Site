import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestoreDb } from "../firebase/config";
import {v4 as uuid} from "uuid";
export const GeoLocation = () => {
    const apiKey = "393aa1050e224c4d9577a78808948e9d";
    const [location, setLocation] = useState({});
    const locationRef = useRef(location);
    const [countryDetails, setCountryDetails] = useState({});
    useEffect(()=>{
        console.log("effect called: " + location.latitude)
        let apiCalled = false;
        const getCountryName = async() => {
            apiCalled = true;
            if(apiCalled && location.latitude !== undefined && location.longitude !== undefined){
                try {
                await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=${apiKey}&pretty=1`)
                    .then((state) => {
                        if(state.status === 200){
                            // const data = JSON.parse(state?.responseText);
                            console.log(state.data);
                            const name = state.data.results[0].components.country;
                            const callingCode = state.data.results[0].annotations.callingcode;
                            console.log("calling code: " + callingCode);
                            setCountryDetails({
                                'id': uuid(),
                                'name': name,
                                'callingCode': callingCode
                            });                            
                        }
                    })
                    .catch((error) => toast.error(error.message))
                } catch (error) {
                    toast.error(error.message);
                }
                
            }
        }
        getCountryName();
        // return () => {apiCalled = false;}
    },[location]);
    useEffect(()=>{
        if(Object.keys(countryDetails).length !== 0 && countryDetails !== undefined){
            const dataCollection = collection(firestoreDb, "country");
            const dataRef = doc(dataCollection,"country");
            setDoc(dataRef,countryDetails);
        }
    },[countryDetails]);
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    function success(pos) {
        var crd = pos.coords;
        // location.current = ;
        if(locationRef.current.latitude !== crd.latitude || locationRef.current.longitude !== crd.longitude){
            setLocation({
                'latitude': crd.latitude,
                'longitude': crd.longitude, 
                'accuracy': crd.accuracy
    
            })
            locationRef.current = {
                'latitude': crd.latitude,
                'longitude': crd.longitude, 
                'accuracy': crd.accuracy
    
            };
        }
    }

    function errors(err) {
        // if(err.message !== "Timeout expired")
        toast.error(err.message);
    }
    if (navigator.geolocation) {
        navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
                if (result.state === "granted") {
                    navigator.geolocation.getCurrentPosition(success);
                } else if (result.state === "prompt") {
                    navigator.geolocation.getCurrentPosition(success, errors, options);
                }
                
            });
    } else {
        toast.error("Sorry Not available!");
    }
}
