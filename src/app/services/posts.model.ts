export class PostsModel {
    id: any;
    title:string;
    description: string;
    date: Date;
    author: string;
    tags: Array<any>;
    likeCount: number;

    constructor(args:any) {
        this.id =  args.id;
        this.title = args.title;
        this.description = args.description;
        this.date = args.date;
        this.author = args.author;
        this.tags = args.tags || [];
        this.likeCount = args.likeCount || 0;
    }
}

export class AddPostModel {
    id: any;
    title:string;
    description: string;
    date: Date;
    author: string;
    tags: Array<any>;
    likeCount: number;

    constructor(args:any) {
        this.id =  args.id;
        this.title = args.title;
        this.description = args.description;
        this.date = args.date;
        this.author = args.author;
        this.tags = args.tags || [];
        this.likeCount = args.likeCount || 0;
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

export class AddComment {
    id:any;
    comments: string; 
    author: string;
    date: Date;
    profileImage: string;
    email: string;
    identifier: any;

    constructor(args: any) {
        this.id = args.id;
        this.comments = args.comment;
        this.author = args.author;
        this.date = args.date;
        this.profileImage = args.profileImage;
        this.email = args.email;
        this.identifier = args.identifier;
    }
 }