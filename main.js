const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const dashboard = $(".dashboard");
const cd = $(".cd");
const header = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const player = $(".player");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const PLAYER_STORAGE_KEY = "F8-PLAYER";

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  playedSongs: [],
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig(key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: [
    {
      name: "Remember The Time",
      singer: "Michael Jackson",
      path: "/music/remember_the_time.mp3",
      image: "/img/remember_the_time.jpg",
    },
    {
      name: "Beat It",
      singer: "Michael Jackson",
      path: "/music/beat_it.mp3",
      image: "/img/beat_it.jpg",
    },
    {
      name: "Billie Jean",
      singer: "Michael Jackson",
      path: "/music/billie_jean.mp3",
      image: "/img/billie_jean.jpg",
    },
    {
      name: "Black Or White",
      singer: "Michael Jackson",
      path: "/music/black_or_white.mp3",
      image: "/img/black_or_white.jpg",
    },
    {
      name: "Don't Stop Til You Get Enough",
      singer: "Michael Jackson",
      path: "/music/dont_stop_til_you_get_enough.mp3",
      image: "/img/dont_stop_til_you_get_enough.jpg",
    },
    {
      name: "Human Nature",
      singer: "Michael Jackson",
      path: "/music/human_nature.mp3",
      image: "/img/human_nature.jpg",
    },
    {
      name: "Man In The Mirror",
      singer: "Michael Jackson",
      path: "/music/man_in_the_mirror.mp3",
      image: "/img/man_in_the_mirror.jpg",
    },
    {
      name: "Rock With You",
      singer: "Michael Jackson",
      path: "/music/rock_with_you.mp3",
      image: "/img/rock_with_you.jpg",
    },
    {
      name: "Smooth Criminal",
      singer: "Michael Jackson",
      path: "/music/smooth_criminal.mp3",
      image: "/img/smooth_criminal.jpg",
    },
    {
      name: "You Rock My World",
      singer: "Michael Jackson",
      path: "/music/you_rock_my_world.mp3",
      image: "/img/you_rock_my_world.jpg",
    },
    {
      name: "Thriller",
      singer: "Michael Jackson",
      path: "/music/thriller.mp3",
      image: "/img/thriller.jpg",
    },
    {
      name: "Butterflies",
      singer: "Michael Jackson",
      path: "/music/butterflies.mp3",
      image: "/img/invincible.jpg",
    },
    {
      name: "Unbreakable",
      singer: "Michael Jackson",
      path: "/music/unbreakable.mp3",
      image: "/img/invincible.jpg",
    },
    {
      name: "Heaven Can Wait",
      singer: "Michael Jackson",
      path: "/music/heaven_can_wait.mp3",
      image: "/img/invincible.jpg",
    },
    {
      name: "2000 Watts",
      singer: "Michael Jackson",
      path: "/music/2000_watts.mp3",
      image: "/img/invincible.jpg",
    },
    {
      name: "Break Of Dawn",
      singer: "Michael Jackson",
      path: "/music/break_of_dawn.mp3",
      image: "/img/invincible.jpg",
    },
    {
      name: "The Way You Make Me Feel",
      singer: "Michael Jackson",
      path: "/music/the_way_you_make_me_feel.mp3",
      image: "/img/the_way_you_make_me_feel.jpg",
    },
    {
      name: "They Don't Care About Us",
      singer: "Michael Jackson",
      path: "/music/they_dont_care_about_us.mp3",
      image: "/img/they_dont_care_about_us.jpg",
    },
    {
      name: "Stranger In Moscow",
      singer: "Michael Jackson",
      path: "/music/stranger_in_moscow.mp3",
      image: "/img/stranger_in_moscow.jpg",
    },
    {
      name: "Who Is It",
      singer: "Michael Jackson",
      path: "/music/who_is_it.mp3",
      image: "/img/who_is_it.jpg",
    },
    {
      name: "You Are Not Alone",
      singer: "Michael Jackson",
      path: "/music/you_are_not_alone.mp3",
      image: "/img/you_are_not_alone.jpg",
    },
    {
      name: "Liberian Girl",
      singer: "Michael Jackson",
      path: "/music/liberian_girl.mp3",
      image: "/img/liberian_girl.jpg",
    },
    {
      name: "In The Closet",
      singer: "Michael Jackson",
      path: "/music/in_the_closet.mp3",
      image: "/img/in_the_closet.jpg",
    },
    {
      name: "Love Never Felt So Good",
      singer: "Michael Jackson",
      path: "/music/love_never_felt_so_good.mp3",
      image: "/img/love_never_felt_so_good.png",
    },
    {
      name: "Give In To Me",
      singer: "Michael Jackson",
      path: "/music/give_in_to_me.mp3",
      image: "/img/give_in_to_me.jpg",
    },
    {
      name: "Leave Me Alone",
      singer: "Michael Jackson",
      path: "/music/leave_me_alone.mp3",
      image: "/img/leave_me_alone.jpg",
    },
    {
      name: "Blood On The Dance Floor",
      singer: "Michael Jackson",
      path: "/music/blood_on_the_dance_floor.mp3",
      image: "/img/blood_on_the_dance_floor.jpg",
    },
  ],
  render: function () {
    app.setConfig("currentIndex", app.currentIndex);
    const htmls = this.songs.map((song, index) => {
      return `<div class="song ${
        index === this.currentIndex ? "active" : ""
      }" data-index=${index}>
      <div
        class="thumb"
        style="
          background-image: url('${song.image}');
        "
      ></div>
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>`;
    });
    playlist.innerHTML = htmls.join(`\n`);
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const cdWidth = cd.offsetWidth;
    //xu ly CD khi quay / dung
    const cdAnimate = cdThumb.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 10000, //10 giay
        iterations: Infinity,
      }
    );
    cdAnimate.pause();

    //xu ly phong to thu nho CD
    document.onscroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? `${newCdWidth}px` : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    //xu ly khi click play
    playBtn.onclick = function () {
      /* cach 1
      if (app.isPlaying) {
        app.isPlaying = false;
        audio.pause();
        player.classList.remove("playing");
      } else {
        app.isPlaying = true;
        audio.play();
        player.classList.add("playing");
      }
      */

      //cach 2
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      //khi song duoc play
      audio.onplay = function () {
        app.isPlaying = true;
        player.classList.add("playing");
        cdAnimate.play();
      };

      //khi song bi pause
      audio.onpause = function () {
        app.isPlaying = false;
        player.classList.remove("playing");
        cdAnimate.pause();
      };

      //khi tien do bai hat thay doi
      audio.ontimeupdate = function () {
        if (audio.duration) {
          const progressPercent = Math.floor(
            (audio.currentTime / audio.duration) * 100
          );
          progress.value = progressPercent;
        }
      };

      //xy ly khi tua
      progress.onchange = function (e) {
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;
      };
    };

    //prev / next song
    prevBtn.onclick = function () {
      // if (app.isRandom) {
      //   app.playRandom();
      // } else {
      //   app.prevSong();
      // }
      app.prevSong();
      playBtn.click();
      audio.play();
      app.render();
      app.scrollToActiveSong();
    };

    nextBtn.onclick = function () {
      if (app.isRandom) {
        app.playRandom();
      } else {
        app.nextSong();
      }
      playBtn.click();
      audio.play();
      app.render();
      app.scrollToActiveSong();
    };

    //xu ly bat tat random song
    randomBtn.onclick = function () {
      app.isRandom = !app.isRandom;
      randomBtn.classList.toggle("active", app.isRandom);
      app.setConfig("isRandom", app.isRandom);
    };

    //xu ly bat tat repeat
    repeatBtn.onclick = function () {
      app.isRepeat = !app.isRepeat;
      repeatBtn.classList.toggle("active", app.isRepeat);
      app.setConfig("isRepeat", app.isRepeat);
    };

    //xu ly next song khi audio end
    audio.onended = function () {
      if (app.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };

    //xu ly khi click vao playlist
    playlist.onclick = function (e) {
      songNotPlaying = e.target.closest(".song:not(.active)");
      if (songNotPlaying) {
        //xu ly khi click vao song ko phai bai hien tai thi chuyen den bai do
        if (songNotPlaying) {
          app.currentIndex = Number(songNotPlaying.dataset.index);
          app.loadCurrentSong();
          app.render();
          playBtn.click();
          audio.play();
        }
      }
    };
  },
  loadCurrentSong: function () {
    //xu ly tranh lap lai
    if (this.playedSongs.includes(this.currentIndex)) {
      this.playRandom();
    } else {
      //load bai hat
      header.innerHTML = this.currentSong.name;
      cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
      audio.src = this.currentSong.path;
      app.playedSongs.push(app.currentIndex);
    }

    //reset array lap lai khi full bai hat
    if (app.playedSongs.length === app.songs.length) {
      app.playedSongs = [];
    }
  },
  loadConfig() {
    if (this.config.isRandom) {
      this.isRandom = this.config.isRandom;
    }
    if (this.config.isRepeat) {
      this.isRepeat = this.config.isRepeat;
    }
    if (this.config.currentIndex) {
      this.currentIndex = this.config.currentIndex;
    }
    randomBtn.classList.toggle("active", app.isRandom);
    //hien thi trang thai trong config
    repeatBtn.classList.toggle("active", app.isRepeat);
  },
  prevSong() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  nextSong() {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  playRandom() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  scrollToActiveSong() {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
  },
  start: function () {
    //load config cau hinh
    this.loadConfig();
    //dinh nghia cac thuoc tinh cho object
    this.defineProperties();
    //lang nghe va xu ly cac su kien dom event
    this.handleEvents();
    //load thong tin bai hat dau tien vao UI khi chay ung dung
    this.loadCurrentSong();
    //render playlist
    this.render();
  },
};

app.start();
