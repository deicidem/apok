<template>
  <div class="wrapper">
    <app-header></app-header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  min-width: 1024px;
  width: 100%;

  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  font-family: "Montserrat", sans-serif;

  overflow: visible;
  color: #c7c7c7;
}

header,
nav,
section,
footer,
main,
article {
  display: block;
}

a {
  text-decoration: none;
}

img {
  display: block;
  object-fit: cover;
  width: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  padding: 20px;

  flex: 1 1 auto;
  background: #dfdfdf;
}

/*_____________________button_________________*/
.button {
  position: relative;

  padding: 0 24px;
  height: 35px;
  width: 190px;

  font-family: inherit;
  text-align: center;
  font-size: 0.875rem;
  border-radius: 10px;
  border: none;
  box-shadow: $shadow_small;
  transition: all 0.2s ease-out;
  cursor: pointer;
  z-index: 1;
  overflow: hidden;
  color: #fff;
  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 200%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.2s ease-out;
    z-index: -1;
  }
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 10px rgba(#000, 0.3);
  }
  &:active {
    transition: all 0.1s ease-out;
    transform: translateY(1px);
    box-shadow:  0 2px 4px rgba(#000, 0.1);
  }
  &:hover:after {
    transform: translateX(-25%);
  }
  &:active:after {
    transform: translateX(-75%);
  }
  &-g {
    &::after {
      background: $gradient;
    }
  }
  &-white {
    color: $color-main-dark;
    &::after {
      background: $gradient-w;
    }
  }
  &-r {
    color: #fff;
    &::after {
      background: $gradient-r;
    }
  }
  &-svg {
    background: $gradient_w;
    width: 30px;
    height: 30px;
    padding: 7px;
    img {
      max-width: 16px;
    }
  }
}

// ____________________input__________________
.input:active .input-label {
  display: block;
}
.input-wrapper:focus-within svg path {
  fill: $color-main;
}
.input {
  display: block;
  padding: 8px 15px;

  font-size: 14px;

  border-radius: 10px;
  border: none;
  border: 1px solid rgb($text-grey, 0.2);
  box-shadow: $shadow-small;
  color: $color-main-dark;
  &:focus-visible {
    border: 1px solid $color-main;
    outline: none;
  }
  &:focus ~ .input-label,
  &:valid ~ label {
    top: -6px;
    font-size: 12px;
    color: $color-main;
  }

  &-img {
    position: absolute;
    max-width: 26px;
    right: 15px;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &-withIcon {
    padding: 15px 24px;
    margin: 14px auto;
    width: 300px;
  }
  &-withoutIcon {
    padding-left: 8px;
    height: 35px;
    margin-right: 14px;
  }
  &-label {
    display: none;
  }
  &-wrapper {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    margin: 0;
    &:focus-within .input-label {
      color: $color-main;
      font-size: 12px;
      top: -6px;
    }
  }
}
.input-label {
  position: absolute;
  top: 28px;
  left: 20px;

  display: inline-block;
  padding-left: 24px;

  font-size: 14px;
  color: $text-grey;

  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
  pointer-events: none;
}

/*_____________________pagination_____________*/

.vs-pagination {
  &--active a {
    color: $color-main !important;
    font-weight: 600 !important;
    background-color: transparent !important;
  }
  li {
    a {
      color: $text-grey !important;
      &:hover {
        background-color: transparent !important;
        color: $color-main !important;
      }
    }
  }
}
/*_____________________vueScroll______________*/
.__vuescroll {
  display: flex;
  flex-direction: column;
}
.__panel {
  width: 100%;
}

/*______________________________________*/
@media screen and (max-width: 1440px) {
  .button {
    height: 28px;

    font-size: 0.75rem;
  }
  .input {
    font-size: 10px;
    padding: 12px 10px;
    &-img {
      max-width: 22px;
    }
    &-wrapper {
      .input-label {
        top: 8px;
      }
    }
  }
}
/*______________________________________*/
</style>


// html {
// 	height: 150%;
// }

// h1,
// p,
// button {
// 	font-family: Helvetica, sans-serif;
// 	font-weight: 100;
// 	color: #488589;
// }

// h1 {
// 	letter-spacing: 0.5em;
// 	text-align: center;
// 	margin-top: 50px;
// 	line-height: 1.6em;
// }

// p {
// 	font-size: 1.1em;
// 	text-align: center;
// 	margin: 110px auto 20px;
// 	letter-spacing: 0.05em;
// }

// .container {
// 	text-align: center;
// 	position: relative;
// 	width: 300px;
// 	margin: 0 auto;
// 	cursor: pointer;
// }

// button {
// 	position: relative;
// 	height: 50px;
// 	width: 280px;
// 	border: 0;
// 	border-radius: 5px;
// 	text-transform: uppercase;
// 	font-size: 1.1em;
// 	letter-spacing: 0.2em;
// 	overflow: hidden;
// 	box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
// 	z-index: 1;
//   cursor: pointer;
// }

// .button-one {
// }

// .fill-one {
// 	position: absolute;
// 	background-image: linear-gradient(to right, #FFFFFF, #E6F6F7);
// 	height: 70px;
// 	width: 420px;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// 	border-radius: 5px;
// 	z-index: -1;
// 	transition: all 0.1s ease-out;
// }
// .container-one {
//   transition: all 0.4s ease;
// }
// button:hover .fill-one {
// 	left: 75%
// }
//  button:active .fill-one {
// 	left: 25%;
// }

// .fill-two {
// 	position: absolute;
// 	background-image: linear-gradient(to right, #83B5B8, #618580);
// 	background-size: 150% 150%;
// 	height: 70px;
// 	width: 420px;
// 	border-radius: 5px;
// 	margin: -40px 0 0 -140px;
// 	z-index: -1;
// 	transition: all 0.4s ease;
// }

// .container-two:hover .fill-two {
// 	-webkit-animation: gradient 3s ease infinite;
// 	-moz-animation: gradient 3s ease infinite;
// 	animation: gradient 3s ease infinite;
// }

// @-webkit-keyframes gradient {
// 	0% {
// 		background-position: 0% 50%;
// 	}
// 	50% {
// 		background-position: 100% 50%;
// 	}
// 	100% {
// 		background-position: 0% 50%;
// 	}
// }

// @-moz-keyframes gradient {
// 	0% {
// 		background-position: 0% 50%;
// 	}
// 	50% {
// 		background-position: 100% 50%;
// 	}
// 	100% {
// 		background-position: 0% 50%;
// 	}
// }

// @keyframes gradient {
// 	0% {
// 		background-position: 0% 50%;
// 	}
// 	50% {
// 		background-position: 100% 50%;
// 	}
// 	100% {
// 		background-position: 0% 50%;
// 	}
// }