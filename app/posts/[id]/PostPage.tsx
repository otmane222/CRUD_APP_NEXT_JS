'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PostPageProps {
    post: {
        id: number;
        title: string;
        content: string;
    };
}

const PostPage = ({ post }: PostPageProps) => {
    const router = useRouter();
    
    const handleDelete = async () => {
        const confirmDelete = confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            try {
                console.log(post.id)
                const response = await fetch(`/api/posts/${post.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(post),
                });

                if (response.ok) {
                    router.push('/posts');
                } else {
                    throw new Error('Failed to delete post');
                }
            } catch (error) {
                console.error('Failed to delete post:', error);
                alert('Failed to delete post');
            }
        }
    };

    return (
        <div className="w-[50%] bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold text-gray-900">{post.title}</h2>
                <div className='flex justify-between'>
                    <Link href={`/posts/${post.id}/edit`}>
                        <button className='text-white bg-[#5e66ff] p-2 rounded-[5px]'>
                            edit
                        </button>
                    </Link>
                    <button 
                        onClick={handleDelete}
                        className='text-white bg-[#f54f4f] ml-3 p-2 rounded-[5px]'
                    >
                        delete
                    </button>
                </div>
            </div>
            <p className="mt-4 text-gray-600 line-clamp-3">
                {post.content || 'No content available for this post.'}
            </p>
        </div>
    );
};

export default PostPage;
