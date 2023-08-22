import { fetchCoffeeStores } from "@/lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
    try {
        const { latLong, limit } = req.query
        const coffeeStores = await fetchCoffeeStores(latLong, limit);
        res.status(200)
        res.json(coffeeStores)
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({ message: 'something went wrong!' })
    }
}

export default getCoffeeStoresByLocation