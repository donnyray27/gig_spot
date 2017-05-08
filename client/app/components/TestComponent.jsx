import React, {Component} from 'react'
import SpotifyObject from './SpotifyObject'
class TestComponent extends Component{
  constructor(props){
    super(props)
    this.state = {
      query: '',
      results: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSearchQuery = this.handleSearchQuery.bind(this)
    this.isEmpty = this.isEmpty.bind(this)
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  componentWillMount(){
    this.setState({
      results: {
  "tracks": {
    "href": "https://api.spotify.com/v1/search?query=yesterday&type=track&offset=0&limit=20",
    "items": [
      {
        "album": {
          "album_type": "single",
          "artists": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/5YNgVaI5vgMjBLel7QShBe"
              },
              "href": "https://api.spotify.com/v1/artists/5YNgVaI5vgMjBLel7QShBe",
              "id": "5YNgVaI5vgMjBLel7QShBe",
              "name": "LUCHS",
              "type": "artist",
              "uri": "spotify:artist:5YNgVaI5vgMjBLel7QShBe"
            }
          ],
          "available_markets": [
            "AD",
            "AR",
            "AT",
            "AU",
            "BE",
            "BG",
            "BO",
            "BR",
            "CA",
            "CH",
            "CL",
            "CO",
            "CR",
            "CY",
            "CZ",
            "DE",
            "DK",
            "DO",
            "EC",
            "EE",
            "ES",
            "FI",
            "FR",
            "GB",
            "GR",
            "GT",
            "HK",
            "HN",
            "HU",
            "ID",
            "IE",
            "IS",
            "IT",
            "JP",
            "LI",
            "LT",
            "LU",
            "LV",
            "MC",
            "MT",
            "MX",
            "MY",
            "NI",
            "NL",
            "NO",
            "NZ",
            "PA",
            "PE",
            "PH",
            "PL",
            "PT",
            "PY",
            "SE",
            "SG",
            "SK",
            "SV",
            "TR",
            "TW",
            "US",
            "UY"
          ],
          "external_urls": {
            "spotify": "https://open.spotify.com/album/1AXGMY5gO4VvCefch2R8oh"
          },
          "href": "https://api.spotify.com/v1/albums/1AXGMY5gO4VvCefch2R8oh",
          "id": "1AXGMY5gO4VvCefch2R8oh",
          "images": [
            {
              "height": 640,
              "url": "https://i.scdn.co/image/f7438f6bc55fd85a71f45f6d24d8e5e440fa1d85",
              "width": 640
            },
            {
              "height": 300,
              "url": "https://i.scdn.co/image/88ba06406e98eb2394081ac0e1fada183de9fa24",
              "width": 300
            },
            {
              "height": 64,
              "url": "https://i.scdn.co/image/9f58387e76f265b18374d48812839c9b569e78fa",
              "width": 64
            }
          ],
          "name": "Dawning",
          "type": "album",
          "uri": "spotify:album:1AXGMY5gO4VvCefch2R8oh"
        },
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/5YNgVaI5vgMjBLel7QShBe"
            },
            "href": "https://api.spotify.com/v1/artists/5YNgVaI5vgMjBLel7QShBe",
            "id": "5YNgVaI5vgMjBLel7QShBe",
            "name": "LUCHS",
            "type": "artist",
            "uri": "spotify:artist:5YNgVaI5vgMjBLel7QShBe"
          }
        ],
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CA",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "ID",
          "IE",
          "IS",
          "IT",
          "JP",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MT",
          "MX",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "SE",
          "SG",
          "SK",
          "SV",
          "TR",
          "TW",
          "US",
          "UY"
        ],
        "disc_number": 1,
        "duration_ms": 138574,
        "explicit": false,
        "external_ids": {},
        "external_urls": {
          "spotify": "https://open.spotify.com/track/557iYakWWJQeKbJS3UYMxG"
        },
        "href": "https://api.spotify.com/v1/tracks/557iYakWWJQeKbJS3UYMxG",
        "id": "557iYakWWJQeKbJS3UYMxG",
        "name": "Red Gold Yesterday",
        "popularity": 70,
        "preview_url": "https://p.scdn.co/mp3-preview/e4a7c837541baacaa35ec36996f2c60c35815740?cid=null",
        "track_number": 3,
        "type": "track",
        "uri": "spotify:track:557iYakWWJQeKbJS3UYMxG"
      }
    ],
    "limit": 20,
    "next": "https://api.spotify.com/v1/search?query=yesterday&type=track&offset=20&limit=20",
    "offset": 0,
    "previous": null,
    "total": 29541
  }
}
    })
  }
  handleSearchQuery(event){
    this.setState({query: event.target.value})
  }

  handleSubmit(event){
    event.preventDefault()
    let str = this.state.query
    let query = str.replace(/\s/g, "%20");
    console.log(query)
    fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
    credentials: 'same-origin',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
      this.setState({ results: response});
    })
  }
  render(){


    return(
      <div>
        <form>
          <input type="query" onChange={this.handleSearchQuery}/>
          <input type="submit" onClick={this.handleSubmit} />
        </form>
        <img src={this.state.results.tracks.items[0].album.images[2].url} />
        <p>Track Name: {this.state.results.tracks.items[0].name}</p>
          <p>Artist: {this.state.results.tracks.items[0].artists[0].name}</p>
          <p>Album: {this.state.results.tracks.items[0].album.name}</p>
    </div>
    )
  }
}

export default TestComponent
