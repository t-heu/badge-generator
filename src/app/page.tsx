"use client";
import { useState } from "react";
import Image from "next/image";

import styles from "./page.module.css";

const routePath = process.env.NODE_ENV === "development" ? '/' : '/badge-generator/';

export default function Home() {
  const [tool, setTool] = useState("");
  const [badgeUrl, setBadgeUrl] = useState("");

  const popularBadges = [
    {
      url: '![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)',
      preview: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white'
    },
    {
      url: '![html5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)',
      preview: 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white'
    },
    {
      url: '![ts](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)',
      preview: 'https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white'
    },
    {
      url: '![css3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)',
      preview: 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white'
    },
    {
      url: '![github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)',
      preview: 'https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white'
    },
    {
      url: '![x](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=X&logoColor=white)',
      preview: 'https://img.shields.io/badge/X-000000?style=for-the-badge&logo=X&logoColor=white'
    },
    {
      url: '![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)',
      preview: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white'
    },
    {
      url: '![React Native](https://img.shields.io/badge/React Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)',
      preview: 'https://img.shields.io/badge/React Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'
    },
    {
      url: '![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)',
      preview: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white'
    },
    {
      url: '![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)',
      preview: 'https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white'
    },
    {
      url: '![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)',
      preview: 'https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white'
    },
    {
      url: '![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)',
      preview: 'https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white'
    },
    {
      url: '![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)',
      preview: 'https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white'
    },
    {
      url: '![nginx](https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white)',
      preview: 'https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white'
    },
    {
      url: '![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)',
      preview: 'https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white'
    },
    {
      url: '![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)',
      preview: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white'
    },
    {
      url: '![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)',
      preview: 'https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black'
    },
    {
      url: '![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)',
      preview: 'https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white'
    },
    {
      url: '![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)',
      preview: 'https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white'
    },
    {
      url: '![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)',
      preview: 'https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white'
    },
    {
      url: '![figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white)',
      preview: 'https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white'
    },
    {
      url: '![expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=Expo&logoColor=white)',
      preview: 'https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=Expo&logoColor=white'
    },
    {
      url: '![php](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=PHP&logoColor=white)',
      preview: 'https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=PHP&logoColor=white'
    },
    {
      url: '![sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white)',
      preview: 'https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=white'
    }
  ]

  const generateBadge = async () => {
    if (tool) {
      const formattedTool = tool.trim().toLowerCase(); // Removendo espaços extras e convertendo para minúsculas
  
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/simple-icons@latest/_data/simple-icons.json"
        );
  
        if (!response.ok) {
          alert("Falha ao carregar os dados dos ícones.");
          return;
        }
  
        const data = await response.json();
  
        if (!Array.isArray(data)) {
          alert("Formato de dados inesperado.");
          return;
        }
  
        const data2 = await fetch(`${routePath}dataCustom.json`);
        const dataCustom = await data2.json();
        const mergedArray = [...data, ...dataCustom];
        
        // Função para verificar se o termo está no title ou nos aliases
        const findIcon = (item: any) => {
          
          const titleMatch = item.title.toLowerCase() === formattedTool;
          const aliasMatch =
            item.aliases &&
            item.aliases.aka &&
            item.aliases.aka.some((alias: any) => alias.toLowerCase() === formattedTool);
          
          return titleMatch || aliasMatch;
        };
  
        // Procurar no array usando a função personalizada
        const icon = mergedArray.find(findIcon);
        
        // Se encontrou, pega a cor, senão usa preto como fallback
        const color = icon ? icon.hex : "000000";
        const title = icon ? icon.title : formattedTool;
        // Gerando o URL do badge com a cor correta
        const url = `https://img.shields.io/badge/${title}-${color}?style=for-the-badge&logo=${title.replace(/\s+/g, "")}&logoColor=white`;
  
        setBadgeUrl(url);
      } catch (error) {
        console.error("Erro ao buscar a cor da ferramenta:", error);
        setBadgeUrl(
          `https://img.shields.io/badge/${formattedTool}-black?style=for-the-badge&logo=${formattedTool.replace(/\s+/g, "")}&logoColor=white`
        );
      }
    }
  };  
  
  // Função para copiar o código para a área de transferência
  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(link);
    alert('Copied!')
  };

  return (
    <div className={styles.page}>
      <h1>Badge Maker for README🏆🏅</h1>
      <input
        type="text"
        placeholder="Digite o nome da ferramenta..."
        value={tool}
        onChange={(e) => setTool(e.target.value)}
      />
      <button onClick={generateBadge} className={styles.buttonGenerateBadge}>
        Gerar Badge
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
          <p>Copy code:
            <button onClick={() => copyToClipboard(`![${tool}](${badgeUrl})`)} title="copy">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M16 2H6C4.9 2 4 2.9 4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 18H6V4h10v16zM8 8h8v2H8z"/>
              </svg>
            </button>
          </p>
          <code>![{tool}]({badgeUrl})</code>
        </div>
      )}

      <p className={styles.badge_message}>
        To get the badge correctly, search using the exact formatting. For example, instead of <code>env</code>, search for <code>.env</code>, or instead of <code>nextjs</code>, search for <code>next.js</code>
      </p>

      <h2>Popular Badges ⭐</h2>
      <div className={styles.badgesPopular}>
        {
          popularBadges.map((res: any, i) => (
            <button key={i} onClick={() => copyToClipboard(res.url)}>
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
    </div>
  );
}
