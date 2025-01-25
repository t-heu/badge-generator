"use client";
import { useState } from "react";
import Image from "next/image";

import styles from "./page.module.css";

const routePath = process.env.NODE_ENV === "development" ? '/' : '/badge-generator/';

export default function Home() {
  const [tool, setTool] = useState("");
  const [badgeUrl, setBadgeUrl] = useState(""); 

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
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`![${tool}](${badgeUrl})`);
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
          <div>
            <Image 
              src={badgeUrl} 
              alt="Badge" 
              height={200}
              width={200}
              layout="responsive"
              className={styles.imgBadge}
            />
          </div>
          <p>Copie este código:
            <button onClick={copyToClipboard} title="copy">
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
    </div>
  );
}
