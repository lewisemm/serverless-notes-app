import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { createLogger } from '../../utils/logger'
import { getAllNotes } from '../../businessLogic/notes'
import { getToken } from '../../auth/utils'

const logger = createLogger('getNotes')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event)

  const token = getToken(event.headers.Authorization)
  const items = await getAllNotes(token)

  logger.info('getAllNotes operation performed successfully')
  return {
    statusCode: 200,
    body: JSON.stringify({
      items
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)

