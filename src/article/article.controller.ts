import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post
} from "@nestjs/common";
import {
    ArticleModel
} from "./article.model";
import {
    ArticleService
} from "./article.service";

@Controller('article')
export class ArticleController {
    constructor(private readonly article: ArticleService) {}

    @Get()
    getArticles() {
        return this.article.getAllArticles()
    }
    
    @Get(':id')
    getArticleById(@Param("id") id: number) {
        return this.article.getArticleById(id);
    }
    
    @Post(":userId")
    craeteArticle(@Param("userId") userId: number, @Body() body: ArticleModel) {
        return this.article.createNewArticle(userId, body);
    }
    
    @Delete(':userId/:articleId')
    deleteArticle(@Param("userId") userId: number,@Param("articleId") articleId: number){
        return this.article.deleteArticle(userId,articleId);
    }
}