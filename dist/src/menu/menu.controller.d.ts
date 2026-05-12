import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(req: any, dto: CreateMenuDto, files: {
        foodMenuFile?: Express.Multer.File[];
        drinkMenuFile?: Express.Multer.File[];
        spaMenuFile?: Express.Multer.File[];
        accomodationMenuFile?: Express.Multer.File[];
        accommodationMenuFile?: Express.Multer.File[];
    }): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        restaurantReviewUrl: string | null;
        spaReviewUrl: string | null;
        accommodationReviewUrl: string | null;
        foodMenuUrl: string | null;
        drinkMenuUrl: string | null;
        spaMenuUrl: string | null;
        accommodationMenuUrl: string | null;
        qrCodeUrl: string | null;
        isActive: boolean;
    }>;
    findAll(req: any): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        restaurantReviewUrl: string | null;
        spaReviewUrl: string | null;
        accommodationReviewUrl: string | null;
        foodMenuUrl: string | null;
        drinkMenuUrl: string | null;
        spaMenuUrl: string | null;
        accommodationMenuUrl: string | null;
        qrCodeUrl: string | null;
        isActive: boolean;
    }[]>;
    findOne(req: any, id: string): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        restaurantReviewUrl: string | null;
        spaReviewUrl: string | null;
        accommodationReviewUrl: string | null;
        foodMenuUrl: string | null;
        drinkMenuUrl: string | null;
        spaMenuUrl: string | null;
        accommodationMenuUrl: string | null;
        qrCodeUrl: string | null;
        isActive: boolean;
    }>;
    update(req: any, id: string, dto: UpdateMenuDto): Promise<{
        userId: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        restaurantReviewUrl: string | null;
        spaReviewUrl: string | null;
        accommodationReviewUrl: string | null;
        foodMenuUrl: string | null;
        drinkMenuUrl: string | null;
        spaMenuUrl: string | null;
        accommodationMenuUrl: string | null;
        qrCodeUrl: string | null;
        isActive: boolean;
    }>;
    remove(req: any, id: string): Promise<void>;
}
