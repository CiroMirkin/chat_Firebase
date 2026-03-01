import type { FieldValue, Timestamp as FireTimestamp } from "firebase/firestore"

export type Participant = string

export type Timestamp = FireTimestamp | FieldValue

export interface Message {
    id: string
    text: string
    senderId: Participant
    timestamp: Timestamp
}

export type LastMessage = Omit<Message, 'id'>

export interface Room {
    id: string
    participants: Participant[]
    createdAt: Timestamp
    lastMessage: LastMessage | null
}
