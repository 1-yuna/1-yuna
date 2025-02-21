import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=YUNA%20CODE&fontSize=90)

<!--# Hi there 👋-->
<!--## 이런 환경에 익숙해요 !!✍🏼-->

## 📚 STACKS
![Java](https://img.shields.io/badge/Java-007396.svg?&style=for-the-badge&logo=Java&logoColor=white)
![Spring](https://img.shields.io/badge/Spring-6DB33F.svg?&style=for-the-badge&logo=spring&logoColor=white)
![JPA](https://img.shields.io/badge/JPA-000000.svg?&style=for-the-badge&logo=hibernate&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1.svg?&style=for-the-badge&logo=mysql&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=react&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled_Components-DB7093.svg?&style=for-the-badge&logo=styledcomponents&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4.svg?&style=for-the-badge&logo=tailwindcss&logoColor=white)


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