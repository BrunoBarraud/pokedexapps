import Datastore from "nedb-promises"
import type { Pokemon } from "./pokemon"

const db = Datastore.create({
  filename: "pokemon.db",
  autoload: true
})

