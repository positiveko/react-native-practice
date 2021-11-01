import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Poster from './Poster';
import Votes from './Votes';
import { Movie, TV } from '../api';
import { StackScreenProp } from '../navigation/Root';

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: Movie | TV;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
  fullData,
}) => {
  const navigation = useNavigation<StackScreenProp>();
  const goToDetail = () => {
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        ...fullData,
      },
    });
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster path={posterPath} />
        <Title>
          {originalTitle.slice(0, 12)}
          {originalTitle.length > 12 ? '...' : null}
        </Title>
        <Votes votes={voteAverage} />
      </Container>
    </TouchableOpacity>
  );
};

export default VMedia;

const Container = styled.View`
  align-items: center;
  color: ${({ theme }) => theme.textColor};
`;

const Title = styled.Text`
  background-color: ${({ theme }) => theme.highlightColor};
  color: #1e272e;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
