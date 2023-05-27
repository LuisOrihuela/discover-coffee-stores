import { ACTION_TYPES, StoreContext } from "@/store/storeContext"
import { useContext, useState } from "react"

const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState()
    const [isLoading, setIsLoading] = useState(false)
    // const [latLong, setLatLong] = useState()
    const { dispatch, state } = useContext(StoreContext)

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        dispatch({ type: ACTION_TYPES.SET_LAT_LONG, payload: `${latitude},${longitude}` })
        setLocationErrorMsg("")
        setIsLoading(false)
    }

    const error = () => {
        setLocationErrorMsg("Unable to retrieve your location")
        setIsLoading(false)
    }

    const handleTrackLocation = () => {
        setIsLoading(true)
        if(!navigator.geolocation) {
            setLocationErrorMsg("Geolocation is not supported by your browser")
        } else {
            navigator.geolocation.getCurrentPosition(success, error)
        }
    }
    
    return {
        handleTrackLocation,
        isLoading,
        latLong: state.latLong,
        locationErrorMsg,
    }
}

export default useTrackLocation