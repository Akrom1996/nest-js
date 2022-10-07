import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
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
    @ApiOperation({ description: 'Get list of articles in the db' })
    getArticles() {
        return this.article.getAllArticles()
    }

    @Get(':id')
    @ApiOperation({ description: 'Get a single article by id' })
    getArticleById(@Param("id") id: number) {
        return this.article.getArticleById(id);
    }

    @Post(":userId")
    @ApiOperation({ description: 'create new article on admins can do this' })
    craeteArticle(@Param("userId") userId: number, @Body() body: ArticleModel) {
        return this.article.createNewArticle(userId, body);
    }

    @Delete(':userId/:articleId')
    @ApiOperation({ description: 'Delete an article by id only admins can do this' })
    deleteArticle(@Param("userId") userId: number, @Param("articleId") articleId: number) {
        return this.article.deleteArticle(userId, articleId);
    }

    @Put(":userId/:articleId")
    @ApiOperation({ description: 'Update article by id only admins can do this' })
    updateArticle(@Param("userId") userId: number, @Param("articleId") articleId: number, @Body() body: ArticleModel) {
        return this.article.updateArticle(userId, articleId, body);
    }
}