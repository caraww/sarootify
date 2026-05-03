import "./App.css";
import React from "react";
import SongInput from "./components/SongInput";
import Mixer from "./components/Mixer";

class App extends React.Component {
  state = {
    songs: [],
    isMixing: false,
    recommendation: null,
  };

  addSong = (song) => {
    if (this.state.songs.length < 5) {
      this.setState({
        songs: [...this.state.songs, song],
      });
    }
  };

  startMixing = () => {
    this.setState({ isMixing: true });
  };

  handleMix = () => {
    this.startMixing();
    this.askGpt();
  };

  askGpt = () => {
    const songsText = this.state.songs
      .map((song) => `${song.title} - ${song.artist}`)
      .join(", ");

    fetch("http://192.168.1.1:3001/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: `Based on these 5 songs, infer my music taste and recommend 1 song that blends them. Return only: title – artist. Songs: ${songsText}`,
          },
        ],
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          recommendation: data.choices[0].message.content,
        }),
      );
  };

  render() {
    return (
      <div className={this.state.isMixing ? "background-blur" : "body"}>
        <h1>Sarootify 🎵</h1>
        <h2>ترکیب سلیقه موسیقی کاربر</h2>

        <SongInput addSong={this.addSong} />

        <ul className={this.state.isMixing ? "mixing" : ""}>
          {this.state.songs.map((song, index) => (
            <li key={index} className="song-item">
              <img
                src={song.cover}
                className={
                  this.state.isMixing ? `planet planet-${index}` : "cover"
                }
                alt=""
              />

              {!this.state.isMixing && (
                <span>
                  {song.title} - {song.artist}
                </span>
              )}
            </li>
          ))}
        </ul>

        <Mixer
          canMix={this.state.songs.length === 5}
          isMixing={this.state.isMixing}
          onMix={this.handleMix}
          recommendation={this.state.recommendation}
        />
      </div>
    );
  }
}

export default App;
