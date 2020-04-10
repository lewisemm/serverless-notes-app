import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'

import { createLogger } from '../../utils/logger'
import { noteExists, getNoteUploadUrl, updateNoteAttachmentUrl } from '../../businessLogic/notes'
import { getToken } from '../../auth/utils'

const logger = createLogger('generateUploadUrl')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const noteId = event.pathParameters.noteId
  const jwtToken = getToken(event.headers.Authorization)

  const validNote = await noteExists(noteId, jwtToken)

  if (!validNote) {
    logger.info('Could not find a note item with that noteId', noteId)
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'Note item does not exist'
      })
    }
  }

  const uploadUrl = await getNoteUploadUrl(noteId)

  logger.info('Attempting to update the attachmentUrl of item', validNote)

  const updatedItem = await updateNoteAttachmentUrl(jwtToken, noteId)

  logger.info('attachmentUrl updated', updatedItem)
  

  // TODO: Return a presigned URL to upload a file for a Note item with the provided id
  return {
    statusCode: 201,
    body: JSON.stringify({
      uploadUrl
    })
  }

})

handler.use(
  cors({
    credentials: true
  })
)
