import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function transacaoRoute(app: FastifyInstance) {
    // Retorna todas as transações existentes
    app.get('/api/v1/transacao', async (req, reply) => {
        try {
            const transacoes = await prisma.transacao.findMany()

            return reply.status(200).send(transacoes)
        } catch (error) {
            return reply.status(400).send({
                message: "Não foi possível retornar todas as transações existentes."
            })
        }
    })

    // Retorna dados de uma transação espefícica
    app.get('/api/v1/transacao/:id', async (req, reply) => {
        try {
            const paramsSchema = z.object({
                id: z.number()
            })

            const { id } = paramsSchema.parse(req.params)

            const transacaoExistente = await prisma.transacao.findUnique({
                where: { id: id }
            })

            if (transacaoExistente) {
                return reply.status(200).send(transacaoExistente)
            } else {
                return reply.status(400).send({
                    mensagem: "Não foi possível encontrar a transação ou transação não existente."
                })
            }
        } catch (error) {
            return reply.status(400).send({
                mensagem: "Não foi possível encontrar a transação."
            })
        }
    })

    // Insere uma nova transação 
    app.post('/api/v1/transacao', async (req, reply) => {
        try {
            const bodyParser = z.object({
                idCaixa: z.number(),
                tipoTransacao: z.string(),
                valor: z.number(),
                categoria: z.string(),
                dataTransacao: z.date(),
                descricao: z.string(),
            })

            const dadosTransacao = bodyParser.parse(req.body)

            const transacao = await prisma.transacao.create({
                data: dadosTransacao
            })

            return reply.status(201).send({
                transacao,
                mensagem: "Transação incluida com sucesso."
            })
        } catch (error) {
            return reply.status(400).send({
                mensagem: "Não foi possível incluir a transação."
            })
        }
    })

    // Remove uma transação existente
    app.delete('/api/v1/transacao/:id', async (req, reply) => {
        try {
            const paramsSchema = z.object({
                id: z.number()
            })

            const { id } = paramsSchema.parse(req.params)

            const transacaoExistente = await prisma.transacao.findUnique({
                where: { id: id }
            })

            if (transacaoExistente) {
                await prisma.transacao.delete({
                    where: { id: transacaoExistente.id }
                })

                return reply.status(200).send({
                    mensagem: "Transação excluída com sucesso."
                })
            } else {
                return reply.status(400).send({
                    mensagem: "Transação não encontrada ou não existente."
                })
            }

        } catch (error) {
            return reply.status(400).send({
                mensagem: "Não foi possível remover a transação."
            })
        }
    })
}