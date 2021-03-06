import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {aniEpisodeRequest} from '../redux/AnimeEpisodes';

import {FilmCard} from '../components/FilmCard';

import AnimeServers from '../components/AnimeServers';

import Loader from '../components/Loader';
import axios from 'axios';
import cheerio from 'cheerio-without-node-native';
import {Text} from 'react-native-paper';
function EpisodesAllList(props) {
  const [epsHref, setEpsHref] = useState([]);
  const [animeHrefLink, setAnimeHrefLink] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(2);

  const _loadAnime = () => {
    props.aniEpisodeRequest(page);
    setPage(page + 1);
  };

  const getEpsServers = async link => {
    setShowModal(true);
    axios({
      method: 'get',
      url: link,
    })
      .then(response => {
        if (response.status === 200) {
          const htmlString = response.data; // get response text
          const $ = cheerio.load(htmlString); // parse HTML string
          href = [];
          $('.embed-player-tabs .nav.nav-tabs  li').map((_, elm) => {
            href.push({text: $(elm).text(), link: $(elm).attr('hrefa')});
            /* console.log("lala",$('a', elm).attr('href')) */
          });

          if (href.length <= 0) {
            console.log('count2', href.length);
            $('.episode-videoplay ul li').map((_, elm) => {
              href.push({text: $(elm).text(), link: $(elm).attr('data-href')});
            });
          }
          const animeHrefLink = $('.col-md-4.col-no-padding-right a').attr(
            'href',
          );

          setEpsHref(href);
          setAnimeHrefLink(animeHrefLink);
        }
      })
      .catch(error => {
        error;
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.animeEpisodes}
        style={styles.FlatList}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) =>
          item.img && (
            <FilmCard
              showTitle={true}
              item={item}
              navigate={() => getEpsServers(item.link)}
            />
          )
        }
        numColumns={2}
        ListFooterComponent={() => {
          if (!props.fetching) {
            return null;
          }
          return <Loader />;
        }}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          _loadAnime();
        }}
      />
      {props.fetching && <Loader />}

      <AnimeServers
        animeHrefLink={animeHrefLink}
        hide={() => setShowModal(false)}
        epsHref={epsHref}
        showModal={showModal}
        navigation={props.navigation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  FlatList: {},
});

const mapStateToProps = state => {
  return {
    animeEpisodes:
      state.animeEpisodes && state.animeEpisodes.payload
        ? state.animeEpisodes.payload
        : [],
    fetching: state.animeEpisodes.fetching,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    aniEpisodeRequest: data => dispatch(aniEpisodeRequest(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EpisodesAllList);
