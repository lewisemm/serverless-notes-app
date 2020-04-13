import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { NoteItem } from '../models/NoteItem'

const XAWS = AWSXRay.captureAWS(AWS)

export class NoteAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly notesTable: string = process.env.NOTES_TABLE,
    private readonly userIndex: string = process.env.USER_INDEX,
    private readonly bucketName: string = process.env.ATTACHMENTS_S3_BUCKET,
    private readonly urlExpiration: string = process.env.SIGNED_URL_EXPIRATION){
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

  async updateNote(userId: string, noteId: string, updatedNote): Promise<any> {
    const params = {
      TableName: this.notesTable,
      Key: {
        userId,
        noteId
      },
      UpdateExpression: "set title = :title, description = :description",
      ExpressionAttributeValues: {
        ":title": updatedNote['title'],
        ":description": updatedNote['description']
      },
      ReturnValues:"NONE"
    };

    const updatedItem = await this.docClient.update(params).promise()
    return updatedItem

  }

  async getSingleNote(noteId: string, userId: string) {
    const result = await this.docClient.get({
      TableName: this.notesTable,
      Key: {
        userId,
        noteId
      }
    }).promise()
    // return !!result.Item
    return result.Item
  }

  async deleteNote(userId: string, noteId: string): Promise<any> {
    const params = {
      TableName: this.notesTable,
      Key: {
        userId,
        noteId
      },
      ReturnValues:"NONE"
    };
    const deletedResult = await this.docClient.delete(params).promise()
    return deletedResult
  }

  async getNoteUploadUrl(noteId: string): Promise<string> {
    const s3 = new XAWS.S3({
      signatureVersion: 'v4'
    })
    return s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: noteId,
      Expires: parseInt(this.urlExpiration)
    })
  }

  async updateNoteAttachmentUrl(userId: string, noteId: string): Promise<any> {
    const attachmentUrl = `https://${this.bucketName}.s3.amazonaws.com/${noteId}`
    const params = {
      TableName: this.notesTable,
      Key: {
        userId,
        noteId
      },
      UpdateExpression: "set attachmentUrl = :attachmentUrl",
      ExpressionAttributeValues: {
        ":attachmentUrl": attachmentUrl
      },
      ReturnValues:"NONE"
    };

    const updatedItem = await this.docClient.update(params).promise()
    return updatedItem
  }



}
