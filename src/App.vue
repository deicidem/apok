<template>
  <div class="wrapper" @click="closeUser($event)">
    <app-header></app-header>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue"

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      showUser: false,
      showSearch: false,
    };
  },
  methods: {
    closeUser($event) {
      let el = document.querySelector(".user-box");
      if ($event.target.classList.contains("user-box__click")) {
        return;
      }
      if (this.showUser) {
        if (!el.contains($event.target)) {
          this.showUser = false;
        }
      }
      this.closeSearch($event); 
    },
    closeSearch($event) {
      let el = document.querySelector(".search-box");
      if ($event.target.classList.contains("search-box__click")) {
        return;
      }
      if (this.showSearch) {
        if (!el.contains($event.target)) {
          this.showSearch = false;
        }
      }
    },
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
  color: #868686;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  font-family: Helvetica, sans-serif;
  min-width: 1024px;
  width: 100%;
  overflow: visible;
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
  object-fit: cover;
  height: 100%;
  width: 100%;
  display: block;
}

.wrapper {
  min-height: 100vh;
  background: #DFDFDF;
}



/* _____________________index.html__________________ */


/* ______________________user-box____________________ */

.user-box {
  display: block;
  position: absolute;
  background-color: #fff;
  width: 300px;
  height: 330px;
  z-index: 30;
  top: 100%;
  right: 0px;
  border-left: 2px solid #618580;
  border-bottom: 2px solid #618580;
  border-right: 2px solid #618580;
  box-shadow: 0 0 8px 0 #618580;
  -webkit-box-shadow: 0 0 8px 0 #618580;
  -moz-box-shadow: 0 0 8px 0 #618580;
  transition: 0.8s;
}

.user-box-auth {
  text-align: center;
  margin: 10px;
  color: #618580;
  font-weight: 400;
  font-size: 18px;
}

.user-box-line {
  border-top: 2px solid #618580;
  width: 140px;
  margin: 0 auto;
}

.user-box-input {
  box-sizing: border-box;
  border: 2px solid transparent;
  outline: none;
  position: relative;
  margin-top: 16px;
  transition: 0.5s;
  border-radius: 4px;
}

.user-box-input input {
  display: block;
  padding: 10px 0;
  padding-left: 40px;
  margin: 0 auto;
  outline: none;
  font-size: 16px;
  border-radius: 4px;
  border: 2px solid #618580;
}

.user-box-input i {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 44px;
  font-size: 24px;
}

.user-box-input:focus-within i {
  color: #618580;
  text-shadow: 0 0 8px 0 #618580;
  -webkit-text-shadow: 0 0 8px 0 #618580;
  -moz-text-shadow: 0 0 8px 0 #618580;
  transition: all 0.4s ease-out;
}
.user-box-input:focus-within input {
  box-shadow: 0 0 8px 0 #618580;
  -webkit-box-shadow: 0 0 8px 0 #618580;
  -moz-box-shadow: 0 0 8px 0 #618580;
  transition: all 0.4s ease-out;
}

.user-box-button {
  background: rgb(97, 133, 128, 0.5);
  border: 2px solid #618580;
  margin: 16px 40px;
  border-radius: 35px;
  font-size: 18px;
  color: #ffffff;
  display: block;
  text-align: center;
  line-height: 40px;
  font-weight: 400;
}

.user-box-button-registr {
  border: 2px solid #618580;
  margin: 16px 40px;
  border-radius: 35px;
  font-size: 18px;
  color: #618580;
  display: block;
  text-align: center;
  line-height: 40px;
  font-weight: 400;
}

.user-box-button:hover {
  box-shadow: 0 0 8px 0 #618580;
  -webkit-box-shadow: 0 0 8px 0 #618580;
  -moz-box-shadow: 0 0 8px 0 #618580;
  transition: all 0.4s ease-out;
}

/* ______________________search-box_________________ */

.search-box {
  position: absolute;
  background-color: #fff;
  width: 300px;
  height: 132px;
  z-index: 30;
  top: 100%;
  right: 0px;
  border-left: 2px solid #618580;
  border-bottom: 2px solid #618580;
  border-right: 2px solid #618580;
  box-shadow: 0 0 8px 0 #618580;
  -webkit-box-shadow: 0 0 8px 0 #618580;
  -moz-box-shadow: 0 0 8px 0 #618580;
  transition: 0.8s;
}

.search-box-title {
  text-align: center;
  margin: 10px;
  color: #618580;
  font-weight: 400;
  font-size: 18px;
}

.search-box-line {
  // border-top: 2px solid #618580;
  width: 140px;
  margin: 0 auto;
}

.user-box-button-registr:hover {
  // box-shadow: 0 0 8px 0 #618580;
  // -webkit-box-shadow: 0 0 8px 0 #618580;
  // -moz-box-shadow: 0 0 8px 0 #618580;
  transition: all 0.4s ease-out;
}



content {
  width: 100%;
}

.menu {
  height: 100%;
}

.sidebar {
  position: absolute;
}
</style>