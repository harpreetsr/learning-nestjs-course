import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';
export declare class ReportsService {
    private repo;
    constructor(repo: Repository<Report>);
    create(body: CreateReportDto): Promise<Report>;
}
