import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components/native';
import { moviesApi, tvApi } from '../api';
import HList from '../components/HList';
import Loader from '../components/Loader';

const Search = () => {
  const [query, setQuery] = useState('');

  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
    fetchNextPage: fetchNextMoviesPage,
  } = useInfiniteQuery(['searchMovies', query], moviesApi.search, {
    enabled: false,
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
    fetchNextPage: fetchNextTvPage,
  } = useInfiniteQuery(['searchTv', query], tvApi.search, {
    enabled: false,
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const onChangeText = (text: string) => setQuery(text);

  const onSubmit = () => {
    if (query === '') {
      return;
    }
    searchMovies();
    searchTv();
  };

  const loadMoviesMore = () => {
    fetchNextMoviesPage();
  };
  const loadTvMore = () => {
    fetchNextTvPage();
  };

  return (
    <Container>
      <SearchBar
        placeholder='Search for Movie or TV Show'
        placeholderTextColor='grey'
        returnKeyType='search'
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HList
          onEndReached={loadMoviesMore}
          title='Movie Results'
          data={moviesData.pages.map((page) => page.results).flat()}
        />
      ) : null}
      {tvData ? (
        <HList
          onEndReached={loadTvMore}
          title='TV Results'
          data={tvData.pages.map((page) => page.results).flat()}
        />
      ) : null}
    </Container>
  );
};
export default Search;

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  width: 90%;
  margin: 20px auto 40px auto;
  padding: 13px 15px;
  border: black;
  border-width: 1.2px;
  border-radius: 15px;
  background-color: #e6e6e6;
`;
