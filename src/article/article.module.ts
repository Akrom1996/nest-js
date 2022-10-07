import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ArticleService } from "./article.service";
import { ArticleController } from "./article.controller";

@Module({
    imports: [],
    controllers: [ArticleController],
    providers: [ArticleService,PrismaService],
})
export class ArticleModule {}