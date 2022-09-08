import { User } from 'src/users/user.entity';
export declare class Report {
    id: number;
    price: number;
    make: string;
    model: string;
    year: number;
    lng: number;
    lat: number;
    milege: number;
    user: User;
}
