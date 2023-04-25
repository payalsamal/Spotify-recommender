// component.ts
import { Component } from '@angular/core';
import {
  searchSongByTrackAndArtist,
  getSpotifyAccessToken,
  getRecommendedSongsFromTracks,
  searchSongByArtists,
  getRecommendedSongsFromArtists,
} from 'src/app/services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  artist: string = '';
  song: string = '';
  artist1: string = '';
  artist2: string = '';
  artist3: string = '';
  recommendations: any[] = [];

  fetchRecommendedTracksBySongAndArtist() {
    const artistInput = document.getElementById(
      'artist-input'
    ) as HTMLInputElement;
    const songInput = document.getElementById('song-input') as HTMLInputElement;
    getSpotifyAccessToken().then((accessToken) => {
      searchSongByTrackAndArtist(accessToken, this.song, this.artist).then(
        (song) => {
          if (artistInput!.value === '' || songInput!.value === '') {
            alert(
              `Please enter a song and artist ; Search song: Toxic ; Artist: Britney Spears`
            );
            return;
          } else {
            getRecommendedSongsFromTracks(accessToken, song.id).then(
              (recommendedSongs) => {
                console.log(recommendedSongs);
                const recommendedSongsByTrackAndArtistDiv =
                  document.getElementById(
                    'recommended-songs-by-track-and-artist'
                  );
                recommendedSongsByTrackAndArtistDiv!.innerHTML = '';

                for (let i = 0; i < 3; i++) {
                  const songLink = document.createElement('a');
                  const songElement = document.createElement('p');
                  songLink.href = recommendedSongs[i].external_urls.spotify;
                  songLink.target = '_blank';
                  songElement.className =
                    'p-1 border-2 border-black hover:bg-gray-200';

                  songElement.innerHTML = recommendedSongs[i].name;
                  recommendedSongsByTrackAndArtistDiv!.appendChild(songLink);
                  songLink!.appendChild(songElement);
                }
              }
            );
          }
        }
      );
    });
  }

  fetchRecommendedTracksByArtists() {
    const artist1Input = document.getElementById(
      'artist1-input'
    ) as HTMLInputElement;
    const artist2Input = document.getElementById(
      'artist2-input'
    ) as HTMLInputElement;
    const artist3Input = document.getElementById(
      'artist3-input'
    ) as HTMLInputElement;
    getSpotifyAccessToken().then((accessToken) => {
      searchSongByArtists(
        accessToken,
        this.artist1,
        this.artist2,
        this.artist3
      ).then(([artist1, artist2, artist3]) => {
        if (
          artist1Input!.value === '' ||
          artist2Input!.value === '' ||
          artist3Input!.value === ''
        ) {
          alert(
            `Please enter 3 artists ; Search artist: Britney Spears ; Artist 2: Justin Timberlake ; Artist 3: Backstreet Boys`
          );
          return;
        } else {
          getRecommendedSongsFromArtists(accessToken, [
            artist1.id,
            artist2.id,
            artist3.id,
          ]).then((recommendedSongs) => {
            console.log('recommendedSongs', recommendedSongs);
            const recommendedSongsByArtistsDiv = document.getElementById(
              'recommended-songs-by-artists'
            );
            recommendedSongsByArtistsDiv!.innerHTML = '';

            for (let i = 0; i < 3; i++) {
              // const songLink = document.createElement('a');
              const songElement = document.createElement('p');
              // songLink.href = recommendedSongs[i].external_urls.spotify;
              // songLink.target = '_blank';
              songElement.className =
                'p-1 border-2 border-black hover:bg-gray-200';

              songElement.innerHTML = recommendedSongs[i].name;
              recommendedSongsByArtistsDiv!.appendChild(songElement);
              // songLink!.appendChild();
            }
          });
        }
      });
    });
  }
}
