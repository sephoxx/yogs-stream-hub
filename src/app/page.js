import styles from "./page.module.css";
import Everything from "./components/Everything/Everything";
import config from "@/config";
import youtubeRequestBody from "@/data/youtubeRequestBody.json";

async function getLiveStreamId() {
  const id = await fetch(`https://www.youtube.com/youtubei/v1/browse?key=${config.youtubeApiKey}&prettyPrint=false`, { method: "POST", body: JSON.stringify(youtubeRequestBody), cache: "no-cache" })
    .then((res) => res.json())
    .then((data) => {
      let content = data.contents.twoColumnBrowseResultsRenderer.tabs.find((tab) => tab.tabRenderer.title === "Live");
      content = content.tabRenderer.content.richGridRenderer.contents;

      // Find live stream
      let video = content.find(
        (video) => video.richItemRenderer.content.videoRenderer.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.style === "LIVE"
      );

      // If there's no live stream, find upcoming stream
      if (video === undefined) {
        video = content.find(
          (video) => video.richItemRenderer.content.videoRenderer.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.style === "UPCOMING"
        );

        // If there's no upcoming stream, return null
        if (video === undefined) {
          return null;
        }
      }

      // Return video ID
      return video.richItemRenderer.content.videoRenderer.videoId;
    });

  return id;
}

export default async function Home() {
  const liveID = await getLiveStreamId();
  return (
    <main className={styles.main}>
      <Everything liveID={liveID} />
    </main>
  );
}
