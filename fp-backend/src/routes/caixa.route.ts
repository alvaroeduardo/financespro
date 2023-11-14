import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function caixaRoute(app: FastifyInstance) {

    // Lista todos os caixas
    app.get('/api/v1/caixa', async (req, reply) => {
        try {
            const caixas = await prisma.caixa.findMany()

            return reply.status(200).send(caixas)
        } catch (error) {
            return reply.status(400).send({
                message: "Não foi possível retornar a lista dos caixas existentes."
            })
        }
    })

    // Retorna dados de um caixa específico
    app.get('/api/v1/caixa/:id', async (req, reply) => {
        try {
            const paramsSchema = z.object({
                id: z.number()
            })

            const { id } = paramsSchema.parse(req.params)

            const caixaExistente = await prisma.caixa.findUnique({
                where: {
                    id: id
                }
            })

            if (caixaExistente) {
                return reply.status(200).send(caixaExistente)
            } else {
                return reply.status(400).send({
                    message: "Caixa não existente. Verifique o ID informado."
                })
            }
        } catch (error) {
            return reply.status(400).send({
                message: "Não foi possível retornar os dados do caixa."
            })
        }
    })

    // Realiza abertura do Caixa
    app.post('/api/v1/caixa/abertura', async (req, reply) => {
        try {
            const bodyParser = z.object({
                dataAbertura: z.date(),
                saldoInicial: z.number(),
                status: z.string(),
                observacao: z.string()
            })

            const dadosNovoCaixa = bodyParser.parse(req.body)

            const caixasAbertos = await prisma.caixa.findFirst({
                where: {
                    status: "aberto"
                }
            })

            if (!caixasAbertos) {
                const novoCaixa = await prisma.caixa.create({
                    data: dadosNovoCaixa
                })

                return reply.status(200).send({
                    novoCaixa,
                    message: "Novo caixa aberto com sucesso."
                })
            } else {
                return reply.status(400).send({
                    message: "Não é possível abrir um novo caixa pois já existe um aberto."
                })
            }

        } catch (error) {
            return reply.status(400).send({
                message: "Não foi possível realizar a abertura do caixa."
            })
        }
    })

    // Realiza fechamento do caixa
    app.put('/api/v1/caixa/fechamento/:id', async (req, reply) => {
        try {
            const paramsSchema = z.object({
                id: z.number()
            })

            const bodyParser = z.object({
                observacao: z.string()
            })

            const { id } = paramsSchema.parse(req.params)

            const { observacao } = bodyParser.parse(req.body)

            const caixaExistente = await prisma.caixa.findUnique({
                where: {
                    id: id
                }
            })

            if (caixaExistente) {
                await prisma.caixa.update({
                    where: {
                        id: caixaExistente.id
                    },

                    data: {
                        dataFechamento: new Date(),
                        observacao,
                        status: "FECHADO"
                    }
                })
            } else {
                return reply.status(400).send({
                    message: "Caixa não existente. Verifique o ID informado."
                })
            }
        } catch (error) {
            return reply.status(400).send({
                message: "Não foi possível realizar o fechamento do caixa."
            })
        }
    })
}