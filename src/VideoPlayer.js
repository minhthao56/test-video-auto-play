/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
// import ViewabilityTrackingView from 'react-native-viewability-tracking-view';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {doPushIdVideoPlaying} from './store';

const VideoPlayer = ({index, paused, scroll, media}) => {
  const [isLoading, setIsLoading] = useState(true);
  //   const [paused, setPaused] = useState(true);
  const videoId = useSelector(state => state.id);

  // const [duration, setDuration] = useState(0);
  // const [currentTime, setCurrentTime] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const refView = useRef(null);
  const playVideo = () => {
    dispatch(doPushIdVideoPlaying(index));

    ref?.current.seek(0);
    ref.current.setNativeProps({
      paused: false,
    });

    // console.log(ref.current);

    // setPaused(false);
  };

  //   const onChange = isInterView => {
  //     if (isInterView) {
  //       onPress();
  //     }
  //   };

  const onLoad = data => {
    ref.current.seek(1);
    console.log('Done', data.duration);
    // refView.current.measure((x, y, width, height, pageX, pageY) => {
    //   console.log(pageY, index);
    // });
    setIsLoading(false);
  };
  const onLoadStart = data => {
    console.log('loading....');
    setIsLoading(true);
  };

  //   useEffect(() => {
  //     let interval = setInterval(() => {
  //       refView.current.measure((x, y, width, height, pageX, pageY) => {
  //         console.log(pageY);
  //       });
  //     }, 500);
  //   }, []);
  //   console.log(scroll);
  const pauseVideo = () => {
    ref.current.setNativeProps({
      paused: true,
    });
  };
  // const onViewabilityChange = useCallback(data => {
  //   // do something
  //   console.log(data);
  //   if (data.isInView) {
  //     playVideo();
  //   } else {
  //     pauseVideo();
  //   }
  // }, []);

  const onChange = visible => {
    console.log('visible', visible);
    if (visible) {
      playVideo();
    } else {
      pauseVideo();
    }
  };
  const onError = data => {
    console.log('error', data);
  };
  const onVideoLoadStart = () => {
    console.log('onVideoLoadStart');
  };
  const onVideoLoad = () => {
    console.log('onVideoLoadStart');
  };

  const onProgress = data => {
    console.log('onProgress', data.currentTime);
  };

  // const onPlaybackRateChange = () => {
  //   console.log('playing...');
  // };

  useEffect(() => {
    if (videoId !== index) {
      pauseVideo();
      console.log('index', index);
      console.log('videoId', videoId);
    }
  }, [index, videoId]);

  const url =
    'http://157.119.251.140:9669/Upload/NewsFeed/NewsFeed_8680/Video_NewsFeed_8680_c9d7da8f-aea8-4917-8232-8c777e10ee84.mp4';

  //   console.log(media && media[0].name);
  return (
    // <InView onChange={onChange}>
    // <ViewabilityTrackingView
    //   onViewabilityChange={onViewabilityChange}
    //   testID={index.toString()}
    //   isViewabilityTrackingEnabled={true}
    //   minimumViewTime={100}
    //   viewabilityMeasurementInterval={100}>
    <VisibilitySensor onChange={onChange}>
      <TouchableOpacity
        style={styles.backgroundVideo}
        onPress={playVideo}
        ref={refView}
        //   onLayout={e => onLayout(e, index)}
      >
        <Video
          source={{
            // uri: url,
            uri: media && media[0].name,
          }} // Can be a URL or a local file.
          ref={ref} // Store reference
          style={styles.backgroundVideo}
          resizeMode={'contain'}
          paused={paused}
          onLoad={onLoad}
          // onPlaybackRateChange={onPlaybackRateChange}
          // controls={true}
          onLoadStart={onLoadStart}
          onError={onError}
          onVideoLoadStart={onVideoLoadStart}
          onVideoLoad={onVideoLoad}
          onProgress={onProgress}
        />
      </TouchableOpacity>
      {isLoading && (
        <ActivityIndicator
          animating={true}
          size="large"
          style={{
            zIndex: 9999,
            elevation: 9999,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
          color="white"
        />
      )}
    </VisibilitySensor>

    // </ViewabilityTrackingView>

    // </InView>
  );
};

export default VideoPlayer;
var styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: 220,
    marginBottom: 100,
    position: 'relative',
    backgroundColor: 'black',
  },
});
