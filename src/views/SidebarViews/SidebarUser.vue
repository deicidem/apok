<template>
  <sidebar-base :loaded="loaded">
    <template v-slot:header>
      <h2 class="c-title">Личный кабинет</h2>
    </template>
    <template v-slot:content>
     <div class="person-wrapper">
        <div class="person-content">
          <user-information></user-information>
        </div>
      </div>
    </template>
  </sidebar-base>
</template>

<script>
import UserInformation from "@/components/user/UserInformation.vue";
import SidebarBase from "@/components/SidebarBase.vue";
import "vuescroll/dist/vuescroll.css";
export default {
  components: {
    UserInformation,
    SidebarBase,
  },
  data: ()=>({
    loaded: false
  }),
  mounted() {
    this.loaded = true;
  }
};
</script>


<style scoped lang="scss">
.person {
  &-wrapper {
    padding: 30px;
  }
  &-content {
    width: 100%;
    height: 100%;
  }
}
</style>