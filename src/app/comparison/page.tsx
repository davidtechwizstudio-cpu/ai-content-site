import type { Metadata } from 'next';
import ComparisonPage from '@/components/comparison';
import './comparison.css';

export const metadata: Metadata = {
  title: 'ChatGPT vs Claude 2026 – Features, Pricing and Comparison',
  description:
    'Compare ChatGPT and Claude for coding, blogging, SEO, research, image generation, and productivity to find the right AI assistant.',
  alternates: { canonical: '/comparison/' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is ChatGPT better than Claude?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Neither is universally better. ChatGPT is the stronger all-in-one (images, voice, search, integrations), while Claude is often preferred for natural writing quality and long-document work.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is better for coding?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both are strong coders. ChatGPT excels at quick answers and many languages; Claude is excellent at reasoning through large codebases and long files.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is better for SEO writing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ChatGPT handles keyword-driven structures well, while Claude often produces more natural drafts. Many creators combine both.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can ChatGPT generate images?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. ChatGPT can create and edit images natively. Claude can analyze images but does not generate them.' },
    },
    {
      '@type': 'Question',
      name: 'Does Claude have a free plan?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, Claude offers a free web plan with usage limits, alongside paid plans.' },
    },
    {
      '@type': 'Question',
      name: 'Which is better for WordPress development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both can write PHP, generate templates and suggest plugin code. Always review generated code before deploying.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ComparisonPage />
    </>
  );
}
