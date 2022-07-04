<template>
  <page-base>
    <section class="authorize">
      <form-registration></form-registration>
    </section>
  </page-base>
</template>

<script>
import { mapActions } from "vuex";
import FormRegistration from "@/components/auth/FormRegistration";
import PageBase from "@/components/PageBase.vue";

export default {
  components: {
    FormRegistration,
    PageBase,
  },
  methods: {
    ...mapActions("users", {
      addUser: "addUser",
      regUser: "regUser",
    }),
  },
};
</script>

<style lang="scss" scoped>
.authorize {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  background: url("@/assets/img/background/katod.png");
  background-size: cover;
}
</style>