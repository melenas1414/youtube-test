const { google } = require('googleapis');
const apiKey = 'AIzaSyD-60Y3mmhUBn-W1SpV2odNlEDsu-RdRog'; // Reemplaza con tu propia clave de API

const youtube = google.youtube({
  version: 'v3',
  auth: apiKey,
});

async function obtenerDatosChannel() {
  try {
    const response = await youtube.channels.list({
        part: 'id,snippet,topicDetails,statistics,status',
        forUsername: 'realmadridcf',
    });

    const channels = response.data.items;
    console.log(channels);

    const response2 = await youtube.search.list({
        part: 'id',
        channelId: channels[0].id,
        maxResults: 50,
        order: 'date',
    });
    console.log(response2.data.items);
    const videos = [];
    for (let i = 0; i < response2.data.items.length; i++) {
        const video = response2.data.items[i];
        const idVideo = video.id.videoId;
        const response3 = await youtube.videos.list({
            part: 'statistics',
            id: idVideo,
          });
        videos.push({
            id: idVideo,
            statistics: response3.data.items[0].statistics
        });
        
    }
    
    // save videos into file json
    const fs = require('fs');
    fs.writeFileSync('videos.json', JSON.stringify(videos));

    // if (video) {
    //     console.log(video);
    //   const likes = video.statistics.likeCount;
    //   const impresiones = video.statistics.viewCount;

    //   console.log(`Likes: ${likes}, Impresiones: ${impresiones}`);
    // } else {
    //   console.log('Video no encontrado');
    // }
  } catch (error) {
    console.error('Error al obtener datos del video:', error.message);
  }
}
async function obtenerDatosVideo(idVideo) {
    try {
      const response = await youtube.videos.list({
        part: 'statistics',
        id: idVideo,
      });
  
      const video = response.data.items[0];
      if (video) {
        const likes = video.statistics.likeCount;
        const impresiones = video.statistics.viewCount;
  
        console.log(`Likes: ${likes}, Impresiones: ${impresiones}`);
      } else {
        console.log('Video no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener datos del video:', error.message);
    }
  }

const videoId = 'PiWJWfzVwjU'; // Reemplaza con el ID del video de YouTube
obtenerDatosVideo(videoId);