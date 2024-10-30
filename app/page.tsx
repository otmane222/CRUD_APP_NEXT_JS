// import prisma from '@/lib/prisma';
// import BlogPosts from '@/components/BlogPosts';
import Link from 'next/link';

const Home = async () => {
  // const posts = await prisma.post.findMany();

  return (
    <div className='flex w-full h-[150px] items-center justify-center'>

      <Link
            href="/posts"
            className=" bg-slate-400 rounded-[5px] p-[20px]"
            >
      Go To posts
      </Link>
    </div>
  );
};

export default Home;


