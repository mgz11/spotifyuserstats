import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "../../Hooks/useAuth";
import TimelineButtons from "./buttons";
import Header from "./header";
import OptionSelect from "./optionSelect";

const spotifyApi = new SpotifyWebApi({
  clientId: "dbec15ad30154427ad0efcbdb3d78cfe",
});

const Homepage = () => {
  const [listItems, setListItems] = useState(undefined);
  // Starts with initially showing the time range medium term data
  const [activeButton, setActiveButton] = useState(2);
  const [userSpotifyName, setUserSpotifyName] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("bg-white");
  // Will initially show users top tracks and user can change to top artists if desired
  const [selectOption, setSelectOption] = useState("Tracks");

  // Get code from the URL
  let code = new URLSearchParams(window.location.search).get("code");
  const accessToken = useAuth(code);

  // Set parameter for timeline API needs to obtain
  let timeRange = "medium_term";
  if (activeButton === 1) timeRange = "short_term";
  if (activeButton === 3) timeRange = "long_term";

  // Handles time range
  const handleActiveButton = (buttonId) => {
    setActiveButton(buttonId);
  };

  // Handles background color
  const handleBgColor = (color) => {
    setBackgroundColor(color);
  };

  // Handles option for tracks or artists
  const handleOptionChange = (option) => {
    setSelectOption(option);
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);

    // Get the user's display name
    spotifyApi
      .getMe()
      .then((res) => {
        console.log(res);
        setUserSpotifyName(res.body.display_name);
      })
      .catch((error) => {
        console.log(error);
      });

    if (selectOption === "Tracks") {
      spotifyApi
        .getMyTopTracks({
          time_range: timeRange,
          limit: 10,
        })
        .then((res) => {
          // Get object out of body
          const topTracks = res.body.items;

          const updatedListItems = (
            <>
              <ul className="grid grid-cols-3 gap-4 place-items-center mb-3">
                {topTracks.slice(0, 3).map((track, index) => (
                  <li key={track.id} className="h-full">
                    <div className="flex flex-col items-center h-full">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                      <img
                        className="border border-solid border-black"
                        src={track.album.images[1].url}
                      />
                      <div className="text-center w-9/12 font-medium">
                        <p className="text-lg">{track.name}</p>
                        <p className="text-sm">{track.artists[0].name}</p>
                        <a href={track.external_urls.spotify}>
                          <img
                            src="../spotify.svg"
                            className="mx-auto"
                            alt="Spotify Logo"
                          ></img>
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="col-span-3 sm:col-span-1 ml-12">
                {topTracks.slice(3, 10).map((track, index) => (
                  <li
                    className="flex flex-row items-center pb-2"
                    key={track.id}
                  >
                    <span className="text-3xl font-semibold mr-5 flex items-center justify-end w-5 text-right">
                      {index + 4}
                    </span>
                    <img
                      className="border border-solid border-black"
                      src={track.album.images[2].url}
                    />
                    <p className="ml-5 font-medium">
                      <span className="text-lg">{track.name}</span> by{" "}
                      <span className="text-sm">{track.artists[0].name}</span>
                    </p>
                    <a
                      href={track.external_urls.spotify}
                      className="ml-auto mr-12"
                    >
                      <img src="../spotify.svg" alt="Spotify Logo"></img>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          );
          setListItems(updatedListItems);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (selectOption === "Artists") {
      spotifyApi
        .getMyTopArtists({
          time_range: timeRange,
          limit: 10,
        })
        .then((res) => {
          console.log(res);
          // Get object out of body
          const topArtists = res.body.items;

          const updatedListItems = (
            <>
              <ul className="grid grid-cols-3 gap-4 place-items-center mb-3">
                {topArtists.slice(0, 3).map((artist, index) => (
                  <li key={artist.id} className="h-full">
                    <div className="flex flex-col items-center h-full">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                      <img
                        className="border border-solid border-black h-56 w-56"
                        src={artist.images[1].url}
                      />
                      <div className="text-center w-9/12 font-medium">
                        <p className="text-lg">{artist.name}</p>
                        <a href={artist.external_urls.spotify}>
                          <img
                            src="../spotify.svg"
                            className="mx-auto"
                            alt="Spotify Logo"
                          ></img>
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="col-span-3 sm:col-span-1 ml-12">
                {topArtists.slice(3, 10).map((artist, index) => (
                  <li
                    className="flex flex-row items-center pb-2"
                    key={artist.id}
                  >
                    <span className="text-3xl font-semibold mr-5 flex items-center justify-end w-5 text-right">
                      {index + 4}
                    </span>
                    <img
                      className="border border-solid border-black h-32 w-32"
                      src={artist.images[2].url}
                    />
                    <p className="ml-5 font-medium">
                      <span className="text-lg">{artist.name}</span>
                    </p>
                    <a
                      href={artist.external_urls.spotify}
                      className="ml-auto mr-12"
                    >
                      <img src="../spotify.svg" alt="Spotify Logo"></img>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          );

          setListItems(updatedListItems);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken, activeButton, selectOption]);

  return (
    <div className={`font-roboto ${backgroundColor}`}>
      <Header handleBgColor={handleBgColor} />
      <OptionSelect
        selectedOption={selectOption}
        handleOptionChange={handleOptionChange}
      />
      <TimelineButtons
        activeButton={activeButton}
        handleActiveButton={handleActiveButton}
      />
      {userSpotifyName ? (
        <h1 className="text-4xl font-medium flex justify-center">
          {userSpotifyName}'s Top {selectOption}
        </h1>
      ) : (
        <h1>Your Top {selectOption}</h1>
      )}
      {listItems ? <>{listItems}</> : <div>Loading...</div>}
    </div>
  );
};

export default Homepage;
