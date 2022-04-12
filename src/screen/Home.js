import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';

import MovieList from '../../components/MovieList';
import MovieItem from '../../components/MovieItem';
import MovieListHeading from '../../components/MovieListHeading';
import SearchBox from '../../components/SearchBox';
import FadeInView from '../../components/FadeInView';

import Fonts from '../../constant/Fonts';
import Colors from '../../constant/Colors';

import useAuthentication from "../../utils/hooks/useAuthentication";
import { auth, db } from '../../config/firebase';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [nowShowingMovies, setNowShowingMovies] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);
  const [likeIcon, setLikeIcon] = useState(() => () => {});

  const { user } = useAuthentication([]);
  const userFavReference = db.ref('/users/'+auth.currentUser.uid+'/fav-list');

  // DatabaseReference database = FirebaseDatabase.getInstance('https://vax-in-60807-default-rtdb.asia-southeast1.firebasedatabase.app').getReference();

  // const [currentDate, setCurrentDate] = useState('');
  // const [lastMonthDate, setLastMonthDate] = useState('');
  // const [nextMonthDate, setNextMonthDate] = useState('');
  let lastMonthDate = moment()
            .utcOffset('+07:00')
            .subtract(30, 'days')
            .format('YYYY-MM-DD');
  let currentDate = moment()
            .utcOffset('+07:00')
            .format('YYYY-MM-DD');


  const getMovieRequest = async (searchValue) => {
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
    const getNowShowingMovie = async () => {
		const url = `https://api.themoviedb.org/3/discover/movie?api_key=fea3b43a64464cf1684d3af17b0312a2&language=en-US&primary_release_date.gte=`+lastMonthDate+`&primary_release_date.lte=`+currentDate+``;
		// const url = `https://api.themoviedb.org/3/discover/movie?api_key=fea3b43a64464cf1684d3af17b0312a2&language=en-US&primary_release_date.gte=2022-03-10&primary_release_date.lte=2022-04-09`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.results) {
			setNowShowingMovies(responseJson.results);
		}
	};

    const addFavouriteMovie = (movie) => {
      // const newFavouriteList = [...favourites, movie];
      //     // console.log(newFavouriteList);
      // setFavourites(newFavouriteList);

      userFavReference
        .push({
          'movieObject': movie
        })
        .then(() => console.log('Data updated.'));
      // console.log(userFavReference);
    // setLikeIcon(fullHeart());
        // saveToLocalStorage(newFavouriteList);
	};
    
    const outlineHeart = () => {
        return <MaterialCommunityIcons name='heart-outline' color={Colors.Pink} size={22} />
        
    };


  useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

  useEffect(() => {
    getNowShowingMovie();
    getPopularMovie();
	}, []);

  const renderItem = ({ item }) => (
    <MovieItem 
        movie={item}
        poster={`https://image.tmdb.org/t/p/original/` + item.poster_path} 
        rating={item.vote_average} 
        heartIcon={outlineHeart}
        handleFavouritesClick={addFavouriteMovie}
    />
  );

  let searchSection = () => {
    return (
      <></>
    )
  }

  if (searchValue) {
    searchSection = () => {
      return (
        <View style={styles.movieSectionContainer}>
          <Text style={styles.sectionHeading}>Searched Result</Text>
          <FlatList 
            data={movies}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
            extraData={searchValue}
            style={styles.flatListStyle}
          />
        </View>
      )
    }
  }
  // console.log(favourites);
//   console.log(nowShowingMovies);

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.headerContainer}>
        <MovieListHeading heading='Fav Movie' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </FadeInView>
      <ScrollView>
        <View style={styles.bodyContainer}>
          
            {/* Search Section */}
            {searchSection()}
            {/* Popular Section */}
            <View style={styles.movieSectionContainer}>
                <Text style={styles.sectionHeading}>Popular Movie</Text>
                <FlatList 
                    data={popularMovies}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    style={styles.flatListStyle}
                />
            </View>
            {/* Now Showing Section */}
            <View style={styles.movieSectionContainer}>
                <Text style={styles.sectionHeading}>Now Showing</Text>
                <FlatList 
                    data={nowShowingMovies}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    style={styles.flatListStyle}
                />
            </View>
        </View>
      </ScrollView>
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
      padding: 15,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
  
      elevation: 2,
      borderBottomWidth: 0.2,
      borderBottomColor: '#ebebeb',
      marginBottom: 8
    },
    bodyContainer: {
      padding: 0,
      paddingBottom: 50
    },
    movieSectionContainer: {
      flexShrink: 1
    },
    sectionHeading: {
      fontSize: 16,
      fontFamily: Fonts.HelveticaNeue,
      paddingHorizontal: 15,
      paddingVertical: 10
    },
    flatListStyle: {
      flexGrow: 0
    },
  });

export default Home;