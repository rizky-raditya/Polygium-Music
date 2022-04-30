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
                    "discovery": {
                        songs: [
                            {
                                "name": "Build a Bitch",
                                "artist": "Bella Poarch",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigtkwvppk6lycqlpldox34gjpczeyhzsgj5ktjstgkmosa7vnn4ou",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/Bella Poarch-Build a Bitch.jpg"
                            },
							{
                                "name": "STAY",
                                "artist": "The Kid LAROI, Justin Bieber",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeihn5oiw2dlcydkt6uinzj45dvcjqtysrnkksfdf6wmxp34qmzpb5i",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/The Kid LAROI, Justin Bieber-STAY.jpg"
                            },
                            {
                                "name": "MONTERO (Call Me By Your Name)",
                                "artist": "Lil Nas X",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidigvsiksxxwcqyrp52cj2v7s6ryuleuqhmsoxqkq5qdcexo2qmtm",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/Lil Nas X-MONTERO (Call Me By Your Name).jpg"
                            },
                            {
                                "name": "good 4 u",
                                "artist": "Olivia Rodrigo",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiczxzcn4vc2mauqxrwkxxsm2a6mpagtcswocv5dmky6jy3bh7vwlm",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/Olivia Rodrigo-good 4 u.jpg"
                            }
                        ]
                    },
                    "release": {
                        songs: [
                            {
                                "name": "Easy On Me",
                                "artist": "Adele",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/QmXwhTsvwPEJh6dPNnboNQzSEKY56FyZJoFrTNHfGiuLXp",
                                "cover_art_url": "https://files-music.polygium.com/image/release/adele.jpg"
                            },
                            {
                                "name": "Heat Waves",
                                "artist": "Glass Animals",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/QmNu7LbcdvZr8mfSUMurBJn49Q6V1AuCs6AhHJR2FfDK1d",
                                "cover_art_url": "https://files-music.polygium.com/image/release/glassanimals.jpg"
                            },
                            {
                                "name": "Abcdefu",
                                "artist": "Gayle",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/QmaDs1oFv5BdyxxQmrC6EZn9dQ54wL8raLnkoNaHP8P9Ap",
                                "cover_art_url": "https://files-music.polygium.com/image/release/gayle.jpg"
                            },
                            {
                                "name": "The Joker And The Queen(Feat. Taylor Swift)",
                                "artist": "Ed Sheeran",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/Qmd3RxtWKajEmPP2n2x3zS5K8YvG746dYrUgeTdFtRLqZM",
                                "cover_art_url": "https://files-music.polygium.com/image/release/edsheeran.jpg"
                            },
                            {
                                "name": "STAY",
                                "artist": "The Kid LAROI",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/QmY5ZL152JVJZowhVKtNC737dANbErMpfsvh7rwDmsTUHA",
                                "cover_art_url": "https://files-music.polygium.com/image/release/thekidlaroi.jpg"
                            },
                            {
                                "name": "Shivers",
                                "artist": "Ed Sheeran",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/QmXYWLE2g8Krk2GKU8qpdyorqmMd6XwPcUfV8JuH1VcVuq",
                                "cover_art_url": "https://files-music.polygium.com/image/release/edsheeran.jpg"
                            },
                            {
                                "name": "Ghost",
                                "artist": "Justin Bieber",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/Qmc1ucD2NhvrncuiLRM5B6EnndXzCffCUK43AwH6rsU2su",
                                "cover_art_url": "https://files-music.polygium.com/image/release/justinbieber.jpg"
                            },
							{
                                "name": "THATS WHAT I WANT",
                                "artist": "Lil Nas X",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/Qmc1ucD2NhvrncuiLRM5B6EnndXzCffCUK43AwH6rsU2su",
                                "cover_art_url": "https://files-music.polygium.com/image/release/lilnasx.jpg"
                            },
                            {
                                "name": "Need to Know",
                                "artist": "Doja Cat",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/QmbQpnuW81s3yPcv1qAZE5p4dxqko32PWPc4AiWCimTXD3",
                                "cover_art_url": "https://files-music.polygium.com/image/release/dojacat.jpg"
                            }
                        ]
                    },
					    "tiktok": {
                        songs: [
                            {
                                "name": "Build a Bitch",
                                "artist": "Bella Poarch",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigtkwvppk6lycqlpldox34gjpczeyhzsgj5ktjstgkmosa7vnn4ou",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/Bella Poarch-Build a Bitch.jpg"
                            },
							{
                                "name": "STAY",
                                "artist": "The Kid LAROI, Justin Bieber",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeihn5oiw2dlcydkt6uinzj45dvcjqtysrnkksfdf6wmxp34qmzpb5i",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/The Kid LAROI, Justin Bieber-STAY.jpg"
                            },
                            {
                                "name": "MONTERO (Call Me By Your Name)",
                                "artist": "Lil Nas X",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidigvsiksxxwcqyrp52cj2v7s6ryuleuqhmsoxqkq5qdcexo2qmtm",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/Lil Nas X-MONTERO (Call Me By Your Name).jpg"
                            },
                            {
                                "name": "good 4 u",
                                "artist": "Olivia Rodrigo",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiczxzcn4vc2mauqxrwkxxsm2a6mpagtcswocv5dmky6jy3bh7vwlm",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/Olivia Rodrigo-good 4 u.jpg"
                            }
                        ]
                    },
                    "accoustics": {
                        songs: [
                            {
                                "name": "Billionaire ft Bruno Mars",
                                "artist": "Travie McCoy, Bruno Mars",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigofct4vsqvh3suhh2kwozkupjlahekbt2voh4ctlnug7xlok32ie",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Travie McCoy-Billionaire ft Bruno Mars.jpg"
                            },
                            {
                                "name": "Stay With Me Cover by Jona Selle",
                                "artist": "Sam Smith, Jona Selle",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeibj36ymjzg7ukkn3bbdyzj7xc64j4ldk6mdcqygp3iifr5qew2voy",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Sam Smith-Stay With Me.jpg"
                            },
                            {
                                "name": "Let Her Go",
                                "artist": "Passenger",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiesbxqn35e3addh3clmytegjouarculvdeyl2dfri4ntnrocwx4jy",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Passenger-Let Her Go.jpg"
                            },
                            {
                                "name": "Free Fallin",
                                "artist": "John Mayer",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifn7w3woiuiiitf6gcycxggcnvohxc6nfx7slyceufdhv6xe52em4",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/John Mayer-Free Fallin.jpg"
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
                            },
                            {
                                "name": "Pompeii",
                                "artist": "Bastille",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeibanzto4yb34n53oj5mdcvgrdb5c6reg45k5szi72cueefqklfh7y",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Bastille-Pompeii.jpg"
                            },
                            {
                                "name": "All of Me cover John Legend",
                                "artist": "Boyce Avenue, John Legend",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigt74ad66lzcgv2ge3sb5evw64djnkjnukm5oyus3g26rddnvugn4",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Boyce Avenue-All of Me cover John Legend.jpg"
                            },
                            {
                                "name": "Endless Love (Boyce Avenue ft Connie Talbot)",
                                "artist": "Boyce Avenue, Connie Talbot",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeibzladfv33nkjqzxpq5x4dm6k6bcjqs2xz6yjsxkre4mergrv5k4m",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Lionel Richie, Diana Ross - Endless Love (Boyce Avenue ft Connie Talbot).jpg"
                            },
                            {
                                "name": "Photograph (Boyce Avenue feat Bea Miller)",
                                "artist": "Boyce Avenue, Bea Miller",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidvmzptdj6i5cy4yrygyk4z7ckfwv4hxo7xgddjey3e5gfr7ebxwa",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Ed Sheeran- Photograph (Boyce Avenue feat Bea Miller).jpg"
                            },
                            {
                                "name": "We Cant Stop (Cover Boyce Avenue feat Bea Miller)",
                                "artist": "Boyce Avenue, Bea Miller)",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeicox4cne6e2vwomkhfrguhoavpxkkezannpp2pa7jj3cgq66v6bie",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Miley Cyrus-We Cant Stop (Cover Boyce Avenue feat Bea Miller).jpg"
                            },
                            {
                                "name": "I Want It That Way (ft Francis Greg)",
                                "artist": "Music Travel Love, Francis Greg",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeif7gvo24xmqx57zecc4hx6htlrdxkpcazzeluyqce7jbwg7gafemi",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Backstreet Boys-I Want It That Way (ft Francis Greg).jpg"
                            },
                            {
                                "name": "Forget Me Not (feat Dorian)",
                                "artist": "Andra, Dorian",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeieyoc3al5zjq2vgs6d7cdmvdfmyzdnbgjcjt4p3gn7glch7mkftvq",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Andra-Forget Me Not (feat Dorian).jpg"
                            },
                            {
                                "name": "As the World Caves In(ft. Sarah Cothran)",
                                "artist": "Mat Maltese, Sarah Cothran",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeif6ppowswz6ttu3crwebsaka6txeg5bgj36gtozei5dxgmjj3scfm",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Mat Maltese-As the World Caves In(ft. Sarah Cothran).jpg"
                            },
                            {
                                "name": "(Everything I Do) I Do It For You",
                                "artist": "Boyce Avenue, Connie Talbot",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeickxvchcd3v75lsirtz63jlhcrn72gik3um6p4kkqj65evmfmnlny",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Bryan Adams-(Everything I Do) I Do It For You (Cover Boyce Avenue ft Connie Talbot).jpg"
                            },
                            {
                                "name": "Heaven",
                                "artist": "Boyce Avenue, Megan Nicole",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeicapbmlj7q45orn736rlvgxeddnmnkkwotkvrpbgywqsrvxde46im",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Bryan Adams-Heaven (Boyce Avenue feat Megan Nicole).jpg"
                            },
                            {
                                "name": "Too Close(Accoustics Cover)",
                                "artist": "Chris Black",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeicjv6d2yu6lympakwjahcdnlusthjrinscfuivghpgipjmqrr6fvm",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Chris Black-Too Close(Accoustics Cover).jpg"
                            },
                            {
                                "name": "All About That Bass",
                                "artist": "Scott Bradlee's Postmodern Jukebox",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiacz2n54wjoc3qkjafhwap3vdmidc775i7ggt6wb4fvw7n5wvk6oa",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/accoustics/Scott Bradlee's Postmodern Jukebox-All About That Bass.jpg"
                            }
                        ]
                    },
                    "chill": {
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
                                "name": "Waves (Robin Schulz Remix Radio Edit)",
                                "artist": "Mr Probz",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeietetxo3ou3kzio5zkdona3rway6fpi3qdarr3trvomg3nza67i4y",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/chill/Mr Probz-Waves (Robin Schulz Remix Radio Edit).jpg"
                            },
                            {
                                "name": "Favorite Crime",
                                "artist": "Olivia Rodrigo",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeicinqv4r5lsfaizmqfs2mdizlhklzwjlg7rsijnzln6unaxsukdum",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/chill/Olivia Rodrigo-Favorite Crime.jpg"
                            },
                            {
                                "name": "Terrified",
                                "artist": "Brynn Elliott",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeih5buioqqv6cpfcc5gfmqtwup5cy7awwzfrdok4uxqtvxzhfiee7u",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/chill/Brynn Elliott-Terrified.jpg"
                            },
                            {
                                "name": "Everything I Wanted",
                                "artist": "Billie Eilish",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeie6ny4rb754tnp36lntfxh77oszfjep2tsxoczbxqmn37r5pg2zs4",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/chill/Billie Eilish-Everything I Wanted.jpg"
                            },
                            {
                                "name": "CHICKEN TENDIES",
                                "artist": "Clinton Kane",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeichp6lgcvgxjd42yja6im53ve2hfdllgiulvmbs7pizh4o55pr2ge",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/chill/Clinton Kane-CHICKEN TENDIES.jpg"
                            },
                            {
                                "name": "As It Was",
                                "artist": "Harry Styles",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeig5mzc3pp3y4fe3gfox3zt3b2cg567cccxelsr2fcnryu4lcvihge",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/chill/Harry Styles-As It Was.jpg"
                            },
                            {
                                "name": "When You're Gone",
                                "artist": "Shawn Mendes",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiddpikuw3wfu5dvveg52nea4fo34mb6u5fmrtmvc64q6wdiyd5k5m",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/chill/Shawn Mendes-When You're Gone.jpg"
                            },
                            {
                                "name": "Dear Alcohol",
                                "artist": "Dax",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiezeccgvhkops3xityxb5e5tyfxcw4h3m7wicafhqejhwtu3sepra",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/chill/Dax-Dear Alcohol.jpg"
                            },
                            {
                                "name": "iPad",
                                "artist": "The Chainsmokers",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeihhabzgqobmo7smv6ha5s2hldiv6oysgqszi3avufzzcg2xmifjoy",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/chill/The Chainsmokers-iPad.jpg"
                            }
                        ]
                    },
                    "edm": {
                        songs: [
                            {
                                "name": "Closer ft Halsey",
                                "artist": "The Chainsmokers",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigd5b3jwyjnctn5wdgs4wrfjg3gtgwedmhdtezxvprbsxhaucksg4",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/edm/The Chainsmokers-Closer ft Halsey.jpg"
                            },
                            {
                                "name": "Lean On feat MØ",
                                "artist": "Major Lazer & DJ Snake",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeicav5aa6aipdkikbhnmunnqw7r7x3qv5aw6zdidffggzztoeku6lm",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/edm/Major Lazer & DJ Snake-Lean On feat MØ.jpg"
                            },
                            {
                                "name": "Rockabye feat Sean Paul & Anne-Marie",
                                "artist": "Clean Bandit",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidhhm22fqxar3ppwmm5mgptcozzb6eyjt3pzyelkkqjx7anxecux4",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/edm/Clean Bandit-Rockabye feat Sean Paul & Anne-Marie.jpg"
                            },
                            {
                                "name": "Disarm",
                                "artist": "BLOODMOON",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiheaskjiaczhebe6btbc6b6w4sjgcjpqmgb7v727oxzs2yzjsff7q",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/edm/BLOODMOON-Disarm.jpg"
                            },
                            {
                                "name": "Think Of Me feat SOUNDR",
                                "artist": "Blanke",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifqooy2mhcr65jwj6k3gygdymnjgvy4z62fh4uzz6xwso6dknrq4u",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/edm/Blanke-Think Of Me feat SOUNDR.jpg"
                            },
                            {
                                "name": "Faded",
                                "artist": "Alan Walker",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeihklt2p7hyk7rqmqm4ezjn56anuoveikr452djjtufsnk2rxrvud4",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/edm/Alan Walker-Faded.jpg"
                            },
                            {
                                "name": "Wake Me Up",
                                "artist": "Avicii",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeicu3wqctzttce5665bbwkacki42nys3kedkyaapvtpxbgj3zi5czm",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/edm/Avicii-Wake Me Up.jpg"
                            },
                            {
                                "name": "Fairytale",
                                "artist": "Alwz Snny, Sincerely Collins",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidzfmbazfq7vjynizh7pf4z26fy4wterw3cphjbwj3ox2uan7e6le",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/edm/Alwz Snny, Sincerely Collins-Fairytale.jpg"
                            },
                            {
                                "name": "LOVE AND HATE",
                                "artist": "Teenage Sauce,Chris Black",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeieaniphrcncuacm6fwebpga3ogpiauonjistzmp5huvduti2xt4fu",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/edm/Teenage Sauce,Chris Black-LOVE AND HATE.jpg"
                            },
                            {
                                "name": "Titanium (feat. Sia)",
                                "artist": "David Guetta",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigccu7mstm52jabzadfjh4dbuuqokqndmp335tk4k2dxstsi2eyqe",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/edm/David Guetta-Titanium (feat. Sia).jpg"
                            },
                            {
                                "name": "This Is What You Came For (feat. Rihanna)",
                                "artist": "Calvin Harris",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigmn6nmdhgh4envgbefv4cac67tiourv7uqx3p35di5bfhd3y7oqa",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/edm/Calvin Harris-This Is What You Came For (feat. Rihanna).jpg"
                            },
                            {
                                "name": "You Were Loved (with OneRepublic)",
                                "artist": "Gryffin",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigvp5rfknomxqggbnctzcp42iydadg5flqlrzpc27f5mwtv5kobay",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/edm/Gryffin-You Were Loved (with OneRepublic).jpg"
                            },
                            {
                                "name": "Something Just Like This",
                                "artist": "The Chainsmokers, Coldplay",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeif3bpvta24dl3eqzbzxtn62lwr23rohekiqdwdeqexhzllnydgjjm",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/edm/The Chainsmokers, Coldplay-Something Just Like This.jpg"
                            }
                        ]
                    },
                    "house": {
                        songs: [
                            {
                                "name": "Waiting All Night (WHTKD Remix)",
                                "artist": "Rudimental",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeie47gzozb42bvxkfzfdzsnyujj7vuppswqybsp5a27p5gkjq4bgea",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/house/Rudimental-Waiting All Night.jpg"
                            },
                            {
                                "name": "My Love ft Jess Glynne",
                                "artist": "Route 94, Jess Glynne",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifjrdztmq555vas6dylcn7yvy6bimgnmpsvk3efswpwps4v362eme",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/house/Route 94-My Love ft Jess Glynne.jpg"
                            },
                            {
                                "name": "Reflections",
                                "artist": "Dimitris Sakkas",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeih2vtnavxvcto2xi5pjgf2ly4iwl6cpbn3rmdgrms4sfjvyr6kzg4",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/house/Dimitris Sakkas-Reflections.jpg"
                            },
                            {
                                "name": "Piece Of Me",
                                "artist": "MK, Becky Hill",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiadesvp4y6mfvnhcs466hkejfpoa2xjrpouwgizjfmon3l3uq2yve",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/house/MK & Becky Hill-Piece Of Me.jpg"
                            },
                            {
                                "name": "Pieces",
                                "artist": "AVAION",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiguqmvwepk2mzej5jwgv4l4zkg3obh6zrhjoxp63os3liysj7v6le",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/house/AVAION-Pieces.jpg"
                            },
                            {
                                "name": "Why (feat Kallay Saunders)",
                                "artist": "Coyot, The Prince Karma, Kallay Saunders",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifuu26stq77uh2ijj6kl656uvo2h4thddoha4vk6k7qnu5zulptie",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/house/Coyot & The Prince Karma feat Kallay Saunders-Why.jpg"
                            }
                        ]
                    },
                    "party": {
                        songs: [
                            {
                                "name": "Breakbeat Mix#01",
                                "artist": "Dj Music",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigtv3aueebrog5g37czhs5txweotxm3nhufpyb3li442zoch4efja",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/party/Breakbeat.jpg"
                            },
                            {
                                "name": "Breakbeat Mix#02",
                                "artist": "Dj Music",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeicbp3mrmrtboi5jz7zpjyzwk6vhc5dkc6h6mu5ugkobdgmtxcg3hq",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/party/Breakbeat.jpg"
                            },
                            {
                                "name": "Breakbeat Mix#03",
                                "artist": "Dj Music",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeicqx2olunnrkida7eqx6vqradqgcex3yprmjyz5tdj6qcojxf5kgu",
                                "cover_art_url": "https://files-music.polygium.com/image/genre/party/Breakbeat.jpg"
                            }
                        ]
                    },
                    "top-global": {
                        songs: [
                            {
                                "name": "Envolver",
                                "artist": "Anitta",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifincxdhmsogwngcuhoxhc4fdpr5ol7w5dzcwvkwlo2yajiv2wrmq",
                                "cover_art_url": "https://files-music.polygium.com/image/global/Anitta-Envolver.jpg"
                            },
                            {
                                "name": "MAMIII",
                                "artist": "Becky G",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigpnngmsdralevg7ogsswjngcrxitt2etm7jac4ochmcjdhz5ed74",
                                "cover_art_url": "https://files-music.polygium.com/image/global/Becky G-MAMIII.jpg"
                            },
                            {
                                "name": "MIDDLE OF THE NIGHT",
                                "artist": "Elley Duhé",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiccmeowqpvq6e5ycy6gvip3pl32wpzhp2t2sawl3x7awecemixfp4",
                                "cover_art_url": "https://files-music.polygium.com/image/global/Elley Duhé-MIDDLE OF THE NIGHT.jpg"
                            },
                            {
                                "name": "Cold Heart (PNAU Remix)",
                                "artist": "Elton John",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigwbxfh3q42tp2ltidhprtzedjdothrj5a2kr7pzhnnbzt4ccp5pi",
                                "cover_art_url": "https://files-music.polygium.com/image/global/Elton John-Cold Heart (PNAU Remix).jpg"
                            },
                            {
                                "name": "abcdefu",
                                "artist": "GAYLE",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifo7cvt2p77vkbhedsodou5yl7maru6e6ybuu65lejbmyps75vx6a",
                                "cover_art_url": "https://files-music.polygium.com/image/global/GAYLE-abcdefu.jpg"
                            },
                            {
                                "name": "Heat Waves",
                                "artist": "Glass Animals",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeibi6l3hyg7dodo2qjew5r2bfo7hbtvb2p563zvba4deejvkcpw4oy",
                                "cover_art_url": "https://files-music.polygium.com/image/global/Glass Animals-Heat Waves.jpg"
                            },
                            {
                                "name": "Enemy (with JID) - from the series Arcane League of Legends",
                                "artist": "Imagine Dragons",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeig5a22wp7xk7gc5zl4fmt54ydho3ga3tjbim6no6daemsdj5zo2iu",
                                "cover_art_url": "https://files-music.polygium.com/image/global/Imagine Dragons-Enemy (with JID) - from the series Arcane League of Legends.jpg"
                            },
                            {
                                "name": "INDUSTRY BABY (feat. Jack Harlow)",
                                "artist": "Lil Nas X",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeicyfc56enzhdnx7p3h2hm3fxejdemdwrfajtbye6efizpeumz4oci",
                                "cover_art_url": "https://files-music.polygium.com/image/global/Lil Nas X-INDUSTRY BABY (feat. Jack Harlow).jpg"
                            },
                            {
                                "name": "STAY (with Justin Bieber)",
                                "artist": "The Kid LAROI",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigvvyqbbqddhruyyxyqshmosq43uwdta7dm76f7igonunydbck34a",
                                "cover_art_url": "https://files-music.polygium.com/image/global/The Kid LAROI-STAY (with Justin Bieber).jpg"
                            },
                            {
                                "name": "Plan A",
                                "artist": "Paulo Londra",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifmvwkwbt3qrhybqtxtfserdfqarfn5xeaatifkep4cghf6cztwtu",
                                "cover_art_url": "https://files-music.polygium.com/image/global/Paulo Londra-Plan A.jpg"
                            },
                            {
                                "name": "The Business",
                                "artist": "Tiësto",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeihvutngoaslxgo2drotiwrxr7kuioofzt7gwttokcex7qge3zbneu",
                                "cover_art_url": "https://files-music.polygium.com/image/global/Tiësto-The Business.jpg"
                            },
                            {
                                "name": "Blinding Lights",
                                "artist": "The Weeknd",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiathuiproyay6gp3uyni6wpokyi736ryijt4gmrndzifyirgjuzdy",
                                "cover_art_url": "https://files-music.polygium.com/image/global/The Weeknd-Blinding Lights.jpg"
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
                            },
                            {
                                "name": "HIT IT (feat. Saweetie & Lele Pons)",
                                "artist": "Black Eyed Peas",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeihxztgejb24ft43ujslacnki43hn67l6jm27pga2s3lkmsizikk3q",
                                "cover_art_url": "https://files-music.polygium.com/image/global/Black Eyed Peas-HIT IT (feat. Saweetie & Lele Pons).jpg"
                            },
                            {
                                "name": "Leave The Door Open",
                                "artist": "Bruno Mars, Anderson .Paak, Silk Sonic",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeig24fdplijujge4olw77uzft2wue4awpcusxjzhz4mfo5zqxhy274",
                                "cover_art_url": "https://files-music.polygium.com/image/global/Bruno Mars-Leave The Door Open.jpg"
                            }
                        ]
                    },
                    "relax": {
                        songs: [
                            {
                                "name": "",
                                "artist": "",
                                "album": "",
                                "url": "",
                                "cover_art_url": ""
                            }
                        ]
                    },
                    "top10-indonesia": {
                        songs: [
                            {
                                "name": "Mungkin Hari Ini Esok Atau Nanti",
                                "artist": "Anneth",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeid2w552xx5miqucueub675he7ruaamdyaisxoulqfzykmudjq2htq",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Anneth-Mungkin Hari Ini Esok Atau Nanti.jpg"
                            },
                            {
                                "name": "Bahagia Bersamamu",
                                "artist": "Haico",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidv57wupunl72kexjgmdpmtiprsyacggehntdhuv757spvwmzzjqa",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Haico-Bahagia Bersamamu.jpg"
                            },
                            {
                                "name": "Menghapus Jejakmu (feat Rejoz TheGROOVE)",
                                "artist": "Noah, Rejoz TheGROOVE",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeickgavfbramevcoms2aia7smacr47cld7pyfu5wykmotnxvus4uwa",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Noah-Menghapus Jejakmu (feat Rejoz TheGROOVE).jpg"
                            },
                            {
                                "name": "Melawan Restu",
                                "artist": "Mahalini",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeihkjubhxirhkkauhl6wqgomakmua4wg37aqwepiofn7zxzgkyc2xu",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Mahalini-Melawan Restu.jpg"
                            },
                            {
                                "name": "Cinta Sampai Mati",
                                "artist": "Raffa Affar",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeicu4dxdxqpnsoxw5tjmqeye7vblw4wt2bhjoq52opwf6rze4vf4ia",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Raffa Affar-Cinta Sampai Mati.jpg"
                            },
                            {
                                "name": "Hati-Hati di Jalan",
                                "artist": "Tulus",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigsngqai3gobsfvtzdg3q3kz23pjek3mc7p5guw3lblbkywi6u75e",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Tulus-Hati Hati Di Jalan.jpg"
                            },
                            {
                                "name": "Bertahan Terluka",
                                "artist": "Fabio Asher",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiala45ydz43tgawnesxktefjsgax27lrn3jgni4arjzw7msv274tq",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Fabio Asher-Bertahan Terluka.jpg"
                            },
                            {
                                "name": "Runtuh",
                                "artist": "Feby Putri, Fiersa Besari",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiawbnsjrmb54kqvgcd4v6ta46ha4gqioe422o3zs4pw3hpqc6jhfi",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Feby Putri-Runtuh.jpg"
                            },
                            {
                                "name": "Pesan Terakhir",
                                "artist": "Lyodra",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifrrof57afesj2dkathppaizir4tmcxrp65p4rukl5nw5vhy5vxmu",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Lyodra-Pesan Terakhir.jpg"
                            },
                            {
                                "name": "Sisa Rasa",
                                "artist": "Mahalini",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiawtql4ku6cf6rpwznzlbhv7w2nfrvyn7cofa45g6i5thohavtqgi",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Mahalini-Sisa Rasa.jpg"
                            },
                            {
                                "name": "Diri",
                                "artist": "Tulus",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiazpta5zio7wlhso5uusugcg5ifjp3yusra4ydb3nniyhxtg56pu4",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Tulus-Diri.jpg"
                            },
                            {
                                "name": "Merasa Indah",
                                "artist": "Tiara Andini",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeieyilztsiywy232mdogvcjwaqbnfvx6pxc7dudfaheauwqcokedna",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Tiara Andini-Merasa Indah.jpg"
                            },
                            {
                                "name": "Hingga Tua Bersama",
                                "artist": "Rizky Febian",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigpporxbv4b4ag4f3w5jn475vqdyp6acdhnidm56bioxygm3nk5rm",
                                "cover_art_url": "https://files-music.polygium.com/image/top-indonesia/Rizky Febian-Hingga Tua Bersama.jpg"
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
                    "dj": {
                        songs: [
                            {
                                "name": "High",
                                "artist": "The Chainsmokers",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeih2z4nybsmaiogenpb67ubn5x72fwg3dvv2fn3jc7tz7lgx6raa6q",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/The Chainsmokers-High.jpg"
                            },
                            {
                                "name": "Tokyo Drift",
                                "artist": "Teriyaki Boyz",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifmug7rsyl5iskh6z7bwrtayvmddoabwbrsdvwgv26ne2to3btfdq",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/Teriyaki Boyz-Tokyo Drift.jpg"
                            },
                            {
                                "name": "Headlights feat. KIDDO",
                                "artist": "Alok & Alan Walker",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeibn6qz5f5lvivvwuzbfdhlx4tklbla3qmb6yzdfvnb7mqftjomk2u",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/Alok & Alan Walker-Headlights.jpg"
                            },
                            {
                                "name": "Late Night Phone Call",
                                "artist": "Kyle Watson",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifwtlcgwpffunnnsqgnrcwglpuyqemlgaih2a7hbend74jpjmqlu4",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/Kyle Watson-Late Night Phone Call.jpg"
                            },
                            {
                                "name": "When I'm Gone",
                                "artist": "Alesso, Katy Perry",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigixcji4a3ioyrv2dfntasmwwnv4jvfjir4y5k7dnvmgipyshmuoq",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/Alesso, Katy Perry-When I'm Gone.jpg"
                            },
                            {
                                "name": "Run",
                                "artist": "Becky Hill, Galantis",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeic4dysl32mu56kqwhvvpkg6edfhnb5uon4azvtnbacgow2tstyxbm",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/Becky Hill, Galantis-Run.jpg"
                            },
                            {
                                "name": "Don't Be Shy",
                                "artist": "Tiësto & Karol G",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeihjqc3lsp3fw3ul5lljk5ilk6jkucpuw4qtrcvy77ptxats6tim64",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/Tiësto & Karol G-Don't Be Shy.jpg"
                            },
                            {
                                "name": "The Motto",
                                "artist": "Tiësto & Ava Max",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigtih7ftofyy5aqeldakvvvuhstb3xnlqw5cmtgfxbqdibntgry6u",
                                "cover_art_url": "https://files-music.polygium.com/image/dj/Tiësto & Ava Max-The Motto.jpg"
                            }
                        ]
                    },
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
                    },

                    "kangen-band": {
                        songs: [
                            {
                                "name": "Kau Begitu Cepat",
                                "artist": "Kangen Band",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeibr6fwtogj6zsmtx6yaeb66xqlvixghoyndx5aprged75fatowakm",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Kangen Band/Kangen Band-Kau Begitu Cepat.jpg"
                            },
                            {
                                "name": "Cinta Sampai Mati",
                                "artist": "Kangen Band",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiglygqpwbqghjt4fxbigf3675ggo2hf2xkwarr4segfvzxxokmx2y",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Kangen Band/Kangen Band-Cinta Sampai Mati.jpg"
                            },
                            {
                                "name": "Aku Ini Milik Siapa",
                                "artist": "Kangen Band",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeie26a4yzlxuaaszd3jr3is66kfeseu7leeqpr7oaeginwxitez6ce",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Kangen Band/Kangen Band-Aku Ini Milik Siapa.jpg"
                            },
                            {
                                "name": "Aku Rela",
                                "artist": "Kangen Band",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeibawbbfoan44rjmpnrpvam5j4o2itv4yi2zhr47ghiisqsuftwpgy",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Kangen Band/Kangen Band-Aku Rela.jpg"
                            },
                            {
                                "name": "Takkan Terganti",
                                "artist": "Kangen Band",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeicplph737eo5puawflqbcjyr33j47722kjlg53idx73mecvvxi25a",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Kangen Band/Kangen Band-Takkan Terganti.jpg"
                            },
                            {
                                "name": "Dengarkan Sayang",
                                "artist": "Kangen Band",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeih5cybb5seog6wofqr65qdwkpuundw2o2knx7pph5s5pzn5voxhbq",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Kangen Band/Kangen Band-Dengarkan Sayang.jpg"
                            },
                            {
                                "name": "Batinmu Telah Mati",
                                "artist": "Kangen Band",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeig7ocpm5cd7q3t3df3lldnzcdtding5idnkxwidublbqf35qdel5m",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Kangen Band/Kangen Band-Batinmu Telah Mati.jpg"
                            },
                            {
                                "name": "Cabut Tuduhanmu",
                                "artist": "Kangen Band",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeiebxsfiihzae7vxqpamypkf7htoinswpo4jmeqmauw2tpxqm5tewi",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Kangen Band/Kangen Band-Cabut Tuduhanmu.jpg"
                            },
                            {
                                "name": "Babang Tamvan",
                                "artist": "Kangen Band",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeia4g6ivplnbotmc5rorknb6ckyervhevgdlonlaekkl4p7gb2tuoe",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Kangen Band/Kangen Band-Babang Tamvan.jpg"
                            },
                            {
                                "name": "Sherin",
                                "artist": "Kangen Band",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeigs7qnhmxurjtcxnut3mavqgfmxy7dyfmyn7wisarhxchx5ze5ase",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Kangen Band/Kangen Band-Sherin.jpg"
                            },
                            {
                                "name": "Sesaknya Dada",
                                "artist": "Kangen Band",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeib6n2thf3zrueths5gotpivzelhev6iu3w4adqhfj56tps4xrh35m",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Kangen Band/Kangen Band-Sesaknya Dada.jpg"
                            },
                            {
                                "name": "Tentang Aku,Kau dan Dia",
                                "artist": "Kangen Band",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeieimhufkkwkg4su7il5w5afiwlewryoxfociu4qcxcktlvci5kpum",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Kangen Band/Kangen Band-Tentang Aku,Kau dan Dia.jpg"
                            },
                            {
                                "name": "Yolanda",
                                "artist": "Kangen Band",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifdj64rghgkykrmi4qtzc4n2eyroxbwveoudcnjyxbnua6zzpxafq",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Kangen Band/Kangen Band-Yolanda.jpg"
                            },
                            {
                                "name": "Pujaan Hati",
                                "artist": "Kangen Band",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeibyqxqjwa76cdqr2of3ikhf2ixpqacht3w3lpf4clg5fmrqqhliqu",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Kangen Band/Kangen Band-Pujaan Hati.jpg"
                            }

                           
                        ]
                    },

                    "fiersa-besari": {
                        songs: [
                            {
                                "name": "Harapan",
                                "artist": "Fiersa Besari",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidce4ojykbf5wx6zooaaipf4u2e4vtxcxzjxu2ptfib7khwpxuulq",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Fiersa Besari/Fiersa Besari-Harapan.jpg"
                            },
                            {
                                "name": "Melangkah Tanpamu",
                                "artist": "Fiersa Besari",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeieyzdwvisrf6eqirwrlliperzub3fqr2d6heqnwwrkwhwmnatvcry",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Fiersa Besari/Fiersa Besari-Melangkah Tanpamu.jpg"
                            },
                            {
                                "name": "Senja Bersayap",
                                "artist": "Fiersa Besari",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeidcrur5daeqf4lnmksfgewrajumjlvlfajoehhdvu5eupo35yejwy",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Fiersa Besari/Fiersa Besari-Senja Bersayap.jpg"
                            },
                            {
                                "name": "Garis Terdepan",
                                "artist": "Fiersa Besari",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeihahraw5bqtvc25vf2ji7v3hl22aieueax3vizbknpigkitegcwg4",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Fiersa Besari/Fiersa Besari-Garis Terdepan.jpg"
                            },
                            {
                                "name": "Celengan Rindu",
                                "artist": "Fiersa Besari",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifl7vu25fulxmthcruuhjlht4gc2cwprqjtundy7bfalsipeugm5i",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Fiersa Besari/Fiersa Besari-Celengan Rindu.jpg"
                            },
                            {
                                "name": "Belum Punah",
                                "artist": "Fiersa Besari",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeihemviivy4oeloc2ur2xyobfc4vr3gjuskllvyc6t6uqebpetlohm",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Fiersa Besari/Fiersa Besari-Belum Punah.jpg"
                            },
                            {
                                "name": "Waktu Yang Salah",
                                "artist": "Fiersa Besari",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeibh6i7kzzejhg4cirht6xifc7ufsszmzgn2bm2eol4lllqdazsyci",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Fiersa Besari/Fiersa Besari-Waktu Yang Salah.jpg"
                            },
                            {
                                "name": "Terima Kasih Dan Maaf",
                                "artist": "Fiersa Besari",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeifa7xqx3xt7e3rjajv4wouohimgr35z3i2dia3fvyw7swpmndfv5q",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Fiersa Besari/Fiersa Besari-Terima Kasih Dan Maaf.jpg"
                            },
                            {
                                "name": "Cerita Rakyat",
                                "artist": "Fiersa Besari",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeib7tmo7dcgffsf2qknqssbw2lqdbs65yg6gqe2rzrudys4h5ly6xq",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Fiersa Besari/Fiersa Besari-Cerita Rakyat.jpg"
                            },
                            {
                                "name": "April",
                                "artist": "Fiersa Besari",
                                "album": "",
                                "url": "https://cloudflare-ipfs.com/ipfs/bafybeif3ketkcni2mklntcszormpfas5gabkrc2dnodi6si3lzpucqi4w4",
                                "cover_art_url": "https://files-music.polygium.com/image/artist/Fiersa Besari/Fiersa Besari-April.jpg"
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
                Amplitude.audio(audioData);
                Amplitude.getActiveSongMetadata();
                Amplitude.play();
                Amplitude.pause();
                Amplitude.getSongs();
                Amplitude.getSongsState();
            })
        }
    };

    //=> Call class at document ready
    $(document).ready(AudioPlayer.init);
});
