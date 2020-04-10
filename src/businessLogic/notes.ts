import { NoteItem } from '../models/NoteItem'
import { NoteAccess } from '../dataLayer/notesAccess'
import { parseUserId } from '../auth/utils'

const noteAccess = new NoteAccess()

export async function getAllNotes(jwtToken: string): Promise<NoteItem[]> {
  const userId = parseUserId(jwtToken)
  return await noteAccess.getAllNotes(userId)
}