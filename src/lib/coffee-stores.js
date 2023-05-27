import {createApi} from "unsplash-js"

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
})

const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const getUrlForCoffeeStores = ({latLong, query, limit}) => {
    return  `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
  } 

  const getCoffeeStorePhotos = async ( ) => {
    const res = await unsplash.search.getPhotos({
      query: "coffee shop",
      page: 1,
      perPage: 40,
    })
    return res.response.results.map(res => res.urls.small)
  }

  export const fetchCoffeeStores = async (latLong = '43.70316409104907,-79.39217225267849', limit = 6) => {
    const photos = await getCoffeeStorePhotos()
      try {
        const response = await fetch(
         getUrlForCoffeeStores({ latLong , query: 'coffee', limit }),
          options
        ).then(res => res?.json())

        return response.results.map((result, index) => {
          return {
            id: result?.fsq_id,
            address: result?.location?.address ?? result.location.formatted_address,
            locality: result?.location.locality ?? '',
            name: result.name,
            imgUrl: photos?.[index],
          }
        });
      } catch (error) {
        console.error(error);
        return []
      }
  }