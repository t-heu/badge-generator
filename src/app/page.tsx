"use client";
import { useState } from "react";
import Image from "next/image";

import popularBadges from "./popularBadges.json";
import styles from "./page.module.css";

const routePath = process.env.NODE_ENV === "development" ? '/' : '/badge-generator/';

export default function Home() {
  const [tool, setTool] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [badgeUrl, setBadgeUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const generateBadge = async () => {
    if (!inputValue) return;
  
    const formattedTool = inputValue.trim().toLowerCase();
    setTool(formattedTool);
  
    try {
      const [data, dataCustom] = await Promise.all([
        fetch("https://cdn.jsdelivr.net/npm/simple-icons@latest/_data/simple-icons.json").then(res => res.json()),
        fetch(`${routePath}dataCustom.json`).then(res => res.json())
      ]);
  
      const mergedArray = [...data, ...dataCustom];
      const icon = mergedArray.find((item: any) =>
        item.title.toLowerCase() === formattedTool ||
        item.aliases?.aka?.some((alias: any) => alias.toLowerCase() === formattedTool)
      );
  
      const color = icon?.hex || "000000";
      const title = icon?.title || formattedTool;
      const logo = icon?.logo || title.replace(/\s+/g, "-").toLowerCase();
      const fill = icon?.fill ? icon.fill : 'white';
  
      setBadgeUrl(`https://img.shields.io/badge/${title.replace(/\s+/g, "%20")}-${color}?style=for-the-badge&logo=${logo}&logoColor=${fill}`);
    } catch (error) {
      console.error(error);
    }
  };

  // Função para copiar o código para a área de transferência
  const copyToClipboard = (link: string, activeAlert = false) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000)
    if (activeAlert) alert('Copied')
  };

  return (
    <main className={styles.main}>
      <h1>Badge Maker for README 🏆🏅</h1>

      <input
        type="text"
        placeholder="Search tool name... (ex: rust)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={generateBadge} className={styles.buttonGenerateBadge}>
        Search badge
      </button>

      {badgeUrl && (
        <div className={styles.badgeContent}>
          <Image 
            src={badgeUrl} 
            alt="Badge" 
            height={120}
            width={120}
            className={styles.imgBadge}
          />
          
          <div className={styles.copy}>
            <code>![{tool}]({badgeUrl})</code>
            <button onClick={() => copyToClipboard(`![${tool}](${badgeUrl})`)} title="copy code">
              {copied ? "Copied" : "Copy"}
            </button> 
          </div>
        </div>
      )}

      <p className={styles.toast}>
        To get the badge correctly, search using the exact formatting. For example, instead of <code>env</code>, search for <code>.env</code>, or instead of <code>nextjs</code>, search for <code>next.js</code>
      </p>

      <h2>Popular Badges ⭐</h2>
      <br />
      <p>Click on any popular badge to copy.</p>
      <div className={styles.badgesPopular}>
        {
          popularBadges.map((res: any, i) => (
            <button title="Copy" key={i} onClick={() => copyToClipboard(res.url, true)}>
              <Image 
                src={res.preview} 
                alt="Badge" 
                height={200}
                width={200}
                className={styles.imgBadge}
              />
            </button>
          ))
        }
      </div>
    </main>
  );
}
