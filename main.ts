import { Hono, Context } from 'https://deno.land/x/hono@v3.11.7/mod.ts'

const app = new Hono()

type Motorcycle = {
    brand: string,
    models: string[]
}

app.get('/api/:year', async (c: Context) => {


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


Deno.serve(app.fetch)
