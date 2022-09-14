import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { User } from 'src/users/user.entity';
import { ApprovedReportDto } from './dtos/approved-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    getEstimate(query: GetEstimateDto): Promise<any>;
    createReport(body: CreateReportDto, user: User): Promise<import("./report.entity").Report>;
    approveReports(id: any, body: ApprovedReportDto): Promise<{
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
    } & import("./report.entity").Report>;
}
