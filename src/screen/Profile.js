import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";

import { auth, db } from '../../config/firebase';
import useAuthentication from "../../utils/hooks/useAuthentication";

import Fonts from '../../constant/Fonts';
import Colors from '../../constant/Colors';

import Home from './Home';
import MovieItem from '../../components/MovieItem';

const Profile = () => {
    const { user } = useAuthentication();
    const [favourites, setFavourites] = useState([]);
    const viewShot = useRef();

    const userFavReference = db.ref('/users/'+auth.currentUser.uid+'/fav-list');

    const userImage = require('../../assets/user_mock.png');

    useEffect(() => {
        getFavMovie();
    }, []);

    const getFavMovie = async () => {     
        try {
          db.ref('/users/'+auth.currentUser.uid+'/fav-list').on('value', (snapshot) => {
            let newFav = [];
            snapshot.forEach((movieSnapshot) => {
              // console.log(movieSnapshot.val().movieObject);
              // newFav = favourites.concat(movieSnapshot.val().movieObject);
              // newFav.push({
              //   ...movieSnapshot.val().movieObject,
              //   key: movieSnapshot.val().movieObject.id
              // })
              const movieObject = movieSnapshot.val().movieObject;
              newFav.push({
                id: movieObject.id,
                movie: movieObject,
                poster: movieObject.poster_path,
                rating: movieObject.vote_average
              })
              
              // console.log(newFav);
              // setFavourites((oldArr) => oldArr.concat(movieSnapshot.val().movieObject));
            })
            setFavourites(newFav);
          });
        } catch(err) {
          console.log('error: ' + err);
        }
        
    }
    const removeFavouriteMovie = async (movie) => {
        // const newFavouriteList = favourites.filter(
        //   (favourite) => favourite.id !== movie.id
        // );
        try {
            db.ref('/users/'+auth.currentUser.uid+'/fav-list').on('value', (snapshot) => {
                snapshot.forEach((movieSnapshot) => {
                    if (movieSnapshot.val().movieObject.id === movie.id) {
                        // movieSnapshot.val().remove();
                        db.ref('/users/'+auth.currentUser.uid+'/fav-list/'+movieSnapshot.key+'').remove();
                    }
                });
            });
        } catch(err) {
            console.log('remove error: ' + err);
        }

  
      };
    const fullHeart = () => {
        return <MaterialCommunityIcons name='heart' color={Colors.Pink} size={22} />
    };
  
    const renderItemFavourite = ({ item }) => (
      // console.log(item);
      <MovieItem 
          movie={item.movie}
          poster={`https://image.tmdb.org/t/p/original/` + item.poster} 
          rating={item.rating} 
          heartIcon={fullHeart}
          handleFavouritesClick={removeFavouriteMovie}
      />
    );

    const captureAndShareScreenshot = () => {
        viewShot.current.capture().then((uri) => {
            console.log("do something with ", uri);
            Sharing.shareAsync("file://" + uri);
        }),
        (error) => console.error("Oops, snapshot failed", error);
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Image source={userImage} style={styles.userImage} />
                <View style={styles.wrapper}>
                    <Text style={styles.emailText}>Email: {user?.email}</Text>
                    <Button title="Sign Out" titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={() => auth.signOut()} />
                </View>
            </View>
            <ViewShot 
                ref={viewShot}
                options={{ 
                    // width: 1080,
                    // height: 1920,
                    format: "jpg", 
                    quality: 0.9 
                }}
                style={styles.viewShotStyle}
                >
                <View style={styles.movieSectionContainer}>
                    <View style={styles.sectionHeading}>
                        <Text style={styles.favText}>Your Favourite Movies</Text>
                        <TouchableOpacity
                        style={styles.shareIcon}
                        onPress={captureAndShareScreenshot}
                        >
                        <Ionicons name='ios-share' size={24} color={Colors.White} />
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                        data={favourites}
                        renderItem={renderItemFavourite}
                        keyExtractor={item => item.id}
                        style={styles.flatListStyle}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ViewShot>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.White,
    },
    topContainer: {
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-evenly',
        marginTop: 40
    },
    userImage: {
        resizeMode: 'contain',
        width: 80,
        height: 80
    },
    wrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    emailText: {
        fontFamily: Fonts.HelveticaNeueBold,
        fontSize: 12
    },
    button: {
        backgroundColor: Colors.Red,
        marginVertical: 10
    },
    buttonText: {
        fontFamily: Fonts.HelveticaNeueBold,
        color: Colors.White,
        fontSize: 16
    },
    movieSectionContainer: {
        // flexShrink: 1,
        // marginVertical: 10,
        width: '100%',
        borderRadius: 10,
    },
    sectionHeading: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: Colors.Pink,
        marginHorizontal: 10,
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    favText: {
        fontSize: 16,
        fontFamily: Fonts.HelveticaNeueBold,
        color: Colors.White,
    },
    shareIcon: {

    },
    viewShotStyle: {
        backgroundColor: Colors.White,
        borderRadius: 10,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.22,
        // shadowRadius: 2.22,

        // elevation: 3,
    },
    flatListStyle: {
        // flexGrow: 1,
        // flexShrink: 1,
        flex: 0,
        height: '78%',
        paddingBottom: 60
        
    },
})

export default Profile;