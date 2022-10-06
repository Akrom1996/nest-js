export class Article {
    id: string;
    articleTitle: string;
    created_at: Date;
    constructor(id: string, articleTitle: string, created_at: Date) {
        this.id = id;
        this.articleTitle = articleTitle;
        this.created_at = created_at;
    }
}