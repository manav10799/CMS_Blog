export class PostsModel {
    id: number;
    title:string;
    description: string;
    date: Date;
    author: string;
    tags: Array<any>;

    constructor(args:any) {
        this.id =  args.id;
        this.title = args.title;
        this.description = args.description;
        this.date = args.date;
        this.author = args.author;
        this.tags = args.tags || [];
    }
}

export class AddPostModel {
    id: number;
    title:string;
    description: string;
    date: Date;
    author: string;
    tags: Array<any>;

    constructor(args:any) {
        this.id =  args.id;
        this.title = args.title;
        this.description = args.description;
        this.date = args.date;
        this.author = args.author;
        this.tags = args.tags || [];
    }
}

export class AddTags {
    id: number;
    name: string;

    constructor(args:any) {
        this.id = args.id;
        this.name = args.name;
    }
}