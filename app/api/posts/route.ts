import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
try {
    const { title, bio, content } = await request.json();


    if (title.length > 100) {
    return NextResponse.json({ error: 'Title must be 100 characters or less' }, { status: 400 });
    }

    if (bio.length > 255) {
    return NextResponse.json({ error: 'Bio must be 255 characters or less' }, { status: 400 });
    }
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
