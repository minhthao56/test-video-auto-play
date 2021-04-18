/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import VideoPlayer from './VideoPlayer';

const MainApp = () => {
  //   const data = [1, 2, 3, 2, 3, 1, 2, 123];

  const [newsFeedsState, setNewsFeedsState] = useState([]);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI4NDkiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IjAzNjQ1NzA5MDgiLCJhdXRobWV0aG9kIjoiMjVkNTVhZDI4M2FhNDBhZjQ2NGM3NmQ3MTNjN2FkIiwicm9sZSI6IjAiLCJuYmYiOjE2MTczMzI0MjEsImV4cCI6MTY0ODg2ODQyMSwiaWF0IjoxNjE3MzMyNDIxfQ.hbBY61BdGqpjRcBrUgg7-yvyAfzsevfTNlefoSzpDAg';
  useEffect(() => {
    axios
      .get(
        'http://157.119.251.140:8899/api/PostNewsFeed/GetAllNewsFeed?currentpage=0&currentdate=2021-04-17%2023%3A00%3A00&limit=20&groupid=0&isVideo=1&suggestGroup=0&forFriendId=0&albumid=0',
        {
          headers: {'content-type': 'application/json', Authorization: token},
        },
      )
      .then(res => {
        const newsFeeds = res.data.content.newsFeeds;
        setNewsFeedsState(newsFeeds);
      });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={newsFeedsState}
        renderItem={({item, index}) => {
          return (
            <VideoPlayer index={index} paused={true} media={item.mediaPlays} />
          );
        }}
        keyExtractor={(item, i) => i.toString()}
        // onScroll={onScroll}
      />
    </SafeAreaView>
  );
};

export default MainApp;
