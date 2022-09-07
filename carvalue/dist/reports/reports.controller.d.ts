import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
export declare class ReportsController {
    private reportsService;
    constructor(reportsService: ReportsService);
    createReports(body: CreateReportDto): Promise<import("./report.entity").Report>;
}
