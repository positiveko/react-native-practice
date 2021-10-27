import React from 'react';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({
  navigation: { navigate },
}) => (
  <Btn onPress={() => navigate('Stack', { screen: 'Three' })}>
    <Title>Movies</Title>
  </Btn>
);

export default Movies;

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;
