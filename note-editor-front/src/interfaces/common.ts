export interface NoteType{
    id: string;
    title: string;
    description: string;
    createdDate?: number;
    modifiedDate?: number;
};

export interface InitialsValuesType {
    username: string;
    password: string;
    passwordConfirmation?: string;
}

export type HandleNoteChange = (note: NoteType) => Promise<any>;
