import { table, getMinifiedRecords } from '@/lib/airtable'
const createCoffeeStore = async (req, res) => {
    try {
        const { id, name, neighborhood, address, imgUrl, voting } = req.body
        if(id) {
            if (req.method === "POST") {
                // find a record if it exists
              const coffeeStoreRecords = await table
                .select({
                  filterByFormula: `id="${id}"`,
                })
                .firstPage();
              if (coffeeStoreRecords?.length) {
                const records = getMinifiedRecords(coffeeStoreRecords)
                res.json(records);
              } else {
                //create record in case the id doesn't exist
                if(name){
                    const createdRecords = await table.create([
                        {
                            fields: {
                                id,
                                name,
                                address,
                                neighborhood,
                                voting,
                                imgUrl,
                            }
                        }
                    ])
                    const records = getMinifiedRecords(createdRecords)
                    res.json(records)
                } else {
                    res.status(400)
                    res.json({ message: "Name is missing" })
                }
              }
            } else {
              res.json({ message: "not post" });
            }
        } else {
            res.status(400)
            res.json({ message: "ID is missing" })
        }
    } catch (error) {
        console.error('Error creating or finding a store: ', error)
        res.status(500)
        res.json({ message: 'Error creating or finding a store: ', error })
    }
};
export default createCoffeeStore;
