import fastify from "fastify"
import { fastifyCors } from "@fastify/cors"
import { transacaoRoute } from "./routes/transacao.route"

const app = fastify()

app.register(fastifyCors, {
    origin: '*'
})

app.register(transacaoRoute)

app.listen({ port: 3333 }).then(() => {
    console.log('Servidor HTTP iniciado com sucesso na porta 3333.')
})