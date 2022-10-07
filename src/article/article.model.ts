export class ArticleModel {
    id: number;
    user_id: number;
    articleTitle: string;
    created_at: Date;
    constructor(id: number,user_id: number, articleTitle: string, created_at: Date) {
        this.id = id;
        this.user_id = user_id;
        this.articleTitle = articleTitle;
        this.created_at = created_at;
    }
}