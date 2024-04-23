import { useRef } from "react";
import { toast } from "react-toastify";

export const GeoLocation = () => {
    const location = useRef({});
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
    function success(pos) {
        var crd = pos.coords;
        location.current = {
            'latitude': crd.latitude,
            'longitude': crd.longitude, 
            'accuracy': crd.accuracy

        };
    }

    function errors(err) {
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
