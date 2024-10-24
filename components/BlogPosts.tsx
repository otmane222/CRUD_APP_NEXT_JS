import Link from "next/link";

interface Post {
    id: number;
    title: string;
    content: string | null;
}

interface BlogPostsProps {
    posts: Post[];
}

const BlogPosts: React.FC<BlogPostsProps> = ({ posts }) => {
    return (
        <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Blogg Posts</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
            <div
            key={post.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
            >
            <h2 className="text-2xl font-semibold text-gray-900">{post.title}</h2>
            <p className="mt-4 text-gray-600 line-clamp-3">
                {post.bio || 'No content available for this post.'}
            </p>
            <div className="mt-4">
                <button className="text-blue-500 hover:text-blue-600 font-medium">
                    <Link
                        href={`posts/${post.id}`}
                    >
                        Read more →
                    </Link>
                </button>
            </div>
            </div>
        ))}
        </div>
    </div>
    );
};

export default BlogPosts;
