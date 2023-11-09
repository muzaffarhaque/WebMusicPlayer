import React, { useState } from 'react';
import { Breadcrumb, Image } from 'react-bootstrap';
import trach from '../assets/images/DeleteOutlined.svg';
import songImage from '../assets/images/songImage.png';
import play from '../assets/images/play.svg';
import pauseIcon from '../assets/images/pause.svg';
import back from '../assets/images/prev.svg';
import song1 from '../assets/song/song1.mp3';
import next from '../assets/images/next.svg';
// import song2 from '../assets/song/song2.mpeg';
// import song3 from '../assets/song/song3.mpeg';
// import song4 from '../assets/song/song4.mpeg';
// import song5 from '../assets/song/song5.mpeg';
// import song6 from '../assets/song/song6.mpeg';
// import song7 from '../assets/song/song7.mpeg';
// import song8 from '../assets/song/song8.mpeg';
// import song9 from '../assets/song/song9.mpeg';
const songs = [
  { name: "song1", sorce: "Youtube", path: song1, date: '10/9/2023', img: songImage },
  // { name: "song2", sorce: "Youtube", path: song2, date: '14/9/2023', img: songImage },
  // { name: "song3", sorce: "Mymusic", path: song3, date: '18/9/2023', img: songImage },
  // { name: "song4", sorce: "Youtube", path: song4, date: '22/9/2023', img: songImage },
  // { name: "song5", sorce: "STD-Std", path: song5, date: '28/9/2023', img: songImage },
  // { name: "song6", sorce: "Youtube", path: song6, date: '4/10/2023', img: songImage },
  // { name: "song7", sorce: "Youtube", path: song7, date: '7/10/2023', img: songImage },
  // { name: "song8", sorce: "Gana", path: song8, date: '14/10/2023', img: songImage },
  // { name: "song9", sorce: "Youtube", path: song9, date: '21/10/2023', img: songImage },
]
export default function Home() {
  const [song, setSong] = useState(songs);
  return (
    <section className='song-right-mainsection'>
      <header className='song-header'>
        <Breadcrumb>
          <Breadcrumb.Item href="#">First-level Menu</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Second-level Menu</Breadcrumb.Item>
          <Breadcrumb.Item >Current Page</Breadcrumb.Item>
        </Breadcrumb>
        <h5 className='fs-20 fw-medium black-101'>Songs</h5>
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
          {song?.map((item, i) => {
            return (
              <tr className='table-body-row'>
                <td><Image src={item.img || songImage} alt='image' /> {item.name | "Song Name"}</td>
                <td>{item.sorce || "Youtube"}</td>
                <td>{item.date || '19/6/2021'}</td>
                <td><Image src={play} alt='icon-play' /></td>
                <td><Image src={trach} alt='delete-icon' /></td>
              </tr>
            )
          })}

        </tbody>

      </table>
      <div className="song-play-box">
        <div className=" d-flex align-items-center song-name-image">
          <Image src={songImage} className='song-image' alt='image' />
          <span className='fs-18 fw-bold '>Sont name</span>
        </div>
        <div className="song-actions">
          <div className="play-song-frame">
            <Image src={back} className='back-btn' alt='back-btn' />
            <Image src={pauseIcon} className='play-btn' alt='play-btn' />
            <Image src={next} className='next-btn' alt='next-btn' />
          </div>
        </div>
      </div>
    </section>
  )
}
