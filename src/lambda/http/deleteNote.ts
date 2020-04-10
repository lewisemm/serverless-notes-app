import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { createLogger } from '../../utils/logger'
import { deleteNote, noteExists } from '../../businessLogic/notes'
import { getToken } from '../../auth/utils'

const logger = createLogger('deleteNotes')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const noteId = event.pathParameters.noteId
  const jwtToken = getToken(event.headers.Authorization)

  const validNote = await noteExists(noteId, jwtToken)

  if (!validNote) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'Note item does not exist'
      })
    }
  }

  // TODO: Remove a Note item by id
  logger.info(`Attempting to delete Note item of noteId: ${noteId}.`)
  const deletedResult = deleteNote(jwtToken, noteId)

  return {
    statusCode: 204,
    body: JSON.stringify({
      deletedResult
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)
