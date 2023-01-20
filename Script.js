let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');

//All songs list
let All_song = [{
    name: "Musthafa_Musathafa",
    path: "Music/AR.mp3",
    img: "Images/AR_Rahman.jpeg",
    singer: "AR Rahman"
},
{
    name: "Kanava_Kanava",
    path: "Music/Ani.mp3",
    img: "Images/Aniruth.jpeg",
    singer: "Aniruth Ravichandran"
},
{
    name: "Poogal_pokkum",
    path: "Music/GV.mp3",
    img: "Images/GV.jpeg",
    singer: "GV Prakash"
}
];

//create a audio Element
let track = document.createElement('audio');

let index=0;
let timer;
let autoplay=0;
let Playing_song=false;
//load the song
function load_song(index){
    reset_slider();
    clearInterval(timer);
    track.src=All_song[index].path;
    title.innerText=All_song[index].name;
    track_image.src=All_song[index].img;
    artist.innerText=All_song[index].singer;
    track.load();
    timer = setInterval(range_slider, 1000);
    total.innerText=All_song.length;
    present.innerText=index+1;
}
load_song(index);

// checking.. the song is playing or not
function justplay() {
	if (Playing_song == false) {
		playsong();

	} else {
		pausesong();
	}
}

//play song
function playsong() {
	track.play();
	Playing_song = true;
	play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}
//pause song
function pausesong(){
    track.pause();
    Playing_song=false;
    play.innerHTML='<i class="fa fa-play" aria-hidden="true"></i>';
}
//previous song
function previous_song(){
    if(index >0){
        index -= 1;
        load_song(index);
        playsong();
    }
    else{
        index=All_song.length;
        load_song(index);
        playsong();
    }
}

//next song
function next_song(){
    if(index < All_song.length){
        index += 1;
        load_song(index);
        playsong();
    }
    else{
        index=0;
        load_song(index);
        playsong();
    }
}

//autoplay
function autoplay_switch(){
    if (autoplay == 1) {
		autoplay = 0;
		auto_play.style.background = "rgba(255,255,255,0.2)";
	} else {
		autoplay = 1;
		auto_play.style.background = "#FF8A65";
	}
}

//change volume
function volume_change(){
    volume_show.innerText=recent_volume.value;
    track.volume = recent_volume.value / 100;
}

//Mute volume
function mute_sound() {
    track.volume=0;
    volume_show.innerText=0;
    volume.value=0;
}

// reset song slider
function reset_slider() {
	slider.value = 0;
}

// change slider position 
function change_duration() {
	slider_position = track.duration * (slider.value / 100);
	track.currentTime = slider_position;
}

//autoplay
function range_slider() {
	let position = 0;

	// update slider position
	if (!isNaN(track.duration)) {
		position = track.currentTime * (100 / track.duration);
		slider.value = position;
	}


	// function will run when the song is over
	if (track.ended) {
		play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        if(index==All_song.length-1){
            index=-1;
        }
		if (autoplay == 1) {
			index += 1;
			load_song(index);
			playsong();
		}
	}
}