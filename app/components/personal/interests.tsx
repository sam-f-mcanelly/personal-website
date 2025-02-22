import AmazonBookCard from './cards/amazon-book-card';
import SpotifyPodcastCard from './cards/spotify-podcast-card';
import YouTubeCard from './cards/youtube-card';

export default function Interests() {
  return (
    <section id="interests" className="py-8">
      <h2 className="text-3xl font-bold mb-6 text-neutral-heading">Things That Interest Me</h2>

      {/* Books subsection */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-neutral-subheading">Books</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AmazonBookCard
            title="Designing Data-Intensive Applications"
            author="Martin Kleppmann"
            imageUrl="/images/books/system_design.jpg"
            amazonLink="https://www.amazon.com/dp/1449373321"
          />
          <AmazonBookCard
            title="The Bitcoin Standard"
            author="Saifedean Ammous"
            imageUrl="/images/books/bitcoin_standard.jpg"
            amazonLink="https://www.amazon.com/dp/1119473861"
          />
          <AmazonBookCard
            title="Little Brother"
            author="Cory Doctorow"
            imageUrl="/images/books/little_brother.jpg"
            amazonLink="https://www.amazon.com/dp/0765323117"
          />
        </div>
      </div>

      {/* Podcasts subsection */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-neutral-subheading">Podcasts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <SpotifyPodcastCard
            title="Lex Fridman Podcast"
            imageUrl="/images/podcasts/lex.jpg"
            spotifyLink="https://open.spotify.com/show/2MAi0BvDc6GTFvKFPXnkCL"
            buttonType="spotify"
          />
          <SpotifyPodcastCard
            title="The Pomp Podcast"
            imageUrl="/images/podcasts/pomp.jpg"
            spotifyLink="https://open.spotify.com/show/0bn8XQHWGxXULjhp1jRmOJ"
            buttonType="spotify"
          />
          <SpotifyPodcastCard
            title="This Week in Tech"
            imageUrl="/images/podcasts/twit.webp"
            applePodcastLink="https://podcasts.apple.com/us/podcast/this-week-in-tech-mp3/id73329404"
            buttonType="apple"
          />
        </div>
      </div>

      {/* YouTube channels subsection */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-neutral-subheading">YouTube Channels</h3>
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
