import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { createLogger } from '../../utils/logger'
import { UpdateNoteRequest } from '../../requests/UpdateNoteRequest'
import { updateNote, noteExists } from '../../businessLogic/notes'
import { getToken } from '../../auth/utils'

const logger = createLogger('updateNote')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const noteId = event.pathParameters.noteId
  const updatedNote: UpdateNoteRequest = JSON.parse(event.body)
  logger.info(`Update information is`, updatedNote)
  const jwtToken = getToken(event.headers.Authorization)

  // TODO: Update a Note item with the provided id using values in the "updatedNote" object
  const validNote = await noteExists(noteId, jwtToken)

  if (!validNote) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'Note item does not exist'
      })
    }
  }

  const updatedItem = await updateNote(jwtToken, noteId, updatedNote)

  return {
    statusCode: 204,
    body: JSON.stringify({
      updatedItem
    })
  }
})

handler.use(
  cors({
    credentials: true
  })
)
