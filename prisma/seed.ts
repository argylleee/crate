import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

const performersData = [
    {
        id: 'dj-aldrei',
        slug: 'dj-aldrei',
        name: 'DJ Aldrei',
        category: 'DJ',
        genre: 'House',
        genres: ['House', 'Electronic', 'Hip Hop'],
        startingPrice: 500,
        location: 'Cavite, Philippines',
        profilePhoto: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
        coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
        bio: 'DJ Aldrei has been lighting up dance floors across Cavite for over 10 years. Known for seamless transitions and reading the crowd, DJ Aldrei specializes in house, electronic, and hip-hop fusion sets that keep the energy flowing all night long.',
        gallery: [
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
        ],
        rating: 4.9,
        reviewCount: 153,
        pricing: [
            { label: 'Standard Set', hours: 2, price: 500 },
            { label: 'Extended Set', hours: 5, price: 1000 },
            { label: 'Full Night', hours: 10, price: 1600 },
        ],
    },
    {
        id: 'ben-and-ben',
        slug: 'ben-and-ben',
        name: 'Ben&Ben',
        category: 'Band',
        genre: 'Folk',
        genres: ['Folk', 'Pop'],
        startingPrice: 50000,
        location: 'Quezon City, Philippines',
        profilePhoto: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80',
        coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&auto=format&fit=crop&q=80',
        bio: 'Ben&Ben is a Filipino indie pop and folk band known for their heartfelt lyrics and melodies that resonate with listeners. They have won numerous awards and are considered one of the most successful bands in the Philippines.',
        gallery: [
            'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80',
        ],
        rating: 5.0,
        reviewCount: 21634,
        pricing: [
            { label: 'Basic Gig', hours: 2, price: 50000 },
            { label: 'Premium Gig', hours: 5, price: 100000 },
            { label: 'VIP Gig', hours: 10, price: 150000 },
        ],
    },
    {
        id: 'skusta-clee',
        slug: 'skusta-clee',
        name: 'Skusta Clee',
        category: 'Singer',
        genre: 'Hip Hop',
        genres: ['Hip Hop', 'Pop', 'R&B'],
        startingPrice: 20000,
        location: 'Manila, Philippines',
        profilePhoto: 'https://images.unsplash.com/photo-1516575334481-f85287c2c82d?w=800&auto=format&fit=crop&q=80',
        coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&auto=format&fit=crop&q=80',
        bio: 'Skusta Clee is a Filipino rapper, singer, and songwriter known for his hit songs "Solo," "Zebbiana," and "Luvsick." He is one of the most popular rappers in the Philippines and has won numerous awards.',
        gallery: [
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop&q=80',
        ],
        rating: 4.7,
        reviewCount: 1743,
        pricing: [
            { label: 'Club Set', hours: 2, price: 20000 },
            { label: 'Festival Set', hours: 5, price: 50000 },
            { label: 'Concert Set', hours: 10, price: 80000 },
        ],
    },
    {
        id: 'dj-justin',
        slug: 'dj-justin',
        name: 'DJ Justin',
        category: 'DJ',
        genre: 'House',
        genres: ['House', 'Electronic', 'Hip Hop'],
        startingPrice: 10000,
        location: 'Manila, Philippines',
        profilePhoto: 'https://images.unsplash.com/photo-1516575334481-f85287c2c82d?w=800&auto=format&fit=crop&q=80',
        coverImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200&auto=format&fit=crop&q=80',
        bio: 'DJ Justin is a Filipino DJ, producer, and remixer known for his hit songs "Solo," "Zebbiana," and "Luvsick." He is one of the most popular DJs in the Philippines and has won numerous awards.',
        gallery: [
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop&q=80',
        ],
        rating: 4.6,
        reviewCount: 150,
        pricing: [
            { label: 'Club Set', hours: 2, price: 10000 },
            { label: 'Festival Set', hours: 5, price: 20000 },
            { label: 'Concert Set', hours: 10, price: 30000 },
        ],
    },
    {
        id: 'bini',
        slug: 'bini',
        name: 'BINI',
        category: 'Group',
        genre: 'Pop',
        genres: ['Pop', 'R&B'],
        startingPrice: 50000,
        location: 'Taguig, Philippines',
        profilePhoto: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
        coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
        bio: 'BINI is a Filipino girl group formed in 2023. They are known for their hit songs "Feel Good In It," "Lalala," and "Na Na Na." They have won numerous awards and are considered one of the most popular girl groups in the Philippines.',
        gallery: [
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
        ],
        rating: 4.9,
        reviewCount: 153,
        pricing: [
            { label: 'Standard Set', hours: 2, price: 50000 },
            { label: 'Extended Set', hours: 5, price: 100000 },
            { label: 'Full Night', hours: 10, price: 150000 },
        ],
    },
    {
        id: 'dec-ave',
        slug: 'dec-ave',
        name: 'December Avenue',
        category: 'Band',
        genre: 'Pop',
        genres: ['Pop', 'Rock'],
        startingPrice: 80000,
        location: 'Parañaque, Philippines',
        profilePhoto: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80',
        coverImage: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&auto=format&fit=crop&q=80',
        bio: 'December Avenue is a Filipino indie pop and rock band known for their heartfelt lyrics and melodies that resonate with listeners. They have won numerous awards and are considered one of the most successful bands in the Philippines.',
        gallery: [
            'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80',
            'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80',
        ],
        rating: 5.0,
        reviewCount: 21634,
        pricing: [
            { label: 'Basic Gig', hours: 2, price: 80000 },
            { label: 'Premium Gig', hours: 5, price: 120000 },
            { label: 'VIP Gig', hours: 10, price: 200000 },
        ],
    },
];

async function main() {
    await prisma.pricingTier.deleteMany();
    await prisma.favorite.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.performer.deleteMany();

    for (const { pricing, ...performer } of performersData) {
        await prisma.performer.create({
            data: {
                ...performer,
                pricingTiers: {
                    create: pricing,
                },
            },
        });
    }

    console.log('Database seeded!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
