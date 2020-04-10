import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { createLogger } from '../../utils/logger'
import { getToken } from '../../auth/utils'
import { createNote } from '../../businessLogic/notes'
import { CreateNoteRequest } from '../../requests/CreateNoteRequest'

const logger = createLogger('createNotes')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Implement creating a new Note item

  const token = getToken(event.headers.Authorization)
  const createNoteRequest: CreateNoteRequest = JSON.parse(event.body)
  logger.info('Data received: ', createNoteRequest)

  const createdItem = await createNote(createNoteRequest, token)

  return {
    statusCode: 201,
    body: JSON.stringify({
      items: createdItem
    })
  }

})

handler.use(
  cors({
    credentials: true
  })
)
