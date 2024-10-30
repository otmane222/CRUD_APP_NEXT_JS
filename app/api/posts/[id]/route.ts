
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const {id} = params;

    try {
        const postId = parseInt(id, 10);
        if (isNaN(postId)) {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        const deletedPost = await prisma.post.delete({
            where: { id: postId },
        });

        return NextResponse.json(deletedPost, { status: 200 });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Post not found or could not be deleted' }, { status: 404 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { title, bio, content } = await request.json();

        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id, 10) },
            data: { title, bio, content },
        });
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

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id, 10) },
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error('Error fetching post:', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}