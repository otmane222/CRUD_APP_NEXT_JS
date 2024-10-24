import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust this path according to your prisma setup

export async function POST(request: Request) {
try {
    const { title, bio, content } = await request.json();

    // Validate the input (e.g., title, bio length)
    if (title.length > 100) {
    return NextResponse.json({ error: 'Title must be 100 characters or less' }, { status: 400 });
    }
    if (title.length < 3) {
    return NextResponse.json({ error: 'Title must be 3 characters or more' }, { status: 400 });
    }

    if (bio.length > 110) {
        return NextResponse.json({ error: 'Bio must be 110 characters or less' }, { status: 400 });
    }
    if (bio.length < 10) {
        return NextResponse.json({ error: 'Bio must be 10 characters or more' }, { status: 400 });
    }
    if (content.length < 50) {
        return NextResponse.json({ error: `content must be 50 characters or more , num of your char[${content.length}]` }, { status: 400 });
    }

    // Create a new post using Prisma
    const newPost = await prisma.post.create({
    data: {
        title,
        bio,
        content,
    },
    });

    return NextResponse.json(newPost, { status: 201 });
} catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
}
}
