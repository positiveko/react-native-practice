import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Movie, TV } from '../api';
import { VERMILLAN_COLOR } from '../colors';
import VMedia from './VMedia';

interface HListProps {
  title: string;
  data: (Movie | TV)[];
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

const HList: React.FC<HListProps> = ({
  title,
  data,
  onEndReached,
  onEndReachedThreshold = 0.4,
}) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={HListSeparator}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      keyExtractor={(item) => item.id + ''}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path ?? ''}
          originalTitle={(item as Movie).original_title ?? (item as TV).original_name}
          voteAverage={item.vote_average}
          fullData={item}
        />
      )}
    />
  </ListContainer>
);

export default HList;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: ${({ theme }) => theme.textColor};
  text-decoration: underline;
  text-decoration-color: ${VERMILLAN_COLOR};
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;
