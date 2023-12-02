const config = {
  channelID: "UCH-_hzb2ILSCo9ftVSnrCIQ", //Yogs channel ID
  youtubeApiKey: 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8', // Youtube's own public api key, hasn't changed for ages, don't worry 
  parentDomain: process.env.NODE_ENV === 'production' ? 'sephoxx.github.com' : 'localhost',
}

export default config;