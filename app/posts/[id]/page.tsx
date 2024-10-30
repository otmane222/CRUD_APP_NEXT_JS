
import prisma from '@/lib/prisma';
import PostPage from './PostPage';

interface Params {
    id: string;
}


const Page = async ({ params }: { params: Params }) => {
    const { id } = await params;

    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(id, 10),
        },
    });

    if (!post) {
        return <div>Post not found</div>;
    }


    return <PostPage post={post} />;
};

export default Page;
