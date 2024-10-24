// 'use client'; // Add this line to mark the component as a client component

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// const EditPostPage = () => {
//     const router = useRouter();
//     const { id } = router.query; // Get the post ID from the URL
//     const [post, setPost] = useState({ title: '', content: '' });
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchPost = async () => {
//             if (id) { // Only fetch the post if id exists
//                 const response = await fetch(`/api/posts/${id}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setPost(data);
//                 } else {
//                     console.error('Failed to fetch post');
//                 }
//                 setLoading(false);
//             }
//         };
//         fetchPost();
//     }, [id]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const response = await fetch(`/api/posts/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(post),
//         });

//         if (response.ok) {
//             router.push(`/posts/${id}`); // Redirect to the post page after editing
//         } else {
//             console.error('Failed to update post');
//         }
//     };

//     if (loading) return <p>Loading...</p>;

//     return (
//         <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4">
//             <h2 className="text-2xl mb-4">Edit Post</h2>
//             <div className="mb-4">
//                 <label className="block mb-2" htmlFor="title">Title</label>
//                 <input
//                     type="text"
//                     id="title"
//                     value={post.title}
//                     onChange={(e) => setPost({ ...post, title: e.target.value })}
//                     className="w-full p-2 border rounded"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block mb-2" htmlFor="content">Content</label>
//                 <textarea
//                     id="content"
//                     value={post.content}
//                     onChange={(e) => setPost({ ...post, content: e.target.value })}
//                     className="w-full p-2 border rounded"
//                     rows={5}
//                 />
//             </div>
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//                 Save Changes
//             </button>
//         </form>
//     );
// };

// export default EditPostPage;
