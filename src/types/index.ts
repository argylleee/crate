export type PerformerCategory = 'DJ' | 'Band' | 'Singer' | 'Musician' | 'Ensemble';

export type Genre =
    | 'House'
    | 'Hip Hop'
    | 'R&B'
    | 'Pop'
    | 'Jazz'
    | 'Rock'
    | 'Classical'
    | 'Electronic'
    | 'Latin'
    | 'Country'
    | 'Reggae'
    | 'Soul'
    | 'Funk'
    | 'Folk'
    | 'Afrobeats';

export interface Performer {
    id: string;
    name: string;
    category: PerformerCategory;
    genre: Genre;
    genres: Genre[];
    startingPrice: number;
    location: string;
    profilePhoto: string;
    coverImage: string;
    bio: string;
    gallery: string[];
    rating: number;
    reviewCount: number;
    pricing: PricingTier[];
}

export interface PricingTier {
    label: string;
    hours: number;
    price: number;
}

export type EventType =
    | 'Wedding'
    | 'Corporate Event'
    | 'Birthday Party'
    | 'Club Night'
    | 'Festival'
    | 'Private Event'
    | 'Concert'
    | 'Other';

export interface BookingFormData {
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    eventType: EventType;
    notes: string;
}