import { Hono, Context } from 'https://deno.land/x/hono@v3.11.7/mod.ts'
import { YEARS } from './constants.ts'
const app = new Hono()

type Motorcycle = {
year: number;
    brand: string,
    models: string[]
}

app.get('/api/motorcycles/:year', async (c: Context) => {


    if (isNaN(c.req.param('year'))) {
        return c.json({error: 'year must be a number'})
    }

    if (c.req.param('year') < 1981 || c.req.param('year') > 2024) {
        return c.json({error: 'year must be between 1981 and 2024'})
    }

    try {
        const data = await Deno.readTextFile(`motorcycles/${ c.req.param('year')}.json`);

        const jsonData = JSON.parse(data).filter((item: Motorcycle ) => item.models.length > 0);

        return  c.json(jsonData)
      } catch (error) {
        console.error(error);
      }
})


app.get('/api/motorcycles', async (c: Context) => {

    const data = await Promise.all(YEARS.map(async (year) => {
            const data = await Deno.readTextFile(`motorcycles/${ year }.json`);
            const jsonData = JSON.parse(data).map((item: Motorcycle ) => {
                item.year = year
                return item
            });
            return jsonData
        })
    )

    const jsonData = data.flat().filter((item: Motorcycle ) => item.models.length > 0);

    return  c.json(jsonData)
})

app.get('/', async (c: Context) => {
    
    const data = await Deno.readTextFile('page.html')
    return c.html(data)

})




Deno.serve(app.fetch)
