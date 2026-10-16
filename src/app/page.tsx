import type { Metadata } from 'next';
import { getAllBlogs } from '@/lib/blogs';
import HomeClient from '@/components/home';

export const metadata: Metadata = {
  description:
    'Explore the latest AI tools, practical tutorials, automation workflows, and expert guides to work smarter with AI.',
};

export default function Home() {
  const blogs = getAllBlogs();
  return <HomeClient blogs={blogs} />;
}
