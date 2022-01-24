import React from 'react';
import Loadable from 'react-loadable';
import PreloadWidget from 'Components/PreloadLayout/PreloadWidget';

const MyLoadingComponent = () => (
   <PreloadWidget />
)

const SocialFeedsWidget = Loadable({
   loader: () => import("./SocialFeeds"),
   loading: MyLoadingComponent
})


const SessionSlider = Loadable({
   loader: () => import("./SessionSlider"),
   loading: MyLoadingComponent
})

export {
   SocialFeedsWidget,
   SessionSlider
}