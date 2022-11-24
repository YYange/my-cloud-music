import styled from "styled-components";
import style from "../../assets/global-style";
export const SwiperContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: auto;
  background: white;
  .before {
    position: absolute;
    top: -300px;
    height: 400px;
    width: 100%;
    background: ${style["theme-color"]};
  }
  .slider-container {
    position: relative;
    width: 98%;
    height: 160px;
    overflow: hidden;
    margin: auto;
    border-radius: 6px;
    .slider-nav {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
    }

    .swiper-pagination-bullet-active {
      background: ${style["theme-color"]};
    }
  }
`;

// export const SwiperContainer = styled.div`
//   position: relative;
//   width: 100%;
//   box-sizing: border-box;
//   height: 100%;
//   margin: auto;
//   background: white;
//   .swiper-container {
//     width: 98%;
//     border-radius: 6px;
//     overflow: hidden;
//     .slider-nav {
//       position: absolute;
//       display: block;
//       width: 100%;
//       height: 100%;
//     }
//     .swiper-pagination-bullet-active {
//       background: ${style["theme-color"]};
//     }
// .swiper-pagination-bullet {
//   height: 20px;
// }
//   }
//   .before {
//     position: absolute;
//     top: 0;
//     width: 100%;
//     height: 60%;
//     background: ${style["theme-color"]};
//     z-index: 1;
//   }
// `;
