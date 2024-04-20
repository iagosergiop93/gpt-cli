
export interface GptCompletionRequest {
    model: string
    messages: GptMessage[]
}

export interface GptMessage {
    role: string
    content: string
}