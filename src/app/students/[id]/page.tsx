import Student from '@/components/Students/Student';
import Page from '@/components/layout/Page/Page';
import { type Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Студент - Вэб разработка ВКИ - Next.js шаблон',
  description: 'Шаблон для веб-разработки с использованием Next.js, React Hook Form, Yup, SCSS, Eslint, TanStack Query (React Query)',
};

const StudentPage = (): React.ReactNode => (
  <Page>
    <Student />
  </Page>
);

export default StudentPage;

