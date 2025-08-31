import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs : ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDuration(minutes : number) : string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
        return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
}

export function formatYear(date : string | Date) : string {
    return new Date(date)
        .getFullYear()
        .toString();
}

export function truncateText(text : string, maxLength : number) : string {
    if(text.length <= maxLength) 
        return text;
    return text.substring(0, maxLength) + "...";
}

export function getImagePlaceholder(width : number, height : number) : string {return `data:image/svg+xml,%3Csvg width='${width}' height='${height}' viewBox='0 0 ${width} ${height}' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='${width}' height='${height}' fill='%23333333'/%3E%3C/svg%3E`;}

export function getContentRating(rating : string) : string {
    const ratingMap: {
        [key : string] : string
    } = {
        'G': 'G',
        'PG': 'PG',
        'PG_13': 'PG-13',
        'R': 'R',
        'NC_17': 'NC-17',
        'U': 'U',
        'UA': 'U/A',
        'A': 'A'
    };
    return ratingMap[rating] || rating;
}
