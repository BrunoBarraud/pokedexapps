import type { APIRoute } from "astro";
import { addPokemon, getPokemonList } from "../../../services/pokemon";

export const GET: APIRoute = async (context) => {
  try {
    const page = context.url.searchParams.get('page');

    const { list, count } = await getPokemonList(page ? parseInt(page, 10) : undefined);

    return new Response(
      JSON.stringify({ list, count }), 
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    if (error instanceof Error && error.message === 'No se encontraron Pokémon para la página solicitada') {
      return new Response(JSON.stringify({ error: error.message }), { status: 404 });
    } else {
      return new Response(JSON.stringify({ error: (error as Error).message || 'Error desconocido' }), { status: 500 });
    }
  }
};

export const POST: APIRoute = async (context) => {
  const data = await context.request.formData()

  const id = parseInt(data.get('id') as string)
  const name = data.get('name') as string

  if (!id || !name) {
    return context.redirect('/?error=Invalid%20input')
  }

  const pokemon = { id, name }
  await addPokemon(pokemon)

  return context.redirect('/')
}