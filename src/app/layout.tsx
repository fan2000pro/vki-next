import { dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import 'reflect-metadata';
import TanStackQuery from '@/containers/TanStackQuery';
import queryClient from '@/api/reactQueryClient';
import { getGroupsApi } from '@/api/groupsApi';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import Main from '@/components/layout/Main/Main';

import type { Metadata } from 'next';

import '@/styles/globals.scss';
import { META_DESCRIPTION, META_TITLE } from '@/constants/meta';
import { getStudentsApi } from '@/api/studentsApi';
import { verifyAccessToken } from '@/utils/jwt';

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>): Promise<React.ReactElement> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;

  const userFromServer = verifyAccessToken(accessToken);

  // выполняется на сервере - загрузка студентов
  await queryClient.prefetchQuery({
    queryKey: ['students'],
    queryFn: getStudentsApi,
  });

  // выполняется на сервере - загрузка групп
  await queryClient.prefetchQuery({
    queryKey: ['groups'],
    queryFn: getGroupsApi,
  });

  // дегидрация состояния
  const state = dehydrate(queryClient, { shouldDehydrateQuery: () => true });

  return (
    <TanStackQuery state={state}>
      <html lang="ru">
        <body>
          <Header
            userFromServer={userFromServer}
          />
          <Main>
            <>{children}</>
          </Main>
          <Footer />
        </body>
      </html>
    </TanStackQuery>
  );
};

export default RootLayout;