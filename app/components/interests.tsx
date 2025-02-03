import AmazonBookCard from "./amazon-book-card";
import SpotifyPodcastCard from "./spotify-podcast-card";
import YouTubeCard from "./youtube-card";

export default function Interests() {
  return (
    <section id="interests" className="py-8">
      <h2 className="text-3xl font-bold mb-6 text-neutral-heading">
        Things That Interest Me
      </h2>

      {/* Books subsection */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-neutral-subheading">
          Books
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AmazonBookCard
            title="Designing Data-Intensive Applications"
            author="Martin Kleppmann"
            imageUrl="https://c.media-amazon.com/images/I/91rkMMsmkRL._SL1500_.jpg"
            amazonLink="https://www.amazon.com/dp/1449373321"
          />
          <AmazonBookCard
            title="The Bitcoin Standard"
            author="Saifedean Ammous"
            imageUrl="https://c.media-amazon.com/images/I/81gcXeUeOFL._SL1500_.jpg"
            amazonLink="https://www.amazon.com/dp/1119473861"
          />
          <AmazonBookCard
            title="Little Brother"
            author="Cory Doctorow"
            imageUrl="https://c.media-amazon.com/images/I/7180ja9QqeL._SL1500_.jpg"
            amazonLink="https://www.amazon.com/dp/0765323117"
          />
        </div>
      </div>

      {/* Podcasts subsection */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-neutral-subheading">
          Podcasts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <SpotifyPodcastCard
            title="Lex Fridman Podcast"
            imageUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/3e/e3/9c/3ee39c89-de08-47a6-7f3d-3849cef6d255/mza_16657851278549137484.png/300x300bb.webp"
            spotifyLink="https://open.spotify.com/show/2MAi0BvDc6GTFvKFPXnkCL"
            buttonType="spotify"
          />
          <SpotifyPodcastCard
            title="The Pomp Podcast"
            imageUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/b2/1b/00/b21b00c5-6cae-448d-ed1a-5c9a6d0d92e6/mza_6126566848874237960.jpeg/300x300bb.webp"
            spotifyLink="https://open.spotify.com/show/2QwpFjzJ0ZteqmMqw2xIfA"
            buttonType="spotify"
          />
          <SpotifyPodcastCard
            title="This Week in Tech"
            imageUrl="https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/9b/96/ac/9b96ac54-6ef1-9380-43ad-83f3066155a0/mza_10914428610214068995.jpg/300x300bb.webp"
            applePodcastLink="https://podcasts.apple.com/us/podcast/this-week-in-tech-mp3/id73329404"
            buttonType="apple"
          />
        </div>
      </div>

      {/* YouTube channels subsection */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-neutral-subheading">
          YouTube Channels
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <YouTubeCard
            title="Fly4Life"
            channelDescription="Team Fly4Life is a world-renowned group of professional skydivers dedicated to advancing flight skills and safety through coaching and camps. Their focus on dynamic flying and immersive training resonates with my own passion for skydiving, as I continually seek to push my skills and explore new dimensions of human flight."
            thumbnailUrl="/images/youtube/fly4life_thumbnail.jpg"
            videoLink="https://www.youtube.com/@TEAMFLY4LIFE"
          />
          <YouTubeCard
            title="Peter Santenello"
            channelDescription="Peter Santenello is a YouTuber known for immersive, documentary-style videos that explore cultures and communities worldwide. His unscripted storytelling highlights everyday people through authentic, human-centered insights."
            thumbnailUrl="/images/youtube/santenello_thumbnail.jpg"
            videoLink="https://www.youtube.com/@PeterSantenello"
          />
          <YouTubeCard
            title="Dirt Lifestyle"
            channelDescription="Dirt Lifestyle is a YouTube channel created by Nate Pickel, focusing on fabricating unique vehicles and testing them off-road. The channel emphasizes that “life is too short to stay on asphalt,” reflecting a passion for adventure and hands-on automotive projects. His channel has inspired some of my own projects."
            thumbnailUrl="/images/youtube/dirtlifestyle_thumbnail.jpg"
            videoLink="https://www.youtube.com/@DirtLifestyle"
          />
        </div>
      </div>
    </section>
  );
}
