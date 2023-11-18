import { User } from "./user";

export interface ratings_received {
    id?: number;
    user_id?: number;
    employee_id?: number;
    value: number;
    comment?: string;
    reply?: string;
    updated_at?: Date
    user?: User;
}