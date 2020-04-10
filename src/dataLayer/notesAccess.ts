import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { NoteItem } from '../models/NoteItem'

export class NoteAccess {
  constructor(
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
    private readonly notesTable: string = process.env.NOTES_TABLE,
    private readonly userIndex: string = process.env.USER_INDEX){
  }

  async getAllNotes(userId: string): Promise<NoteItem[]> {
    const result = await this.docClient.query({
      TableName: this.notesTable,
      IndexName: this.userIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
          ':userId': userId
      }
    }).promise()

    return result.Items as NoteItem[]
  }

  async createNote(note: NoteItem): Promise<NoteItem> {
    await this.docClient.put({
      TableName: this.notesTable,
      Item: note
    }).promise()

    return note
  }
}
