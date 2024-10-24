import prisma from '@/lib/prisma';
import BlogPosts from '@/components/BlogPosts';

const Home = async () => {
    const posts = await prisma.post.findMany();

    return (
        <div>
            <BlogPosts posts={posts} />
        </div>
    );
};

export default Home;