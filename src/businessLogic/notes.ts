import * as uuid from 'uuid'

import { NoteItem } from '../models/NoteItem'
import { NoteAccess } from '../dataLayer/notesAccess'
import { parseUserId } from '../auth/utils'
import { CreateNoteRequest } from '../requests/CreateNoteRequest'
import { UpdateNoteRequest } from '../requests/UpdateNoteRequest'

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

export async function updateNote(
  jwtToken: string,
  noteId: string,
  updateNoteRequest: UpdateNoteRequest
): Promise<any> {
  const userId = parseUserId(jwtToken)

  return await noteAccess.updateNote(userId, noteId, updateNoteRequest)
}

export async function noteExists(
  noteId: string,
  jwtToken: string
): Promise<boolean> {
  const userId = parseUserId(jwtToken)
  const result = await noteAccess.getSingleNote(noteId, userId)
  return !!result
}

export async function deleteNote(jwtToken: string,
  noteId: string
): Promise<any> {
  const userId = parseUserId(jwtToken)
  return await noteAccess.deleteNote(userId, noteId)
}
