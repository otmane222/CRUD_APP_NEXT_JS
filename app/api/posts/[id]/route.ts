// app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params; // Get the ID from the route parameters

    try {
        // Validate the ID (optional)
        const postId = parseInt(id, 10);
        if (isNaN(postId)) {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        // Delete the post from the database
        const deletedPost = await prisma.post.delete({
            where: { id: postId },
        });

        // Respond with the deleted post
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

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        // Fetch the post with the specified ID
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