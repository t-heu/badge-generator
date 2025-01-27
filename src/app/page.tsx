"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import popularBadges from "./popularBadges.json";
import styles from "./page.module.css";

const routePath = process.env.NODE_ENV === "development" ? '/' : '/badge-generator/';

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [badgeUrl, setBadgeUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detectar o tema do sistema operacional ou o armazenado no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkMode);
    }
  }, []);

  // Aplicar o tema no atributo HTML e salvar a preferência
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Função para alternar manualmente o tema
  const toggleDarkMode = () => setIsDarkMode(prevMode => !prevMode);

  const generateBadge = async () => {
    if (!inputValue) return;
  
    const formattedTool = inputValue.trim().toLowerCase();
  
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
  
      setBadgeUrl(`![${formattedTool}](https://img.shields.io/badge/${title.replace(/\s+/g, "%20")}-${color}?style=for-the-badge&logo=${logo}&logoColor=${fill})`);
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

  // Função para copiar o código para a área de transferência
  const cleanURL = (link: string,) => {
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = link.match(regex);

    if (match) {
      return String(match[1])
    } else {
      return '![404](https://img.shields.io/badge/404-000000?style=for-the-badge&logo=404&logoColor=white)'
    }
  };

  return (
    <main className={styles.main}>
      <button
        onClick={toggleDarkMode}
        className={styles.theme_toggle_btn}
      >
        {isDarkMode ? '☼' : '☾'}
      </button>

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
            src={cleanURL(badgeUrl)} 
            alt="Badge" 
            height={120}
            width={120}
            className={styles.imgBadge}
          />
          
          <div className={styles.copy}>
            <code>{badgeUrl}</code>
            <button onClick={() => copyToClipboard(badgeUrl)} title="copy code">
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
