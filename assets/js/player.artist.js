"use strict";

//=> Class Definition
var AudioPlayer = AudioPlayer || {};

$(function () {
    AudioPlayer = {
        //=> Initialize function to call all functions of the class
        init: function () {
            if ($('#audioPlayer').length === 0) {
                return false;
            }
            AudioPlayer.initAudioPlayer();
            AudioPlayer.volumeDropdownClick();
            AudioPlayer.volumeIconClick();
            AudioPlayer.addAudioInPlayer();
        },

        //=> Initialize audio player
        initAudioPlayer: function () {
            Amplitude.init({
                "songs": [
                    {
                        "name": "",
                        "artist": "",
                        "album": "",
                        "url": "",
                        "cover_art_url": ""
                    },
                ],
                "playlists": {
                    "ed-sheeran": {
                        songs: [
                            {
                                "name": "The Joker And The Queen (Feat. Taylor Swift)",
                                "artist": "Ed Sheeran",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/Qmd3RxtWKajEmPP2n2x3zS5K8YvG746dYrUgeTdFtRLqZM",
                                "cover_art_url": "https://files-music.polygium.com/image/release/edsheeran.jpg"
                            },
                            {
                                "name": "Shivers",
                                "artist": "Ed Sheeran",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/QmXYWLE2g8Krk2GKU8qpdyorqmMd6XwPcUfV8JuH1VcVuq",
                                "cover_art_url": "https://files-music.polygium.com/image/release/edsheeran.jpg"
                            },
                            {
                                "name": "Lego House",
                                "artist": "Ed Sheeran",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiaa3cpu7omkhbknzht56vdncmyrplbrnqtueghicomhkhvrfhvbo4",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Ed Sheeran-Lego House.jpg"
                            },
                            {
                                "name": "Thinking Out Loud",
                                "artist": "Ed Sheeran",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigjlwh2nnr2dzu4k5oj2f33hhaxu2e4si7w6v6htgugrebok62pji",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Ed Sheeran-Thinking Out Loud.jpg"
                            }
                        ]
                    },
                    "justin-bieber": {
                        songs: [
                            {
                                "name": "STAY",
                                "artist": "The Kid LAROI, Justin Bieber",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeihn5oiw2dlcydkt6uinzj45dvcjqtysrnkksfdf6wmxp34qmzpb5i",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/The Kid LAROI, Justin Bieber-STAY.jpg"
                            },
                            {
                                "name": "Ghost",
                                "artist": "Justin Bieber",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/Qmc1ucD2NhvrncuiLRM5B6EnndXzCffCUK43AwH6rsU2su",
                                "cover_art_url": "https://files-music.polygium.com/image/release/justinbieber.jpg"
                            },
                            {
                                "name": "Peaches (feat. Daniel Caesar & Giveon)",
                                "artist": "Justin Bieber",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidkznknya2g6mg5endnavfx6b7oyiaycq7p3c5yx5s443kj5k2uoy",
                                "cover_art_url": "https://files-music.polygium.com/image/global/Justin Bieber-Peaches (feat. Daniel Caesar & Giveon).jpg"
                            },
                            {
                                "name": "Hold On",
                                "artist": "Justin Bieber",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiajvk535swnebaf6gurbrpv2sub62z6poxfbx6mxadi25yqtmhv5e",
                                "cover_art_url": "https://files-music.polygium.com/image/global/Justin Bieber-Hold On.jpg"
                            }

                           
                        ]
                    },

                    "tulus": {
                        songs: [
                            {
                                "name": "Hati-Hati di Jalan",
                                "artist": "Tulus",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigsngqai3gobsfvtzdg3q3kz23pjek3mc7p5guw3lblbkywi6u75e",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Tulus-Hati Hati Di Jalan.jpg"
                            },
                            {
                                "name": "Diri",
                                "artist": "Tulus",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiazpta5zio7wlhso5uusugcg5ifjp3yusra4ydb3nniyhxtg56pu4",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Tulus-Diri.jpg"
                            },
                            {
                                "name": "Monokrom",
                                "artist": "Tulus",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeicwz63obdsle3uhzgsrroqqrkwdgx2dvapdpxaf57o3fsq47paqyu",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Tulus-Monokrom.jpg"
                            },
                            {
                                "name": "Interaksi",
                                "artist": "Tulus",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidyw7dmq5ykjmmqcqqsredzyefolb6tfunysfphwatqypbcptuip4",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Tulus-Interaksi.jpg"
                            }

                           
                        ]
                    },

                    "the-weeknd": {
                        songs: [
                            {
                                "name": "The Hills",
                                "artist": "The Weeknd",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeihf4xapgawmysnt6muv25qtrlis3vofpuk7uocd4sypi7bhsuf3ju",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/chill/The Weeknd-The Hills.jpg"
                            },
                            {
                                "name": "I Feel It Coming ft Daft Punk",
                                "artist": "The Weeknd",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeihh4dwfr76gc6m7rafn6pyuzc5neqkuocqbx642e4wizrvrlrwhdy",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/chill/The Weeknd-I Feel It Coming ft Daft Punk.jpg"
                            },
                            {
                                "name": "Blinding Lights",
                                "artist": "The Weeknd",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiathuiproyay6gp3uyni6wpokyi736ryijt4gmrndzifyirgjuzdy",
                                "cover_art_url": "https://files-music.polygium.com/image/global/The Weeknd-Blinding Lights.jpg"
                            }

                           
                        ]
                    },
                    "britney-spears": {
                        songs: [
                            {
                                "name": "Toxic",
                                "artist": "Britney Spears",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifmnbfshfthdqq4hgux5p3eqoilouw5p27tnln55b5ynuekqd4zdy",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Britney Spears/Britney Spears-Toxic.jpg"
                            },
                            {
                                "name": "Till the World Ends",
                                "artist": "Britney Spears",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeibikukggtde3mmqwynhoc5yx4fiuddoxoawwyufofrajqnttrcf4y",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Britney Spears/Britney Spears-Till the World Ends.jpg"
                            },
                            {
                                "name": "Sometimes",
                                "artist": "Britney Spears",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidoaedlr4tzj5dnnsh6qpoms75uqryrrwonfxckenz5rrvbolbdn4",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Britney Spears/Britney Spears-Sometimes.jpg"
                            },
                            {
                                "name": "Oops!...I Did It Again",
                                "artist": "Britney Spears",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiegpceyxiwfm2yxixght4kjhcpmnysrip6phjnpyqh4r6lyzdhncq",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Britney Spears/Britney Spears-Oops!...I Did It Again.jpg"
                            },
                            {
                                "name": "Baby One More Time",
                                "artist": "Britney Spears",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeic2476o4cvptnsfye7jglhdueouxwzopop4vnn4qw2hfg6j5usgwa",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Britney Spears/Britney Spears-Baby One More Time.jpg"
                            }

                           
                        ]
                    },
                    "miley-cyrus": {
                        songs: [
                            {
                                "name": "Start All Over",
                                "artist": "Miley Cyrus",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigwpzl6oga6ctim3ojkjv45rgmp2wodct74t3xasuaedjnbr2wboq",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Miley Cyrus/Miley Cyrus-Start All Over.jpg"
                            },
                            {
                                "name": "The Climb",
                                "artist": "Miley Cyrus",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeib4xaxlq6hznvaoqiizisoen6irfgfhgebq7nczjrznkmd62j6xgm",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Miley Cyrus/Miley Cyrus-The Climb.jpg"
                            },
                            {
                                "name": "Party In The U.S.A",
                                "artist": "Miley Cyrus",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeif4upslvkbnhvt53v3wkjij2km5vhegf6pa3kx2nmxs3bqy5malc4",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Miley Cyrus/Miley Cyrus-Party In The U.S.A.jpg"
                            },
                            {
                                "name": "Can't Be Tamed",
                                "artist": "Miley Cyrus",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeie24roc5zeqxqeh324li4yfrtb7mcjbmnnqx3ziv7ts42xgk2u2vi",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Miley Cyrus/Miley Cyrus-Can't Be Tamed.jpg"
                            },
                            {
                                "name": "7 Things",
                                "artist": "Miley Cyrus",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiewoommcoc5s4662f6ajgjidyq4kl2b2g3dyw7igg2hmvxol4oqty",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Miley Cyrus/Miley Cyrus-7 Things.jpg"
                            }

                           
                        ]
                    },
                    "rihanna": {
                        songs: [
                            {
                                "name": "Rude Boy",
                                "artist": "Rihanna",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiemu4ilcz6sow4tadvjk74s32lyvlrkdw64f6xbmbxuc7yidouo64",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Rihanna/Rihanna-Rude Boy.jpg"
                            },
                            {
                                "name": "What's My Name (feat Drake)",
                                "artist": "Rihanna, Drake",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeibt6ibdu75tmjxpkamye7y3p3d52c4vktpv7dtmms3wuyzyscfgay",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Rihanna/Rihanna-What's My Name (feat Drake).jpg"
                            },
                            {
                                "name": "We Found Love",
                                "artist": "Rihanna",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidf6nxur6c3hwdsdx2gq7n7gxvwhtc3dk6khzpi7z33ir6mepxgfi",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Rihanna/Rihanna-We Found Love.jpg"
                            },
                            {
                                "name": "Don't Stop The Music",
                                "artist": "Rihanna",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeid3at36tqkinma6sblwivv2fnph4thce6fyfccakcnjxls7uortlm",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Rihanna/Rihanna-Don't Stop The Music.jpg"
                            },
                            {
                                "name": "Only Girl (In The World)",
                                "artist": "Rihanna",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiav5767abct3n2asbz54deaqhsgkrcwbckr3j3t3febdggrlppxga",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Rihanna/Rihanna-Only Girl (In The World).jpg"
                            }

                           
                        ]
                    },
                    "beyonce": {
                        songs: [
                            {
                                "name": "Sweet Dreams",
                                "artist": "Beyoncé",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeihkdpskdem5vrmakoizkzsh3yb2ophvyvad4n7hkkldelyqygvanu",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Beyonce/Beyoncé-Sweet Dreams.jpg"
                            },
                            {
                                "name": "If I Were a Boy",
                                "artist": "Beyoncé",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeib6pkbdods55zkiwdiu3kgqdsbl2d3sweh6xm55ykoldrmov5fpxq",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Beyonce/Beyoncé-If I Were a Boy.jpg"
                            },
                            {
                                "name": "Run the World (Girls)",
                                "artist": "Beyoncé",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidmxw7xf6abtmo3x3hbuov5mcikde7tlj6q47b6hy6bnlbgjbmga4",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Beyonce/Beyoncé-Run the World (Girls).jpg"
                            },
                            {
                                "name": "Best Thing I Never Had",
                                "artist": "Beyoncé",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiejwxhn65aw5gtxp4duy7udnxehywrcuyw5w532bqedsjh5g6wi54",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Beyonce/Beyoncé-Best Thing I Never Had.jpg"
                            },
                            {
                                "name": "Diva",
                                "artist": "Beyoncé",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigz7k46s3xysfght5q3xdkk6cdxaedokqeqsznpqnsdrd7qtfu32u",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Beyonce/Beyoncé-Diva.jpg"
                            }

                           
                        ]
                    },

                    "bruno-mars": {
                        songs: [
                            {
                                "name": "Smokin Out The Window",
                                "artist": "Bruno Mars, Anderson .Paak, Silk Sonic",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidia6iy6llnkkgmcxsoihkbsoskpholqzf2iujcibaj4ykponxe7i",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Bruno Mars/Bruno Mars, Anderson .Paak, Silk Sonic-Smokin Out The Window.jpg"
                            },
                            {
                                "name": "Leave The Door Open",
                                "artist": "Bruno Mars, Anderson .Paak, Silk Sonic",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeig24fdplijujge4olw77uzft2wue4awpcusxjzhz4mfo5zqxhy274",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Bruno Mars/Bruno Mars, Anderson .Paak, Silk Sonic-Leave The Door Open.jpg"
                            },
                            {
                                "name": "Skate",
                                "artist": "Bruno Mars, Anderson .Paak, Silk Sonic",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeia3obwvho4ohqebbtm3v7hiauv724yuhnrskafaoe6le5mlktu6bq",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Bruno Mars/Bruno Mars, Anderson .Paak, Silk Sonic-Skate.jpg"
                            },
                            {
                                "name": "When I Was Your Man",
                                "artist": "Bruno Mars",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeicfjoegomp47xx6l4ln3aj6g2lvlumjvrfgn4pc3s5pj4fb4lia6e",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Bruno Mars/Bruno Mars-When I Was Your Man.jpg"
                            },
                            {
                                "name": "The Lazy Song",
                                "artist": "Bruno Mars",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidxci4dxczhwv3wrvtrcq5mmjzwdgl3ssgj2yu4nsxgqupfex6p5a",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Bruno Mars/Bruno Mars-The Lazy Song.jpg"
                            },
                            {
                                "name": "Just the Way You Are",
                                "artist": "Bruno Mars",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeievns45ykfheh52p4a74z23a6o3k2lvmehzipqs6wwuenbtpljckq",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Bruno Mars/Bruno Mars-Just the Way You Are.jpg"
                            },
                            {
                                "name": "That's What I Like",
                                "artist": "Bruno Mars",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeibon334neniolirdqhli7kdqi6yi2v3ladli66h3hkezmrtrdn3dy",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Bruno Mars/Bruno Mars-That's What I Like.jpg"
                            },
                            {
                                "name": "24K Magic",
                                "artist": "Bruno Mars",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifbjy4xfrquxm5ya2gyuzuf2rzaedloap7hoorzsd7zj73s4m2g44",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Bruno Mars/Bruno Mars-24K Magic.jpg"
                            },
                            {
                                "name": "Grenade",
                                "artist": "Bruno Mars",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigfrnnx5jrz3hrqm22n5idytro7vlbpx7sstolvdtu6e4sqgzz4se",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Bruno Mars/Bruno Mars-Grenade.jpg"
                            }

                           
                        ]
                    },

                    "maroon5": {
                        songs: [
                            {
                                "name": "One Light (feat. Bantu)",
                                "artist": "Maroon 5",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeif2cxgkfjxgt62xnptl5q6xrog3sbsbdqugxadfbx6dx3glrjzmga",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Maroon5/Maroon 5-One Light (feat. Bantu).jpg"
                            },
                            {
                                "name": "Seasons",
                                "artist": "Maroon 5",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiafuo5ncvjizzu2xljxd5rhvocxdvefbltt22oysafdac66m7qdhy",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Maroon5/Maroon 5-Seasons.jpg"
                            },
                            {
                                "name": "Remedy (feat. Stevie Nicks)",
                                "artist": "Maroon 5",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiho6kklqlntrarbs27ji25kvea3splqxfk5piinmbg56iqj232el4",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Maroon5/Maroon 5-Remedy (feat. Stevie Nicks).jpg"
                            },
                            {
                                "name": "Lovesick",
                                "artist": "Maroon 5",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigyxtd5zb6rrlwsh4zbjj6rrtbzk4z6zcqazu4iedmqzcmqjcdz4y",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Maroon5/Maroon 5-Lovesick.jpg"
                            },
                            {
                                "name": "Convince Me Otherwise (with H.E.R.)",
                                "artist": "Maroon 5",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifrro7vjak7hniq4nyqwrcgiouaoz7hv4ktjqtz633n3gqgjsgmyu",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Maroon5/Maroon 5-Convince Me Otherwise (with H.E.R.).jpg"
                            }

                           
                        ]
                    }


                }
            });
        },

        //=> Volume dropdown click
        volumeDropdownClick: function () {
            $(document).on('click', '.volume-dropdown-menu', function (e) {
                e.stopPropagation();
            });
        },

        //=> Change volume icon in audio player from it's range
        volumeIconClick: function () {
            var $audioInput = $('.audio-volume input[type="range"]');
            var $audioButton = $('.audio-volume .btn');

            $audioInput.on('change', function () {
                var $this = $(this);
                var value = parseInt($this.val(), 10);

                if (value === 0) {
                    $audioButton.html('<i class="ion-md-volume-mute"></i>');
                } else if (value > 0 && value < 70) {
                    $audioButton.html('<i class="ion-md-volume-low"></i>');
                } else if (value > 70) {
                    $audioButton.html('<i class="ion-md-volume-high"></i>');
                }
            })
        },

        //=> Add audio in player on click of card
        addAudioInPlayer: function () {
            var $audio = $('a[data-audio]');

            $audio.on('click', function () {
                var audioData = $(this).data('audio');
                Amplitude.removeSong(0);
                Amplitude.playNow(audioData);
            })
        }
    };

    //=> Call class at document ready
    $(document).ready(AudioPlayer.init);
});
