import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `# Hi there 👋

## 이런 환경에 익숙해요✍🏼

## 언어

<p>
  <img alt="" src= "https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> 
  <img alt="" src= "https://img.shields.io/badge/TypeScript-black?logo=typescript&logoColor=blue"/>
</p>

## 📕 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://cs-by-yuna.tistory.com/rss'); // 본인의 블로그 주소

    text += `<ul>`;

    // 최신 10개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < 10; i++) {
        if (feed.items[i]) { // feed.items[i]가 존재하는지 확인
            const {title, link} = feed.items[i];
            console.log(`${i + 1}번째 게시물`);
            console.log(`추가될 제목: ${title}`);
            console.log(`추가될 링크: ${link}`);
            text += `<li><a href='${link}' target='_blank'>${title}</a></li>`;
        } else {
            console.log(`No more posts found after ${i} posts.`);
            break; // 더 이상 게시물이 없으면 종료
        }
    }

    text += `</ul>`;

    // README.md 파일 생성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    })
    console.log('업데이트 완료');
})();