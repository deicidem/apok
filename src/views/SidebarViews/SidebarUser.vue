<template>
  <div class="person">
    <h2 class="sidebar-title">Личный кабинет</h2>
    <vuescroll :ops="scrollOps">
      <div class="person-wrapper">
        <div class="person-content">
          <user-information></user-information>
        </div>
      </div>
    </vuescroll>
  </div>
</template>

<script>
import UserInformation from "@/components/user/UserInformation.vue";
import vuescroll from "vuescroll";
import "vuescroll/dist/vuescroll.css";
import { mapGetters } from "vuex";
export default {
  components: {
    vuescroll,
    UserInformation,
  },
  computed: {
    ...mapGetters(["scrollOps"]),
  },
};
</script>


<style scoped lang="scss">
.person {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  &-wrapper {
    padding: 30px;
  }
  &-content {
    width: 100%;
    height: 100%;
  }
}
</style>