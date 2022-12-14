import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';
export declare class ReportsService {
    private repo;
    constructor(repo: Repository<Report>);
    createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto): Promise<any>;
    create(body: CreateReportDto, user: User): Promise<Report>;
    changeApproval(id: string, approved: boolean): Promise<{
        approved: boolean;
        id: number;
        price: number;
        make: string;
        model: string;
        year: number;
        lng: number;
        lat: number;
        mileage: number;
        user: User;
    } & Report>;
}
