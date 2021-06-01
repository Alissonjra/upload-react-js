import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type IDataRequestProps = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
};

interface IRequest {
  data: Array<IDataRequestProps>;
  after: string;
}

export default function Home(): JSX.Element {
  const getImages = async ({ pageParam = 0 }): Promise<IRequest> => {
    const response = await api.get(`/api/images`, {
      params: {
        after: pageParam,
      },
    });
    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', getImages, {
    getNextPageParam: result => {
      const { after } = result;
      if (after) {
        return after;
      }
      return null;
    },
  });

  const formattedData = useMemo(() => {
    if (data) {
      return data.pages.map(page => page.data).flat(2);
    }

    return null;
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) {
    return <Loading />;
  }

  // TODO RENDER ERROR SCREEN
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button mt="32px" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}
