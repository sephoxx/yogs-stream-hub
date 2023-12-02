"use client";

import { Fragment, useEffect, useState } from "react";
import styles from "./Everything.module.css";
import twitchIcon from "/public/twitch-icon.svg";
import youtubeIcon from "/public/youtube-icon.svg";
import config from "@/config";
import { Splitter, SplitterPanel } from "primereact/splitter";



const Everything = ({ liveID }) => {
  const [playerToggle, setPlayer] = useState(null); // true = twitch, false = youtube
  const [disablePassThrough, setDisablePassThrough] = useState(false);

  useEffect(() => {
    const preference = window.localStorage.getItem("playerToggle");
    setPlayer(typeof preference === "string" ? preference === "twitch" : true);

    const handleMouseDown = (e) => {
      const target = e.target.getAttribute("data-pc-section");
      console.log(target);
      if (target === "gutter" || target === "gutterhandler") {
        setDisablePassThrough(true);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    if (playerToggle !== null) window.localStorage.setItem("playerToggle", playerToggle ? "twitch" : "youtube");
  }, [playerToggle]);

  return (
    <Splitter style={{ width: "100%" }} onResizeEnd={() => {
      setDisablePassThrough(false);
    }}>
      <SplitterPanel className={styles.player} size={80}>
        {playerToggle !== null && <iframe
          className={styles.playerIframe}
          style={{ pointerEvents: disablePassThrough ? "none" : "initial" }}
          src={
            playerToggle
              ? `https://player.twitch.tv/?channel=yogscast&parent=${config.parentDomain}`
              : `https://www.youtube.com/embed/${liveID}?autoplay=1`
          }
          allow="fullscreen;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />}
      </SplitterPanel>
      <SplitterPanel className={styles.chatSidebar} size={15}>
        <div className={styles.chatToolbar}>
          <button
            className={`${styles.button}`}
            style={{ borderColor: playerToggle ? "#6441a4" : "red" }}
            onClick={() => {
              setPlayer(true);
            }}
          >
            <img src={twitchIcon.src} width={20} height={20} alt="twitch-toggle" />
          </button>
          <button
            className={`${styles.button}`}
            style={{ borderColor: playerToggle ? "#6441a4" : "red" }}
            onClick={() => {
              setPlayer(false);
            }}
          >
            <img src={youtubeIcon.src} width={20} height={20} alt="youtube-toggle" />
          </button>
        </div>
        <Splitter
          className={styles.chatContainer}
          layout="vertical"
          onResizeEnd={() => {
            setDisablePassThrough(false);
          }}
        >
          <SplitterPanel className={styles.chat}>
            <iframe
              src={`https://www.twitch.tv/embed/yogscast/chat?parent=${config.parentDomain}&darkpopout`}
              style={{ pointerEvents: disablePassThrough ? "none" : "initial" }}
            />
          </SplitterPanel>
          <SplitterPanel className={styles.chat}>
            <iframe
              src={`https://www.youtube.com/live_chat?v=${liveID}&embed_domain=${config.parentDomain}&dark_theme=1`}
              style={{ pointerEvents: disablePassThrough ? "none" : "initial" }}
            />
          </SplitterPanel>
        </Splitter>
      </SplitterPanel>
    </Splitter>
  );
};

export default Everything;
