export interface IPostDB {
    id: string;
    text: string;
    creator_id: string;
    likes: number;
}

export class Post {
    constructor(
        private id: string,
        private text: string,
        private creator_id: string,
        private likes: number
    ) { }

    public getId = () => {
        return this.id;
    }

    public getText = () => {
        return this.text;
    }
    public getCreatorId = () => {
        return this.creator_id;
    }
    public getLikes = () => {
        return this.likes;
    }
    public setId = (newId: string) => {
        this.id = newId;
    }
    public setText = (newText: string) => {
        this.text = newText;
    }
    public setCreatorId = (newCreatorId: string) => {
        this.creator_id = newCreatorId;
    }
    public setLikes = (newLikes: number) => {
        this.likes = newLikes;
    }
}

export interface IPostInputDTO {
    token: string;
    text: string;
}