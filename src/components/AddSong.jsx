import React, { useState } from 'react'
import { Button, Image } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import uplad from '../assets/images/upload-icon.svg';
import deleteIcon from '../assets/images/DeleteOutlined.svg';
import defaulImage from '../assets/images/songImage.png';
export default function AddSong({ show, handleClose ,passData}) {
    const [musics, setMusics] = useState({ songName: "", songLink: "", songSource: "", songImg: null, imgName: "" });
    const { songName, songLink, songSource, songImg, imgName } = musics;

    function handleChange(e) {
        e.preventDefault();
        setMusics({ ...musics, [e.target.name]: e.target.value });
    }
    function deleteUploadImage(){
        setMusics({ ...musics,songImg:null });
    }
    function submitHandler(){
        console.log("submit call")
        passData(musics);
        setMusics({songName:"",songLink:"",songImg:null,songName:"",songSource:""})
        handleClose();
    }
    return (
        <Modal className='custom-modal' show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="fs-16 fw-bold">Add Song</Modal.Title>
            </Modal.Header>
            <form onSubmit={submitHandler}>
            <Modal.Body>
                <div className="innput-frame-box">
                    <p className='fs-14 fw-normal '>Song Name</p>
                    <input type="text" required  onChange={handleChange} name='songName' value={songName} className='input-box fs-14 fw-normal' placeholder='Song Name' />
                </div>
                <div className="innput-frame-box">
                    <p className='fs-14 fw-normal '>Song Link</p>
                    <input type="text" required onChange={handleChange} name='songLink' value={songLink} className='input-box fs-14 fw-normal' placeholder='Url' />
                </div>
                <div className="innput-frame-box">
                    <p className='fs-14 fw-normal '>Song Name</p>
                    <input type="text" required onChange={handleChange} name='songSource' value={songSource} className='input-box fs-14 fw-normal' placeholder='Song Source' />
                </div>
                <input type="file" onChange={(e) => setMusics({ ...musics, songImg: URL.createObjectURL(e.target.files[0]), imgName: e.target.files[0].name })} name="so" id="so" className='d-none' />
                <label htmlFor="so">
                    <div className="image-uploader-frame fs-14 fw-normal ">
                        <Image src={uplad} alt='icon' />
                        Click to Upload Profile Thumbnail
                    </div>
                </label>
                {(songImg ?? false) &&
                    <div className="upload-image-frame">
                        <div className="uplade-song-image">
                            <Image src={songImg} alt='image' className='upload-image' />
                            <p className='fs-14 primary'>{songName || imgName}</p>
                        </div>
                        <Image src={deleteIcon} onClick={deleteUploadImage} alt='image' className='upload-image' />
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}  >
                    Cancle
                </Button>
                <Button variant="primary" type='submit'>
                    Add
                </Button>
            </Modal.Footer>
            </form>
        </Modal>
    )
}
