import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=YUNA%20CODE&fontSize=90)

<!--# Hi there 👋-->
<!--## 이런 환경에 익숙해요✍🏼-->

## 📚STACKS
<div>
  <img alt="" src="https://img.shields.io/badge/java-FF0000?logo=java&logoColor=white"/> 
</div>
<div>
  <img alt="" src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"> 
</div>
<div>
  <img alt="" src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> 
</div>
<div>
  <img alt="" src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
</div>
<div>
  <img alt="" src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
</div>
<div>
  <img alt="" src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> 
</div>
<div>
  <img alt="" src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> 
</div>
<div>
  <img alt="" src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> 
</div>
<div>
  <img alt="" src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
</div>


<!--<p>-->
<!--  <img alt="" src= "https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> -->
<!--  <img alt="" src= "https://img.shields.io/badge/TypeScript-black?logo=typescript&logoColor=blue"/>-->
<!--</p>-->

[![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=1-yuna)](https://github.com/anuraghazra/github-readme-stats)

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