import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { collection, doc, setDoc } from "firebase/firestore";
import { firestoreDb } from "../firebase/config";
import { v4 as uuid } from "uuid";
export const GeoLocation = () => {
    const apiKey = "393aa1050e224c4d9577a78808948e9d";
    const [location, setLocation] = useState({});
    const locationRef = useRef(null);
    const [countryDetails, setCountryDetails] = useState({});
    useEffect(() => {
        let apiCalled = false;

        const getCountryName = async () => {
            apiCalled = true;
            if (apiCalled && location.latitude !== undefined && location.longitude !== undefined) {
                try {
                    await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location.latitude}+${location.longitude}&key=${apiKey}&pretty=1`)
                        .then((state) => {
                            if (state.status === 200) {
                                console.log(state.data);
                                const name = state.data.results[0].components.country;
                                const callingCode = state.data.results[0].annotations.callingcode;
                                const currency = state.data.results[0].annotations.currency.symbol;
                                if(name !== countryDetails.name){
                                    setCountryDetails({
                                        'id': uuid(),
                                        'name': name,
                                        'callingCode': callingCode,
                                        'currency': currency,
                                    });
                                }
                            }
                        })
                        .catch((error) => toast.error(error.message))
                } catch (error) {
                    toast.error(error.message);
                }

            }
        }
        getCountryName();

        return () => { apiCalled = false; }

    }, [location]);
    useEffect(() => {
        if (Object.keys(countryDetails).length !== 0 && countryDetails !== undefined) {
            const dataCollection = collection(firestoreDb, "country");
            const dataRef = doc(dataCollection, "country");
            setDoc(dataRef, countryDetails);
        }
    }, [countryDetails]);

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 30000
      }

      function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371;
        var dLat = deg2rad(lat2-lat1);
        var dLon = deg2rad(lon2-lon1); 
        var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
    }
    
    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }

    function success(pos) {
        var crd = pos.coords;
        let distance = 0;
        if(locationRef.current !== null ){
            distance = getDistanceFromLatLonInKm(locationRef.current.latitude, locationRef.current.longitude, crd.latitude, crd.longitude);
        }
        if (distance>5 || locationRef.current == null) {
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
        toast.error(err.message);
    }
    if (navigator.geolocation) {
        navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
                if (result.state === "granted") {
                    navigator.geolocation.watchPosition(success, errors, options);
                } else if (result.state === "prompt") {
                    navigator.geolocation.getCurrentPosition(success, errors, options);
                }

            });
    } else {
        toast.error("Sorry Not available!");
    }
}
