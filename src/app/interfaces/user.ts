import { Media } from "./media";
import { ratings_received } from "./ratingsReceived";

export interface User {
    id: number;
    name: string;
    email: string;
    document: string;
    description: string;
    services: string;
    phone: string;
    phone_whatsapp?: string;
    link_instagram?: string;
    link_facebook?: string;
    state?: string;
    city?: string;
    neighborhood?: string;
    street?: string;
    number?: string;
    complement?: string;
    archived: boolean;
    user_type: number;
    created_at: Date;
    updated_at: Date;
    thumb?: string;
    url?: string;
    rating_average: any;
    ratings_received: Array<ratings_received>
}
