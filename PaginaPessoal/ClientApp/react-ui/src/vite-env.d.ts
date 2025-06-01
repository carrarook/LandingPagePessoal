/// <reference types="vite/client" />

// Declaração simples para arquivos SVG
declare module '*.svg' {
    const content: string;
    export default content;
}

// Declaração para arquivos CSS
declare module '*.css' {
    const content: Record<string, string>;
    export default content;
}