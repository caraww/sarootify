import React from "react";

class SongInput extends React.Component {
  state = {
    title: "",
    artist: "",
  };

  fetchCover = async () => {
    const query = `${this.state.title} ${this.state.artist}`.trim();
    if (!query) return "";

    try {
      const res = await fetch(
        `https://corsproxy.io/?https://api.deezer.com/search?q=${encodeURIComponent(query)}`,
      );

      if (!res.ok) {
        console.error("Deezer HTTP error:", res.status);
        return "";
      }

      const data = await res.json();
      const cover = data?.data?.[0]?.album?.cover_medium || "";
      return cover;
    } catch (err) {
      console.error("Deezer fetch failed:", err);
      return "";
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async () => {
    const cover = await this.fetchCover();

    const song = {
      title: this.state.title,
      artist: this.state.artist,
      cover,
    };

    this.props.addSong(song);

    this.setState({
      title: "",
      artist: "",
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  };

  render() {
    return (
      <div className="container">
        <input
          type="text"
          name="title"
          placeholder="اسم آهنگ"
          value={this.state.title}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <input
          type="text"
          name="artist"
          placeholder="نام خواننده"
          value={this.state.artist}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <button onClick={this.handleSubmit}>ثبت</button>
      </div>
    );
  }
}

export default SongInput;
