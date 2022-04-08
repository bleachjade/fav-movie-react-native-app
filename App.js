import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';

import MovieList from './components/MovieList';
import MovieItem from './components/MovieItem';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

import Fonts from './constant/Fonts';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
		// const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8ee246b7`;
    const url = `https://api.themoviedb.org/3/search/multi?query=${searchValue}&api_key=fea3b43a64464cf1684d3af17b0312a2&language=en-US&page=1`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.results) {
			setMovies(responseJson.results);
		}
	};

  const getPopularMovie = async () => {
		const url = `https://api.themoviedb.org/3/discover/movie?api_key=fea3b43a64464cf1684d3af17b0312a2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.results) {
			setPopularMovies(responseJson.results);
		}
	};

  useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

  useEffect(() => {
		getPopularMovie();
	}, []);

  const renderItem = ({ item }) => (
    <MovieItem poster={`https://image.tmdb.org/t/p/original/` + item.poster_path} />
  );

  const renderPopularItem = ({ item }) => (
    <MovieItem poster={`https://image.tmdb.org/t/p/original/` + item.poster_path} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <MovieListHeading heading='Fav Movie' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.movieSectionContainer}>
          <Text style={styles.sectionHeading}>Searched Movie</Text>
          <FlatList 
            data={movies}
            refreshing={isRefreshing}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
            extraData={searchValue}
            style={styles.flatListStyle}
          />
        </View>
        <View style={styles.movieSectionContainer}>
          <Text style={styles.sectionHeading}>Popular Movie</Text>
          <FlatList 
            data={popularMovies}
            refreshing={isRefreshing}
            renderItem={renderPopularItem}
            keyExtractor={item => item.id}
            horizontal={true}
            style={styles.flatListStyle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15
  },
  bodyContainer: {
    padding: 0
  },
  movieSectionContainer: {
    flexShrink: 1
  },
  sectionHeading: {
    fontSize: 16,
    fontFamily: Fonts.HelveticaNeue,
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  flatListStyle: {
    flexGrow: 0
  },
});

export default App;
