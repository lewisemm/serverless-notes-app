import * as uuid from 'uuid'

import { NoteItem } from '../models/NoteItem'
import { NoteAccess } from '../dataLayer/notesAccess'
import { parseUserId } from '../auth/utils'
import { CreateNoteRequest } from '../requests/CreateNoteRequest'

const noteAccess = new NoteAccess()

export async function getAllNotes(jwtToken: string): Promise<NoteItem[]> {
  const userId = parseUserId(jwtToken)
  return await noteAccess.getAllNotes(userId)
}

export async function createNote(
  createNoteRequest: CreateNoteRequest,
  jwtToken: string
): Promise<NoteItem> {

  const userId = parseUserId(jwtToken)
  const noteId = uuid.v4()
  const createdAt = new Date().toISOString()

  return await noteAccess.createNote({
    noteId,
    userId,
    createdAt,
    title: createNoteRequest.title,
    description: createNoteRequest.description
  })
}
