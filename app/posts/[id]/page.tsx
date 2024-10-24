// app/posts/[id]/page.tsx
import prisma from '@/lib/prisma';
import PostPage from './PostPage'; // Adjust the path if necessary

interface Params {
    id: string; // This is a string because it's a URL parameter
}


const Page = async ({ params }: { params: Params }) => {
    const { id } = await params;

    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(id, 10), // Convert to integer for the query
        },
    });

    if (!post) {
        return <div>Post not found</div>;
    }

    // Pass the fetched post to the Client Component
    return <PostPage post={post} />;
};

export default Page;
