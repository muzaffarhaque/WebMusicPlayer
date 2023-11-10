import React, { useEffect, useRef, useState } from 'react';
import { Breadcrumb, Image } from 'react-bootstrap';
import trach from '../assets/images/DeleteOutlined.svg';
import songImage from '../assets/images/songImage.png';
import play from '../assets/images/play.svg';
import pauseIcon from '../assets/images/pause.svg';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import back from '../assets/images/prev.svg';
import next from '../assets/images/next.svg';
import song1 from '../assets/song/song1.mp3';
import song2 from '../assets/song/song2.mp3';
import song3 from '../assets/song/song3.mp3';
import song4 from '../assets/song/song4.mp3';
import song5 from '../assets/song/song5.mp3';
import song6 from '../assets/song/song6.mp3';
import song7 from '../assets/song/song7.mp3';
import song8 from '../assets/song/song8.mp3';
import song9 from '../assets/song/song9.mp3';
import AddSong from '../components/AddSong';
const songs = [
  { name: "song1", sorce: "Youtube", path: song1, date: '10/9/2023', img: songImage },
  { name: "song2", sorce: "Youtube", path: song2, date: '14/9/2023', img: songImage },
  { name: "song3", sorce: "Mymusic", path: song3, date: '18/9/2023', img: songImage },
  { name: "song4", sorce: "Youtube", path: song4, date: '22/9/2023', img: songImage },
  { name: "song5", sorce: "STD-Std", path: song5, date: '28/9/2023', img: songImage },
]
const itemsPerPage = 4;
export default function Home() {
  const [song, setSong] = useState(songs);
  const [audioFile, setAudioFile] = useState({ file:song1, songName: 'song2', img: songImage });
  const { file, songName, img } = audioFile;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedSongs = song.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };


  // Listen for audio element's timeupdate event to update currentTime
  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(audioRef.current.currentTime);
      console.log(currentTime)
    };
    audioRef.current.addEventListener('timeupdate', updateCurrentTime);
    return () => {
      audioRef.current.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, [audioFile]);

  // Listen for the loadedmetadata event to get the audio duration
  useEffect(() => {

    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
      console.log(audioRef.current.duration)
    };

    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => {
      audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audioFile]);

  function setPathAudioFile(data) {
    console.log(data)
    audioRef.current.pause();
    setIsPlaying(false);
    // Set the new audio source and song name
    setAudioFile({ file: data.path, songName: data.name, img: data.img });
    console.log(audioRef.current)
    // Reset the current time to 0
    setCurrentTime(0);

  }
  function addSongFormData(data) {
    console.log(data)
    const currentDate = new Date();

    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
    const year = currentDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    setSong([...song, { name: data.songName, sorce: data.songSource, path: data.songLink, date:formattedDate, img: data.songImg }]);
  }
  function removeSongHandler(data){
      let reoveItem=song.filter((item)=>item.name !== data.name);
      setSong(reoveItem);
  }
  return (
    <section className='song-right-mainsection'>
      {showModal && <AddSong show={showModal} handleClose={() => { setShowModal(false) }} passData={(e) => addSongFormData(e)} />}
      <header className='song-header'>
        <Breadcrumb>
          <Breadcrumb.Item href="#">First-level Menu</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Second-level Menu</Breadcrumb.Item>
          <Breadcrumb.Item >Current Page</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex align-items-center justify-content-between">
          <h5 className='fs-20 fw-medium black-101'>Songs</h5>
          <button className='second-btn fs-16' onClick={() => setShowModal(true)}>Add Songs</button>
        </div>
      </header>
      <table className='song-table'>
        <thead>
          <tr className='thable-header-row'>
            <th>SONG NAME</th>
            <th>SOURCE</th>
            <th>Added ON</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {paginatedSongs?.map((item, i) => {
            return (
              <tr key={i} className='table-body-row'>
                <td><Image src={item.img || songImage} alt='image' /> {item.name || "Song Name"}</td>
                <td>{item.sorce || "Youtube"}</td>
                <td>{item.date || '19/6/2021'}</td>
                <td><Image src={play} onClick={() => setPathAudioFile(item)} alt='icon-play' /></td>
                <td><Image onClick={()=>removeSongHandler(item)} src={trach} alt='delete-icon' /></td>
              </tr>
            )
          })}

        </tbody>

      </table>
      <ResponsivePagination
        current={currentPage}
        total={Math.ceil(song.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
      <audio id="audio-element" className=' d-none' ref={audioRef}>
        <source src={file} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <div className="song-play-box">
        <input
          type="range"
          name="range"
          className="video-range"
          value={currentTime}
          max={duration}
          onChange={(e) => {
            audioRef.current.currentTime = e.target.value;
          }}
        />
        <div className="song-actions">
          <div className=" d-flex align-items-center song-name-image">
            <Image src={img} className='song-image' alt='image' />
            <span className='fs-18 fw-bold '>{songName || "default Name"}</span>
          </div>

          <div className="play-song-frame">
            <Image src={back} className='back-btn' alt='back-btn' />
            {isPlaying ? <Image src={pauseIcon} onClick={toggleAudio} className='play-btn' alt='play-btn' /> : <Image src={play} onClick={toggleAudio} className='play-btn' alt='play-btn' />}
            <Image src={next} className='next-btn' alt='next-btn' />
          </div>
        </div>
      </div>
    </section>
  )
}
