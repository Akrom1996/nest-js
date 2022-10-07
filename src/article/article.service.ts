import {
    BadRequestException,
    Injectable
} from "@nestjs/common";
import {
    PrismaService
} from "src/prisma/prisma.service";
import {
    ArticleModel
} from "./article.model";

@Injectable()
export class ArticleService {
    constructor(private prismaService: PrismaService) {}

    // For Users and Admins
    async getAllArticles() {
        return await this.prismaService.article.findMany({
            orderBy: {
                created_at: 'desc'
            }
        });
    }

    // For Users and Admins
    async getArticleById(id: number) {
        return await this.prismaService.article.findUnique({
            where: {
                id: Number(id)
            }
        })
    }

    // For Admins only
    async createNewArticle(id: number, body: ArticleModel) {
        let user = await this.checkUser(id);
        if (user.role == 0) {
            throw new BadRequestException("You do not have permission to create/update/delete")
        }
        body.user_id = user.id;
        body.created_at = new Date();
        return await this.prismaService.article.create({
            data: body
        })

    }

    // For Admins only
    async deleteArticle(userId: number, articleId: number) {
        let user = await this.checkUser(userId);
        if (user.role == 0) {
            throw new BadRequestException("You do not have permission to update/delete")
        }
        await this.checkArticle(articleId);
        return await this.prismaService.article.delete({
            where: {
                id: Number(articleId)
            }
        })
    }

    // For Admins only
    async updateArticle(userId: number, articleId: number, body: ArticleModel) {
        let user = await this.checkUser(Number(userId))
        let article = await this.checkArticle(Number(articleId))
        if (!user) {
            throw new BadRequestException("User not found")
        }
        if (user.role == 0)
            throw new BadRequestException("You are not allowed to update document")
        if (!article)
            throw new BadRequestException("Article not found")
        return await this.prismaService.article.update({
            where: {
                id: Number(articleId)
            },
            data: body
        })
    }

    async checkUser(id: number) {
        let user = await this.prismaService.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!user) {
            throw new BadRequestException("User not found")
        }

        return user;
    }
    async checkArticle(articleId: number) {
        let article = await this.prismaService.article.findFirst({
            where: {
                id: Number(articleId)
            }
        })
        if (!article) {
            throw new BadRequestException("Article not found")
        }
        return article
    }
}