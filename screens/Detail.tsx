import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Share, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';
import Loader from '../components/Loader';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import styled from 'styled-components/native';
import { Movie, moviesApi, TV, tvApi } from '../api';
import { BLACK_COLOR, VERMILLAN_COLOR } from '../colors';
import Poster from '../components/Poster';
import { makeImgPath } from '../utils';

type RootStackParamList = {
  Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isMovie = 'original_title' in params;

  const { isLoading, data } = useQuery(
    [isMovie ? 'movies' : 'tv', params.id] as string[],
    isMovie ? moviesApi.detail : tvApi.detail
  );

  const shareMedia = async () => {
    const isAndroid = Platform.OS === 'android';
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}/`
      : data.homepage;

    if (isAndroid) {
      return await Share.share({
        // android => message only
        message: `${params.overview}\nCheck it out: ${homepage}`,
        title:
          'original_title' in params
            ? params.original_title
            : params.original_name,
      });
    }

    return await Share.share({
      // ios => url only
      url: homepage,
      title:
        'original_title' in params
          ? params.original_title
          : params.original_name,
    });
  };

  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name='share-outline' color='#949494' size={24} />
    </TouchableOpacity>
  );

  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV Show',
    });
  }, []);

  // header는 새로 리렌더 되지 않기 때문에 아래와 같이 추가 필요
  useEffect(() => {
    if (data) {
      setOptions({
        headerRight: () => <ShareButton />,
      });
    }
  }, [data]);

  const openYTLink = async (videoID: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoID}`;
    // 유튜브 어플(or 웹브라우저)로 연결할 경우 Linking 사용할 것
    // await Linking.openURL(baseUrl);
    // 웹 브라우저로 연결할 경우 WebBrowser 사용.
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || '') }}
        />
        <LinearGradient
          colors={['transparent', BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ''} />
          <Title>
            {'original_title' in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        <Border />
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video: { key: string; name: string }) => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name='logo-youtube' color={VERMILLAN_COLOR} size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
};

export default Detail;

const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px 10px 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;
const Title = styled.Text`
  color: #1e272e;
  background-color: white;
  opacity: 0.6;
  font-size: 36px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;
const Overview = styled.Text`
  color: #1e272e;
  margin: 20px 0px;
  padding: 15px;
  background-color: white;
  opacity: 0.6;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

const Data = styled.View`
  padding: 0px 20px;
`;

const Border = styled.View`
  margin-bottom: 15px;
  border-width: 1px;
  border-bottom-color: ${({ theme }) => theme.textColor};
`;
