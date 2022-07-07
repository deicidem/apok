<template>
  <admin-aside>
    <template v-slot:content>
      <admin-files-aside-content ></admin-files-aside-content>
    </template>
  </admin-aside>
</template>

<script>
import AdminAside from "@/components/admin/AdminAside.vue";
import AdminFilesAsideContent from "@/components/admin/files/AdminFilesAsideContent.vue";
import {mapGetters, mapActions} from "vuex";
export default {
  components: {
    AdminAside,
    AdminFilesAsideContent,
  },
  computed: {
    ...mapGetters('admin/files', ['getActiveFile']),
  },
  methods: {
    ...mapActions('admin/files', ['setActiveFile'])
  }
  
};
</script>

<style lang="scss" scoped>
</style>